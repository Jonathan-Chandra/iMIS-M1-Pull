/**
 * Raw paginated response from the iMIS IQA (Intelligent Query Architect) `/Query` endpoint.
 *
 * iMIS wraps collections with a `$type` discriminator and a `$values` array. Pagination
 * is controlled by `Offset` and `Limit`; callers should iterate while `HasNext` is `true`.
 * The {@link queryData} function handles this pagination automatically and returns the
 * cleaner {@link IQueryResults} type.
 *
 * @template T - The shape of a single result item.
 * @property $type - iMIS type discriminator for the response envelope.
 * @property Items - Wrapper object containing the `$values` array of result items.
 * @property Offset - The zero-based index of the first item in this page.
 * @property Limit - The maximum number of items requested per page.
 * @property Count - The number of items returned in this page.
 * @property TotalCount - The total number of matching records across all pages.
 * @property NextPageLink - URL for the next page, or null on the last page.
 * @property HasNext - `true` if there are more pages to fetch.
 * @property NextOffset - The `Offset` value to use for the next page request.
 */
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