/**
 * Shape of the controlled form state managed by {@link M1SyncForm}.
 *
 * @property RecordType - The type of iMIS record to look up (Member, Office, or Association).
 * @property Id - The raw NRDS ID string entered by the user.
 */
export interface M1SyncFormValues {
    RecordType: RecordType,
    Id: string
}

/**
 * The three categories of records that can be looked up in iMIS via an NRDS ID.
 * Each type has its own ID format enforced by {@link validateInput}.
 *
 * - `"Member"` — individual Realtor member (9-digit NRDS ID).
 * - `"Office"` — real estate office (9-digit ID prefixed with `"X"`).
 * - `"Association"` — local/state association (4-digit ID).
 */
export type RecordType = "Member" | "Office" | "Association";

/**
 * The return type of {@link validateInput} and related validation helpers.
 *
 * @property result - `true` if validation passed, `false` if it failed.
 * @property message - A human-readable description of the failure, or `null` when `result` is `true`.
 */
export interface Result {
    result: boolean,
    message: string | null
}