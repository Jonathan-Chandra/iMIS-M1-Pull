/**
 * iMIS collection of free-form address line strings (e.g. street line 1, street line 2).
 *
 * Used within {@link IAddressData} and {@link IFullAddressData} to represent the
 * line-by-line street portion of a postal address.
 *
 * @property $type - iMIS type discriminator.
 * @property $values - Ordered array of address line strings.
 */
export interface IAddressLineDataCollection {
    $type: "Asi.Soa.Membership.DataContracts.FullAddressData, Asi.Contracts",
    $values: string[]
}