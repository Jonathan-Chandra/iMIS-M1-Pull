/**
 * iMIS collection wrapper for {@link IPartySalutationData} records.
 *
 * @property $type - iMIS type discriminator.
 * @property $values - Array of salutation records.
 */
export interface IPartySalutationDataCollection {
    $type: "Asi.Soa.Membership.DataContracts.PartySalutationDataCollection, Asi.Contracts",
    $values: PartySalutationData[]
}