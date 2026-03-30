import type { ICommunicationPreferenceDataCollection } from "../Communication Preferences/ICommunicationPreferenceDataCollection";
import type { IPartySalutationData } from "../Salutation/IPartySalutationData";
import type { IAddressData } from "./IAddressData";
import type { IAddressLineDataCollection } from "./IAddressLineDataCollection";

/**
 * A complete address record as returned by iMIS, combining the physical postal
 * address with associated contact information, salutation, and communication
 * preferences. A party may have multiple full address records (e.g. home, office).
 *
 * @property $type - iMIS type discriminator.
 * @property AdditionalLines - Extra free-form address lines (e.g. suite, attention line).
 * @property Address - The physical postal address data.
 * @property AddresseeText - Custom override text for the addressee line on mailings.
 * @property AdressPurpose - The purpose code for this address (e.g. "Home", "Office").
 * @property CommunicationPreferences - Opt-out or preference flags for this address.
 * @property Email - Primary email address associated with this address record.
 * @property FullAddressId - Unique identifier for this full address record.
 * @property Salutation - Salutation/greeting line used for correspondence.
 * @property DisplayName - Display name override for this address context.
 * @property DisplayOrganizationName - Organization name to show with this address.
 */
export interface IFullAddressData {
    $type: "Asi.Soa.Membership.DataContracts.FullAddressData, Asi.Contracts",
    AdditionalLines: IAddressLineDataCollection,
    Address: IAddressData,
    AddresseeText?: string | null,
    AdressPurpose: string,
    CommunicationPreferences: ICommunicationPreferenceDataCollection,
    Email?: string | null,
    FullAddressId?: string | null,
    Salutation: IPartySalutationData,
    DisplayName?: string | null,
    DisplayOrganizationName?: string | null
}