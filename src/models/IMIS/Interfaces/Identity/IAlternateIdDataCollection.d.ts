/**
 * iMIS collection wrapper for {@link IAlternateIdData} records attached to a party.
 *
 * @property $type - iMIS type discriminator.
 * @property $values - Array of alternate identifier entries.
 */
export interface IAlternateIdDataCollection {
    $type: "Asi.Soa.Core.DataContracts.AlternateIdDataCollection, Asi.Contracts",
    $values: IAlternateIdData[]
}