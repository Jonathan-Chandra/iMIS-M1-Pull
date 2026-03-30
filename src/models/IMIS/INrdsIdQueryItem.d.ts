/**
 * A single row returned by the iMIS IQA query identified by `VITE_IMIS_PARTY_ID_QUERY`.
 *
 * This query accepts an NRDS ID (`MajorKey`) and returns the corresponding iMIS
 * contact record. The `Id` field is the internal iMIS contact/party ID, which can
 * then be used with {@link getParty} to fetch full party details.
 *
 * @property $type - iMIS type discriminator included in raw query responses.
 * @property Id - The iMIS internal contact/party ID (not the NRDS ID).
 * @property MajorKey - The NRDS ID used as the query parameter; echoed back in the result.
 * @property ContactKey - An alternate contact key assigned by iMIS.
 * @property LicNumber - Real estate license number, if on record.
 */
export interface INrdsIdQueryItem {
    $type: any,
    Id: string,
    MajorKey?: string | null,
    ContactKey: string,
    LicNumber?: string | null
}