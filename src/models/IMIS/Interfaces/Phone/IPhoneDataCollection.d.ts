/**
 * iMIS collection wrapper for {@link IPhoneData} records associated with a party.
 *
 * @property $type - iMIS type discriminator.
 * @property $values - Array of phone number records.
 */
export interface IPhoneDataCollection {
    $type: "Asi.Soa.Membership.DataContracts.PhoneDataCollection, Asi.Contracts",
    $values: PhoneDataCollection[]
}