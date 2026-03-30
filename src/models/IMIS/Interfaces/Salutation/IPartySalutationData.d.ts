import type { IPartySalutationMethodSummaryData } from "./IPartySalutationMethodSummary";

export interface IPartySalutationData {
    $type: "Asi.Soa.Membership.DataContracts.PartySalutationData, Asi.Contracts",
    SalutationMethod: IPartySalutationMethodSummaryData,
    Text?: string | null,
    IsOverridden?: boolean | null,
    SalutationId?: string,
}