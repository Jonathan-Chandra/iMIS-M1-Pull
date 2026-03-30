import type { RecordType, Result } from "../models/M1SyncFormValues";

/**
 * Validates a user-submitted ID string against the format rules for the given
 * record type, returning a structured {@link Result} with a user-readable error
 * message when validation fails.
 *
 * Format rules per type:
 * - **Member** — exactly 9 numeric digits (NRDS ID format).
 * - **Association** — exactly 4 numeric digits.
 * - **Office** — 9 numeric digits prepended by `"X"`.
 *
 * Unlike the simpler {@link validateId} helper, this function returns a {@link Result}
 * that includes a human-readable `message` suitable for displaying in the UI.
 *
 * @param type - The record type selected by the user.
 * @param id - The raw ID string entered by the user.
 * @returns A {@link Result} where `result` is `true` on success, or `false` with a
 *   non-null `message` describing the format requirement that was not met.
 */
export const validateInput = (type: RecordType, id: string) : Result => {
switch(type) {
        case "Member":
            const memberResult = /^\d{9}$/.test(id);
            if(memberResult === false) {
                return { result: memberResult, message: "Member Id must be 9 numeric digits."}
            }
            return {result: true, message: null}
        case "Association":
            const associationResult = /^\d{4}$/.test(id);
            if(associationResult === false) {
                return { result: associationResult, message: "Association Id must be 4 numeric digits."}
            }
            return {result: associationResult, message: null}
        case "Office":
            const officeResult = /X^\d{9}$/.test(id);
            if(officeResult === false) {
                return { result: officeResult, message: "Office Id must be 9 numeric digits prepended by an 'X'."}
            }
            return {result: true, message: null}
        default:
            return { result: false, message: "Values cannot be blank."};
    }
}