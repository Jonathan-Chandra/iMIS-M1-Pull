/**
 * iMIS collection of {@link IFullAddressData} records attached to a party.
 *
 * A party may have multiple addresses (e.g. home address, office address), each
 * distinguished by its `AdressPurpose` field. This collection is the value of
 * `Addresses` on an {@link IParty} record.
 *
 * @property $type - iMIS type discriminator.
 * @property $values - Array of full address records.
 */
export interface IFullAddressDataCollection {
    $type: "Asi.Soa.Membership.DataContracts.FullAddressDataCollection, Asi.Contracts",
    $values: IFullAddressData[]
}