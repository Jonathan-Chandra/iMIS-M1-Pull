/**
 * iMIS collection wrapper for {@link IEmailData} records associated with a party.
 *
 * @property $type - iMIS type discriminator.
 * @property $values - Array of email address records.
 */
export interface IEmailDataCollection {
    $type: "Asi.Soa.Membership.DataContracts.EmailDataCollection, Asi.Contracts",
    $values: EmailData[]
}