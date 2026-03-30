/**
 * Placeholder interface for the iMIS `FinancialInformationData` contract.
 *
 * The iMIS API may include a `FinancialInformationData` object on certain party or
 * account records. This interface is a stub — extend it with the relevant fields
 * (e.g. balance, dues status) as needed by the application.
 *
 * @property $type - iMIS type discriminator.
 */
export interface IFinancialInformationData {
    $type: "Asi.Soa.Membership.DataContracts.FinancialInformationData, Asi.Contracts"
}