export interface IIQA<T> {
    $type: any,
    Items: { $type: any, $values: T[] },
    Offset: number,
    Limit: number,
    Count: number,
    TotalCount: number,
    NextPageLink?: string | null,
    HasNext: boolean,
    NextOffset: Number
}