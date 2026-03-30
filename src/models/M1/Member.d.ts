import type { M1Boolean } from "./enums/M1Boolean";
import type { MailTypeCode } from "./enums/MailTypeCode";

/**
 * Represents a member record as it exists in the M1 (NAR membership database) system.
 *
 * This interface mirrors the data returned by M1 for a member lookup. Fields marked
 * optional (`?`) are not guaranteed to be present on all records. Boolean flags use
 * {@link M1Boolean} (`"Y"` | `"N"`) rather than native TypeScript `boolean`, which
 * reflects M1's string-based flag convention.
 *
 * @remarks The `public` modifier on this interface is non-standard TypeScript and
 * is retained from the source definition. TypeScript interfaces are implicitly public.
 */
public interface Member {
    MemberId: number,
    MiddleName?: string,
    PreferredPronoun?: string,
    Title?: string,
    Gender?: string,
    MemberTypeCode: string,
    MemberTypeCodeDescription: string,
    MemberStatusDate?: Date,
    JoinedDate?: Date,
    PrimaryLocalAssociationId: number,
    LocalAssociationTypeCode: string,
    LocalAssociationName: string,
    StateAssociationTypeCode: string,
    StateAssociationName: string,
    PrimaryStateAssociationId: number,
    PrimaryOfficeId: number,
    PrimaryReLicenseNumber?: string,
    PrimaryReLicenseState?: string,
    MemberPrimaryInd?: string,
    MemberSubClass?: string,
    ArbitrationEthicsPending?: string,
    DesignatedRealtorFlag?: M1Boolean,
    LocalJoinDate?: Date,
    SpecialDiscountFlag?: string,
    DuesWaivedLocalFlag?: M1Boolean,
    DuesWaivedNationalFlag?: M1Boolean,
    DuesWaivedStateFlag?: M1Boolean,
    Generation?: string,
    NickName?: string,
    DirectMarketingFlag?: M1Boolean,
    OccupationName?: string,
    OfficeVoiceMailExtensionNumber?: string,
    BirthDate?: Date,
    SingleOwnedMlsStatusCode?: M1Boolean,
    OrientationDate?: Date,
    PreviousNonMemberFlag?: M1Boolean,
    ReinstatementCode?: string,
    ReinstatementDate?: Date,
    StopPublicationFlag?: M1Boolean,
    PreferredMailTypeCode: MailTypeCode
}