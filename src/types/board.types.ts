export type Row = {
    type: string
    _id: string
    name: string
    description: string
}

export type ColumnType = {
    type: string
    _id: string
    date: string
    activities: Array<Row>
}