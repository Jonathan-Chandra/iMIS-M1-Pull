/**
 * A single phone number record from iMIS, corresponding to the `PhoneData` contract.
 *
 * @property $type - iMIS type discriminator.
 * @property Number - The phone number string (formatting varies by iMIS configuration).
 * @property PhoneType - The category of the phone number (e.g. `"Office"`, `"Home"`, `"Cell"`).
 */
export interface IPhoneData {
    $type: "Asi.Soa.Membership.DataContracts.PhoneData, Asi.Contracts",
    Number: string,
    PhoneType: string
}