/**
 * Generic iMIS collection wrapper used throughout the API to envelope arrays of
 * typed records. iMIS serializes all collections in this `{ $type, $values }` shape.
 *
 * Use this as the base shape when defining a typed collection interface (e.g.
 * `IEmailDataCollection extends IDataCollection<IEmailData>`). The `$type`
 * discriminator should be overridden with the concrete iMIS contract name in
 * each specific collection interface.
 *
 * @template T - The element type contained in the collection.
 * @property $type - iMIS type discriminator; override with the concrete type string.
 * @property $values - The array of typed items.
 */
export interface IDataCollection<T> {
    $type: ""
    $values: T[]
}