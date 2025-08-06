import type {FilterFn, Row} from "@tanstack/react-table"

export const multiColumnFilterFn: FilterFn<any> = (
    row: Row<any>,
    columnId: string,
    filterValue: string,
) => {
    const search = filterValue.toLowerCase()
    const title = (row.original.title ?? "").toString().toLowerCase()
    const category = (row.original.category ?? "").toString().toLowerCase()
    return title.includes(search) || category.includes(search)
}

export function createMultiColumnFilterFn<TData extends Record<string, any>>(
    columnIdsToFilter: (keyof TData)[],
): FilterFn<TData> {
    return (row: Row<TData>, columnId: string, filterValue: string) => {
        const search = filterValue.toLowerCase().trim()
        if (!search) return true
        return columnIdsToFilter.some((colId) => {
            const cellValue = row.getValue(String(colId))
            if (typeof cellValue === "string" || typeof cellValue === "number") {
                return String(cellValue).toLowerCase().includes(search)
            }
            return false
        })
    }
}
