import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import clsx from 'clsx'
import React, { useMemo, useRef } from 'react'

import { IColumn } from '@/interfaces'
import { useDataEditorStore } from '@/stores'
import { getTablePath, getTypeInfo } from '@/utils'
import { Checkbox } from '../ui/checkbox'
import EditableCell from './EditableCell'

interface DatabaseTableProps {
	columns: IColumn[]
	initialData: Record<string, unknown>[]
	primaryColumnName: string
}

// -------------------------------------------------------------------------
// OPTIMIZATION 1: Cell Wrapper tự động kết nối Zustand
// -------------------------------------------------------------------------
const CellWrapper = React.memo(
	({
		rowId,
		column,
		initialValue,
		tablePath,
		color,
		isNewRow,
	}: {
		rowId: string
		column: IColumn
		initialValue: unknown
		tablePath: string
		color: string
		isNewRow: boolean
	}) => {
		const isChanged = useDataEditorStore((state) => {
			const table = state.tablesState[tablePath]
			if (!table) return false
			const rowChanges =
				table.updateChangeset[rowId] || table.insertChangeset[rowId]
			return !!(
				rowChanges &&
				Object.prototype.hasOwnProperty.call(
					rowChanges,
					column.column_name,
				)
			)
		})

		const isDeleted = useDataEditorStore(
			(state) => !!state.tablesState[tablePath]?.deleteChangeset?.[rowId],
		)

		const trackUpdate = useDataEditorStore((state) => state.trackUpdate)

		return (
			<div className={clsx('w-full h-full', color)}>
				<EditableCell
					initialValue={initialValue}
					column={column}
					isChanged={isChanged}
					isNewRow={isNewRow}
					isDeleted={isDeleted}
					onSave={(cName, nVal) =>
						trackUpdate(tablePath, rowId, cName, nVal)
					}
				/>
			</div>
		)
	},
)

// -------------------------------------------------------------------------
// OPTIMIZATION 2: Selection Cell (Checkbox kế bên Index, hiện khi Hover)
// -------------------------------------------------------------------------
const SelectionCell = React.memo(
	({ rowId, index, tablePath, isDeleted }: any) => {
		const isSelected = useDataEditorStore(
			(state) => !!state.tablesState[tablePath]?.selectedRows?.[rowId],
		)
		const toggleRowSelection = useDataEditorStore(
			(state) => state.toggleRowSelection,
		)

		return (
			<div
				className={clsx(
					'flex items-center justify-center w-full h-full min-h-[44px] transition-colors',
					isSelected && !isDeleted ? 'bg-primary/10' : '',
				)}>
				<div className='flex items-center justify-center gap-2 px-2 w-full'>
					{/* 💡 NÚT CHECKBOX: Mặc định tàng hình (opacity-0).
                    Chỉ hiện lên (opacity-100) khi:
                    1. Người dùng hover vào bất kỳ đâu trên dòng này (group-hover)
                    2. Hoặc Checkbox này đang được tick chọn (isSelected)
                    3. Hoặc dòng này đã bị bấm xóa (isDeleted)
                */}
					<div
						className={clsx(
							'transition-opacity duration-200 flex shrink-0 items-center',
							isSelected || isDeleted ? 'opacity-100' : (
								'opacity-0 group-hover:opacity-100'
							),
						)}>
						<Checkbox
							checked={isSelected}
							disabled={isDeleted}
							onCheckedChange={() =>
								!isDeleted &&
								toggleRowSelection(tablePath, rowId)
							}
							className='bg-white'
						/>
					</div>

					{/* SỐ THỨ TỰ INDEX */}
					<span
						className={clsx(
							'text-right min-w-[1.2rem]',
							isDeleted ? 'text-neutral-400' : 'text-neutral-500',
						)}>
						{index + 1}
					</span>
				</div>
			</div>
		)
	},
)

// -------------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------------
const DatabaseTable = ({
	columns,
	initialData,
	primaryColumnName,
}: DatabaseTableProps) => {
	const parentRef = useRef<HTMLDivElement>(null)

	const { tablesState } = useDataEditorStore()
	const tablePath = getTablePath()
	const tableState = tablesState[tablePath]

	const displayData = useMemo(() => {
		if (!tableState) return initialData

		const { originalData, updateChangeset, insertChangeset, newRowIds } =
			tableState

		const newRows = newRowIds.map((id) => ({
			__tempId: id,
			...insertChangeset[id],
		}))

		const mergedOriginal = originalData.map((row) => {
			const rowId = String(row[primaryColumnName])
			return updateChangeset[rowId] ?
					{ ...row, ...updateChangeset[rowId] }
				:	row
		})

		return [...newRows, ...mergedOriginal]
	}, [tableState, initialData, primaryColumnName])

	const tableColumns = useMemo<ColumnDef<Record<string, unknown>>[]>(() => {
		const dataCols = columns.map((col) => {
			const { icon: Icon, color } = getTypeInfo(col.data_type)

			return {
				id: col.column_name,
				accessorKey: col.column_name,
				minSize: col.column_name.length * 12 + 50,
				size: 150,
				maxSize: 500,
				header: () => (
					<div className='flex flex-col text-left'>
						<div className='text-lg font-semibold'>
							{col.column_name}
						</div>
						<div className='flex items-center gap-2 text-neutral-300 dark:text-neutral-700'>
							<Icon size={18} />
							<div className='text-sm uppercase'>
								{col.data_type}
							</div>
						</div>
					</div>
				),
				cell: ({ row, getValue }) => {
					const val = getValue()
					const rowId = String(
						row.original.__tempId ||
							row.original[primaryColumnName],
					)
					const isNewRow = !!row.original.__tempId

					return (
						<CellWrapper
							rowId={rowId}
							column={col}
							initialValue={val}
							tablePath={tablePath}
							color={color}
							isNewRow={isNewRow}
						/>
					)
				},
			}
		})

		return [
			{
				id: '_selection',
				size: 70,
				header: () => <div className='text-center font-mono'>#</div>,
				cell: ({ row }) => {
					const rowId = String(
						row.original.__tempId ||
							row.original[primaryColumnName],
					)
					return (
						<SelectionCell
							rowId={rowId}
							index={row.index}
							tablePath={tablePath}
						/>
					)
				},
			},
			...dataCols,
		]
	}, [columns, primaryColumnName, tablePath])

	const table = useReactTable({
		data: displayData,
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => String(row.__tempId || row[primaryColumnName]),
	})

	const { rows } = table.getRowModel()

	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 45,
		overscan: 10,
	})

	const virtualItems = rowVirtualizer.getVirtualItems()

	const paddingTop = virtualItems.length > 0 ? virtualItems[0]?.start || 0 : 0
	const paddingBottom =
		virtualItems.length > 0 ?
			rowVirtualizer.getTotalSize() -
			(virtualItems[virtualItems.length - 1]?.end || 0)
		:	0

	return (
		<div
			ref={parentRef}
			className='w-full h-full overflow-auto relative'>
			<table className='w-full border-collapse whitespace-nowrap'>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header, index) => (
								<th
									key={header.id}
									className={clsx(
										'border p-2 select-none sticky top-0 z-20',
										index !== 0 &&
											'bg-primary text-primary-foreground',
									)}>
									{header.isPlaceholder ? null : (
										flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)
									)}
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody>
					{paddingTop > 0 && (
						<tr>
							<td
								style={{ height: `${paddingTop}px` }}
								colSpan={columns.length + 1}
							/>
						</tr>
					)}

					{virtualItems.map((virtualRow) => {
						const row = rows[virtualRow.index]

						const currentRowId = String(
							row.original.__tempId ||
								row.original[primaryColumnName],
						)
						const isDeleted =
							tableState?.deleteChangeset?.[currentRowId]

						return (
							<tr
								key={row.id}
								className={clsx(
									'odd:bg-primary/5 hover:bg-primary/10 transition-colors duration-150 group',
									isDeleted &&
										'bg-red-100! dark:bg-red-950/40! opacity-70!',
								)}>
								{row.getVisibleCells().map((cell) => {
									const columnSize = cell.column.getSize()

									return (
										<td
											key={cell.id}
											style={{
												width: columnSize,
												minWidth: columnSize,
											}}
											className={clsx(
												'border select-none overflow-hidden text-ellipsis',
												(
													cell.column.id ===
														'_selection'
												) ?
													'p-0'
												:	'font-mono',
											)}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									)
								})}
							</tr>
						)
					})}

					{paddingBottom > 0 && (
						<tr>
							<td
								style={{ height: `${paddingBottom}px` }}
								colSpan={columns.length + 1}
							/>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default DatabaseTable
