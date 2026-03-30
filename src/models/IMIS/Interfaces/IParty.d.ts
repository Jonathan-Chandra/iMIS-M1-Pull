import type { IFullAddressDataCollection } from "./Address/IFullAddressDataCollection";
import type { IGenericPropertyDataCollection } from "./Generics/IGenericPropertyDataCollection";

/**
 * Top-level iMIS party record, corresponding to the `PersonData` contract
 * returned by the iMIS REST API `/Party/{id}` endpoint.
 *
 * A "party" in iMIS represents any person or organization. This interface
 * covers the person variant (`PersonData`). The `$type` discriminator field is
 * included because iMIS serializes polymorphic types with it.
 *
 * @property $type - iMIS type discriminator; always `"Asi.Soa.Membership.DataContracts.PersonData, Asi.Contracts"`.
 * @property PersonName - Structured name data (first, last, informal, full).
 * @property Name - The display name / sort name for the party.
 * @property SortIsOverriden - Whether the sort name has been manually overridden.
 * @property Sort - The sort-order name, present when `SortIsOverriden` is true.
 * @property AdditionalAttributes - Bag of arbitrary key-value properties attached to the party.
 * @property Addresses - Collection of full address records associated with the party.
 */
export interface IParty {
    $type: "Asi.Soa.Membership.DataContracts.PersonData, Asi.Contracts",
    PersonName: IPersonName,
    Name: string,
    SortIsOverriden: boolean,
    Sort?: string | null,
    AdditionalAttributes: IGenericPropertyDataCollection,
    Addresses: IFullAddressDataCollection
}