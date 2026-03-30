import type { RecordType } from "../models/M1SyncFormValues";

/**
 * Returns a boolean indicating whether `id` matches the expected format for the
 * given `type`. This is a lightweight predicate — it does not produce an error message.
 *
 * For validations that also need a user-facing message, use {@link validateInput} in
 * `FormHelpers.tsx` instead.
 *
 * Format rules per type:
 * - **Member** — exactly 9 numeric digits.
 * - **Association** — exactly 4 numeric digits.
 * - **Office** — 9 numeric digits prepended by `"X"`.
 *
 * @param type - The record type to validate against.
 * @param id - The ID string to test.
 * @returns `true` if the ID matches the expected format, `false` otherwise.
 */
export function validateId(type: RecordType, id: string) {
    switch(type) {
        case "Member":
            return /^\d{9}$/.test(id);
        case "Association":
            return /^\d{4}$/.test(id);
        case "Office":
            return /X^\d{9}$/.test(id);
        default:
            return false;
    }
}

