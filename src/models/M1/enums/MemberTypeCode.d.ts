/**
 * M1 code categorizing the type of NAR membership held by a member.
 * - `"AFF"` — Affiliate (non-Realtor industry member)
 * - `"CCO"` — Corporate / Commercial Office
 * - `"I"` — Institute Affiliate
 * - `"L"` — Life member
 * - `"MLO"` — MLS Only
 * - `"N"` — Non-member
 * - `"R"` — Realtor (principal broker or sales agent with Realtor status)
 * - `"RA"` — Realtor Associate
 * - `"S"` — Secondary member (member of more than one local association)
 */
export type MemberTypeCode = "AFF" | "CCO" | "I" | "L" | "MLO" | "N" | "R" | "RA" | "S";