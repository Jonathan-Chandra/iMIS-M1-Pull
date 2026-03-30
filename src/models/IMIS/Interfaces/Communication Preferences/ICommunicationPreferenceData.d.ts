/**
 * A single communication preference record from iMIS. Represents a reason why
 * a party has opted out of or restricted a specific communication channel
 * (e.g. mail, email, phone) for a given address.
 *
 * @property $type - iMIS type discriminator.
 * @property Reason - The reason code or description for the communication preference (e.g. `"Do not mail"`).
 */
export interface ICommunicationPreferenceData {
    $type: "Asi.Soa.Membership.DataContracts.CommunicationPreferenceData, Asi.Contracts",
    Reason: string
}