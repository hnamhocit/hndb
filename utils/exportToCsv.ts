export const exportToCsv = (
	filename: string,
	rows: Record<string, unknown>[],
) => {
	if (!rows || rows.length === 0) {
		console.warn('Không có dữ liệu để xuất CSV')
		return
	}

	const separator = ','

	// 1. Lấy danh sách tên cột từ object đầu tiên
	const keys = Object.keys(rows[0])

	// 2. Hàm xử lý chuỗi: Bọc dấu ngoặc kép nếu có dấu phẩy/dấu nháy kép/xuống dòng
	const escapeCsv = (value: unknown) => {
		if (value === null || value === undefined) return ''
		const stringValue = String(value)

		if (
			stringValue.includes(separator) ||
			stringValue.includes('\n') ||
			stringValue.includes('"')
		) {
			// Thay thế 1 dấu ngoặc kép thành 2 dấu ngoặc kép (Quy tắc chuẩn của CSV)
			return `"${stringValue.replace(/"/g, '""')}"`
		}
		return stringValue
	}

	// 3. Ghép Header và các Dòng dữ liệu lại với nhau
	const csvContent =
		keys.join(separator) +
		'\n' +
		rows
			.map((row) => keys.map((k) => escapeCsv(row[k])).join(separator))
			.join('\n')

	// 4. Tạo Blob và gắn BOM (\ufeff) để Microsoft Excel nhận diện đúng font Tiếng Việt UTF-8
	const blob = new Blob(['\ufeff' + csvContent], {
		type: 'text/csv;charset=utf-8;',
	})

	// 5. Tạo link ẩn và kích hoạt tải xuống
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', `${filename}.csv`)
	document.body.appendChild(link)
	link.click()

	// 6. Dọn dẹp DOM
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}
