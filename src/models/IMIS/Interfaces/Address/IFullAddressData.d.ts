import type { ICommunicationPreferenceDataCollection } from "../Communication Preferences/ICommunicationPreferenceDataCollection";
import type { IPartySalutationData } from "../Salutation/IPartySalutationData";
import type { IAddressData } from "./IAddressData";
import type { IAddressLineDataCollection } from "./IAddressLineDataCollection";

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