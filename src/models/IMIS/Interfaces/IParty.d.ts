import type { IFullAddressDataCollection } from "./Address/IFullAddressDataCollection";
import type { IGenericPropertyDataCollection } from "./Generics/IGenericPropertyDataCollection";

export interface IParty {
    $type: "Asi.Soa.Membership.DataContracts.PersonData, Asi.Contracts",
    PersonName: IPersonName,
    Name: string,
    SortIsOverriden: boolean,
    Sort?: string | null,
    AdditionalAttributes: IGenericPropertyDataCollection,
    Addresses: IFullAddressDataCollection
}