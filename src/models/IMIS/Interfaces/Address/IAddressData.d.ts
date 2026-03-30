import type { IAddressLineDataCollection } from "./IAddressLineDataCollection";

export interface IAddressData {
    $type: "Asi.Soa.Membership.DataContracts.AddressData, Asi.Contracts",
    AddressId?: string,
    AddressLines: IAddressLineDataCollection,
    CityName: string,
    CountryCode: string,
    CountryName?: string | null,
    CountrySubEntityCode?: string | null,
    CountrySubEntityName?: string | null,
    CountyName?: string | null,
    FullAddress?: string,
    NationalGovernmentDistrict?: string | null,
    PostalCode: string
}