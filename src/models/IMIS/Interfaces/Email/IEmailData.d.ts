/**
 * A single email address record from iMIS, corresponding to the `EmailData` contract.
 *
 * @property $type - iMIS type discriminator.
 * @property Address - The email address string (e.g. `"user@example.com"`).
 * @property EmailType - Category of the email address (e.g. `"Personal"`, `"Work"`).
 * @property IsPrimary - Whether this is the party's primary email address.
 */
export interface IEmailData {
    $type: "Asi.Soa.Membership.DataContracts.EmailData, Asi.Contracts",
    Address: string,
    EmailType?: string | null,
    IsPrimary?: boolean | null
}