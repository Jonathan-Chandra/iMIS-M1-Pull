/**
 * Cleaned, de-paginated query result returned by {@link queryData} after all pages
 * have been fetched and the iMIS `$type` discriminator has been stripped from each item.
 *
 * This is the consumer-facing result type. The raw paginated wire type is {@link IIQA}.
 *
 * @template T - The shape of a single result item (e.g. {@link INrdsIdQueryItem}).
 * @property Items - All result items accumulated across all pages.
 * @property TotalCount - The total number of matching records reported by iMIS.
 */
export interface IQueryResults<T> {
    Items: T[]
    TotalCount: number
}