import type { IPartySalutationMethodSummaryData } from "./IPartySalutationMethodSummary";

/**
 * Salutation data for a party address, used to generate formal greeting lines on
 * correspondence. Embedded within {@link IFullAddressData}.
 *
 * @property $type - iMIS type discriminator.
 * @property SalutationMethod - Reference to the salutation method template used to generate the greeting.
 * @property Text - The resolved salutation text (e.g. `"Dear Mr. Smith,"`), or null if not generated.
 * @property IsOverridden - Whether the `Text` field has been manually overridden rather than generated.
 * @property SalutationId - Unique identifier for this salutation record.
 */
export interface IPartySalutationData {
    $type: "Asi.Soa.Membership.DataContracts.PartySalutationData, Asi.Contracts",
    SalutationMethod: IPartySalutationMethodSummaryData,
    Text?: string | null,
    IsOverridden?: boolean | null,
    SalutationId?: string,
}