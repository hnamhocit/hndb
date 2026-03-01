import {
	Background,
	Controls,
	Edge,
	Node,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useEffect, useState } from 'react'

import { api } from '@/config'
import { IRelationship } from '@/interfaces'
import { useDataSourcesStore } from '@/stores'
import { getLayoutedElements, notifyError } from '@/utils'
import TableNode from './TableNode'

const nodeTypes = { tableNode: TableNode }

const ERDiagram = () => {
	const { selectedId, currentDatabase, currentTable, schema } =
		useDataSourcesStore()
	const [nodes, setNodes, onNodesChange] = useNodesState([])
	const [edges, setEdges, onEdgesChange] = useEdgesState([])
	const [isLoading, setIsLoading] = useState(true)
	const [relationships, setRelationships] = useState<IRelationship[]>([])

	// 1. Fetch Relationships API
	useEffect(() => {
		;(async () => {
			setIsLoading(true)
			try {
				const response = await api.get(
					`/data_sources/${selectedId}/databases/${currentDatabase}/tables/${currentTable}/relationships`,
				)
				setRelationships(response.data.data)
			} catch (error) {
				notifyError(error, 'Failed to fetch relationships.')
			} finally {
				setIsLoading(false)
			}
		})()
	}, [selectedId, currentDatabase, currentTable])

	// 2. Map dữ liệu thật sang Nodes và Edges cho React Flow
	useEffect(() => {
		// Đảm bảo đã có schema và biết user đang ở bảng nào
		if (!schema || Object.keys(schema).length === 0 || !currentTable) return

		// --- BƯỚC 1: TÌM CÁC BẢNG LIÊN QUAN ---
		// Dùng Set để lưu tên các bảng cần hiển thị (tránh trùng lặp)
		const relevantTables = new Set<string>()

		// Chắc chắn phải vẽ bảng hiện tại
		relevantTables.add(currentTable)

		// Lọc ra các dây nối CÓ DÍNH LÍU tới bảng hiện tại
		const relevantRelationships = relationships.filter(
			(rel) =>
				rel.source_table === currentTable ||
				rel.target_table === currentTable,
		)

		// Đưa các "bảng họ hàng" vào danh sách cần vẽ
		relevantRelationships.forEach((rel) => {
			relevantTables.add(rel.source_table)
			relevantTables.add(rel.target_table)
		})

		// --- BƯỚC 2: MAP SANG NODES & EDGES CHỈ CHO CÁC BẢNG LIÊN QUAN ---
		const dynamicNodes: Node[] = Object.entries(schema)
			// Lọc: Chỉ lấy những bảng có tên nằm trong relevantTables
			.filter(([tableName]) => relevantTables.has(tableName))
			.map(([tableName, columns]) => ({
				id: tableName,
				type: 'tableNode',
				position: { x: 0, y: 0 },
				data: {
					name: tableName,
					columns: columns,
				},
			}))

		const dynamicEdges: Edge[] = relevantRelationships.map((rel) => ({
			id: `e-${rel.source_table}.${rel.source_column}-${rel.target_table}.${rel.target_column}`,
			source: rel.source_table,
			sourceHandle: rel.source_column,
			target: rel.target_table,
			targetHandle: rel.target_column,
			animated: true,
			type: 'smoothstep',
			style: { stroke: '#3b82f6', strokeWidth: 1.5 },
		}))

		// Chạy thuật toán tự động sắp xếp
		const { nodes: layoutedNodes, edges: layoutedEdges } =
			getLayoutedElements(dynamicNodes, dynamicEdges, 'LR')

		setNodes(layoutedNodes)
		setEdges(layoutedEdges)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [schema, relationships, currentTable])

	if (isLoading) return <div>Calculating schema</div>

	return (
		<div className='w-full h-full min-h-[calc(100vh-100px)] bg-slate-50 dark:bg-[#090b10] transition-colors duration-300'>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				nodeTypes={nodeTypes}
				fitView
				minZoom={0.2}>
				<Background
					color='#9ca3af'
					gap={24}
					size={2}
				/>
				<Controls className='bg-white dark:bg-slate-800 fill-slate-600 dark:fill-slate-300 border-slate-200 dark:border-slate-700 shadow-md' />
			</ReactFlow>
		</div>
	)
}

export default ERDiagram
