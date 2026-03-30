/**
 * A single named property in iMIS's generic key-value extension system.
 *
 * iMIS uses `GenericPropertyData` to attach arbitrary custom attributes to records
 * without requiring schema changes. These appear in the `AdditionalAttributes`
 * collection on an {@link IParty}.
 *
 * @property $type - iMIS type discriminator.
 * @property Name - The attribute name / key.
 * @property Value - The attribute value; type varies per attribute.
 */
export interface IGenericPropertyData {
    $type: "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
    Name: string,
    Value: any
}