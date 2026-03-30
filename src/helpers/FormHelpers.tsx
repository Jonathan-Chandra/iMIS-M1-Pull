import type { RecordType, Result } from "../models/M1SyncFormValues";

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