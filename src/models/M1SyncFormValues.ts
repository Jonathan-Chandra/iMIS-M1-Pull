export interface M1SyncFormValues {
    RecordType: RecordType,
    Id: string
}

export type RecordType = "Member" | "Office" | "Association";

export interface Result {
    result: boolean,
    message: string | null
}