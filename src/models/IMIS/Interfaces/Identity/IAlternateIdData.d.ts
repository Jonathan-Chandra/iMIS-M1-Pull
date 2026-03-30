/**
 * An alternate identifier for an iMIS party. iMIS supports multiple ID systems
 * (e.g. NRDS ID, license numbers, legacy system IDs), each distinguished by `IdType`.
 *
 * @property $type - iMIS type discriminator.
 * @property Id - The identifier value.
 * @property IdType - The category or system the ID belongs to (e.g. `"NrdsId"`).
 */
export interface IAlternateIdData {
    $type: "Asi.Soa.Core.DataContracts.AlternateIdData, Asi.Contracts",
    Id: string,
    IdType: string
}