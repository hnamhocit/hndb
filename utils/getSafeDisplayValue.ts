export const getSafeDisplayValue = (val: unknown, dataType: string) => {
	if (val === null || val === undefined) return null
	let parsed = val

	if (typeof val === 'object' && val !== null) {
		if ('type' in val && (val as { type: string }).type === 'Buffer') {
			parsed = (val as unknown as { data: number[] }).data[0] ?? 0
		} else if (val instanceof Date) {
			parsed = val.toISOString() // Đề phòng object Date
		} else {
			return JSON.stringify(val, null, 2)
		}
	}

	const strVal = String(parsed)
	const typeLower = dataType.toLowerCase()

	if (
		typeLower.includes('bool') ||
		typeLower.includes('bit') ||
		typeLower.includes('tinyint(1)')
	) {
		return strVal === '1' || strVal.toLowerCase() === 'true' ?
				'true'
			:	'false'
	}

	// -----------------------------------------------------------------
	// FIX LỖI DATE / TIMESTAMP: Format lại chuẩn SQL để tránh lỗi Syntax
	// -----------------------------------------------------------------
	if (typeLower === 'date') {
		// Cắt bỏ phần T và time. VD: 2023-01-14T... -> 2023-01-14
		return strVal.split('T')[0]
	}
	if (typeLower.includes('timestamp') || typeLower.includes('datetime')) {
		// Đổi T thành dấu cách, bỏ phần mili-giây .000 (nếu có)
		// VD: 2023-01-14T17:00:00.000Z -> 2023-01-14 17:00:00Z
		return strVal.replace('T', ' ').replace(/\.\d+/, '')
	}

	return strVal
}
