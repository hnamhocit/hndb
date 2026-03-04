import { useDataEditorStore, useTabsStore } from '@/stores'
import { getTablePath } from './getTablePath'

export const generateSqlStatements = (primaryColumnName: string) => {
	const statements: string[] = []

	const { activeTab } = useTabsStore.getState()
	if (!activeTab) return statements

	const { tablesState } = useDataEditorStore.getState()

	const tableState = tablesState[getTablePath()]
	if (!tableState) return statements

	// 💡 Lấy thêm deleteChangeset từ store
	const { updateChangeset, insertChangeset, newRowIds, deleteChangeset } =
		tableState

	// Helper format value cho an toàn (chống lỗi syntax cơ bản)
	const formatVal = (val: unknown) => {
		if (val === null || val === undefined) return 'NULL'
		if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'` // Escape single quote
		if (typeof val === 'object')
			return `'${JSON.stringify(val).replace(/'/g, "''")}'`
		// Xử lý an toàn cho number, boolean...
		return String(val)
	}

	// 1. UPDATE: Tạo từng câu lệnh cho mỗi row bị sửa
	Object.entries(updateChangeset).forEach(
		([rowId, changes]: [string, Record<string, unknown>]) => {
			const setClauses = Object.entries(changes)
				.map(([col, val]) => `${col} = ${formatVal(val)}`)
				.join(', ')
			statements.push(
				`UPDATE ${activeTab.table} SET ${setClauses} WHERE ${primaryColumnName} = ${formatVal(rowId)};`,
			)
		},
	)

	// 2. INSERT: Gom lại thành 1 câu lệnh Batch Insert cho tối ưu hiệu suất
	if (newRowIds.length > 0) {
		// Gom tất cả các cột có dữ liệu từ các dòng mới
		const allCols = new Set<string>()
		newRowIds.forEach((id) =>
			Object.keys(insertChangeset[id]).forEach((col) => allCols.add(col)),
		)
		const colsArray = Array.from(allCols)

		// Chỉ sinh ra lệnh Insert nếu user thực sự có gõ data vào dòng mới
		if (colsArray.length > 0) {
			const valuesClauses = newRowIds.map((id) => {
				const row = insertChangeset[id]
				const vals = colsArray.map((col) => formatVal(row[col] ?? null))
				return `(${vals.join(', ')})`
			})

			// 💡 Thêm dấu chấm phẩy (;) ở cuối câu lệnh
			statements.push(
				`INSERT INTO ${activeTab.table} (${colsArray.join(', ')}) VALUES ${valuesClauses.join(', ')};`,
			)
		}
	}

	// 3. DELETE: Gom các ID bị đánh dấu xóa vào mệnh đề IN
	const deleteIds = Object.keys(deleteChangeset)
	if (deleteIds.length > 0) {
		// Dùng formatVal để tự động bọc nháy đơn nếu ID là string (chống gãy cú pháp)
		const formattedDeleteIds = deleteIds
			.map((id) => formatVal(id))
			.join(', ')

		statements.push(
			`DELETE FROM ${activeTab.table} WHERE ${primaryColumnName} IN (${formattedDeleteIds});`,
		)
	}

	return statements
}
