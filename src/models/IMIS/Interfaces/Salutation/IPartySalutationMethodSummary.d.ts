/**
 * Summary reference to the iMIS salutation method template used to generate a
 * greeting line. Embedded within {@link IPartySalutationData}.
 *
 * The salutation method defines the template pattern (e.g. `"Dear {Title} {LastName},"`).
 * The resolved text is stored in `IPartySalutationData.Text`.
 *
 * @property $type - iMIS type discriminator.
 * @property PartySalutationmethodId - Identifier for the salutation method template in iMIS.
 */
export interface IPartySalutationMethodSummaryData {
    $type: "Asi.Soa.Membership.DataContracts.PartySalutationData, Asi.Contracts",
    PartySalutationmethodId?: string | null,
}