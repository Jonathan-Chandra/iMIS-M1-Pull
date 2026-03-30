/**
 * Structured name data for a person in iMIS, corresponding to the `PersonNameData`
 * contract embedded within an {@link IParty} response.
 *
 * @property $type - iMIS type discriminator; always `"Asi.Soa.Membership.DataContracts.PersonNameData, Asi.Contracts"`.
 * @property FirstName - The person's legal first name.
 * @property InformalName - The preferred or informal first name (nickname).
 * @property LastName - The person's last/family name.
 * @property FullName - Pre-formatted full name string returned by iMIS, or null if not present.
 */
export interface IPersonName {
    $type: "Asi.Soa.Membership.DataContracts.PersonNameData, Asi.Contracts"
    FirstName: string,
    InformalName: string,
    LastName: string,
    FullName?: string | null
}