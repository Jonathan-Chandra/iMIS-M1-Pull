import type { RecordType } from "../models/M1SyncFormValues";

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

