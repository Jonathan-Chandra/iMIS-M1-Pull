/**
 * iMIS collection wrapper for {@link IGenericPropertyData} entries.
 *
 * Used as the type for `AdditionalAttributes` on {@link IParty}, representing
 * all custom key-value properties attached to a party record.
 *
 * @property $type - iMIS type discriminator.
 * @property $values - The array of individual property entries.
 */
export interface IGenericPropertyDataCollection {
    $type: "Asi.Soa.Core.DataContracts.GenericPropertyDataCollection, Asi.Contracts"
    $values: IGenericPropertyData[]
}