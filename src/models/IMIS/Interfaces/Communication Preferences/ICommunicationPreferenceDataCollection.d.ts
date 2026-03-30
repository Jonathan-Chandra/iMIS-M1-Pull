/**
 * iMIS collection wrapper for {@link ICommunicationPreferenceData} records.
 *
 * Attached to each {@link IFullAddressData} to indicate which (if any) communication
 * channels should not be used for that address.
 *
 * @property $type - iMIS type discriminator.
 * @property $values - Array of individual communication preference entries.
 */
export interface ICommunicationPreferenceDataCollection {
    $type: "Asi.Soa.Membership.DataContracts.CommunicationPreferenceDataCollection, Asi.Contracts",
    $values: ICommunicationPreferenceData[]
}