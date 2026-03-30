import { useState } from 'react';
import { type RecordType, type M1SyncFormValues } from '../models/M1SyncFormValues';
import { validateInput } from '../helpers/FormHelpers';
import type { IQueryResults } from '../models/IMIS/Interfaces/IQueryResults';
import { queryData } from '../api/IMISClient';
import type { INrdsIdQueryItem } from '../models/IMIS/INrdsIdQueryItem';
import { OutputViewer, useLogger } from './OutputViewer';
//import M1DisplayModal from './M1DisplayModal';

/**
 * M1SyncForm is the primary form component for looking up a record in iMIS by NRDS ID.
 *
 * The user selects a record type (Member, Office, or Association), enters an NRDS ID,
 * and submits the form. The component queries the iMIS API and logs the result to the
 * embedded {@link OutputViewer}.
 *
 * @component
 * @returns The rendered sync form with record type selector, ID input, submit button, and output viewer.
 */
export default function M1SyncForm() {
    /** Controlled form state holding the selected record type and entered NRDS ID. */
    const [formValues, setFormValues] = useState<M1SyncFormValues>({ RecordType: "Member", Id: ""});

    /** Validation error message for the ID field; null when no error is present. */
    const [idError, setIdError] = useState<string | null>(null);

    /** Tracks whether an iMIS query is in-flight. null = not yet submitted, true = loading, false = done. */
    const [loading, setLoading] = useState<boolean | null>(null);

    /** Logger utilities provided by the OutputViewer hook for appending structured log entries. */
    const { logs, log, clear } = useLogger();
    const [showLogs, setShowLogs] = useState(false);

    //const [temp, setTemp] = useState<any>(null);
    //useState<M1SyncFormValues>({ Id: "", RecordType: "Member"});

    /**
     * Handles form submission by validating the current form values, then querying iMIS
     * for the party record matching the provided NRDS ID.
     *
     * Validation is delegated to {@link validateInput}. If validation fails, an error is
     * logged and the function returns early without making a network request.
     *
     * On a successful query, the first matching iMIS record is logged. If more than one
     * record is returned for the given NRDS ID, an additional error is logged to alert
     * the user of the ambiguous result.
     *
     * @async
     * @returns A promise that resolves when the query and logging are complete.
     */
    const handleSubmit = async () => {
        const result = validateInput(formValues.RecordType, formValues.Id)
        if(result.result === false) {
            log(`Invalid Submission: ${result.message}`, "error");
            setIdError(result.message);
            return;
        }
        setLoading(true);
        log(`Checking IMIS for NRDS ID: ${formValues.Id}`, "info");
        const response: IQueryResults<INrdsIdQueryItem> = await queryData<INrdsIdQueryItem>(import.meta.env.VITE_IMIS_PARTY_ID_QUERY, {MajorKey: formValues.Id});
        if(response.TotalCount > 1) {
            log(`More than 1 iMIS ID was returned when querying NRDS ID ${formValues.Id}`, "error");
        }
        log(`NRDS ID: ${formValues.Id} found in IMIS with IMIS ID: \n${JSON.stringify(response.Items[0], null, 2)}`, "info");
        setLoading(false);
        //result.result === false && setIdError(result.message);
    }
    return(
        <>
        <div className="row g-3 align-items-center jusify-content-center" onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}>
            <label htmlFor="recordtype">Record Type:</label>
            <select value={formValues.RecordType} onChange={e => setFormValues({ ...formValues, RecordType: e.target.value as RecordType})}>
                <option value="Member">Member</option>
                <option value="Office">Office</option>
                <option value="Association">Association</option>
            </select>       
            <label htmlFor="id">ID:</label>
            <input value={formValues.Id} onChange={e => setFormValues({ ...formValues, Id: e.target.value})} />
            <button onClick={handleSubmit}>Pull from M1</button>
            <p>Record Type Value: {formValues.RecordType}</p>
            <p>ID Value: {formValues.Id}</p>
             <div>
            
            </div>
            <div id="log-viewer-button" style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setShowLogs(!showLogs)}>
                    {showLogs ? "Hide Logs" : "Show Logs"}
                </button>

            </div>
            <div id="output-viewer" style={{
                maxHeight: showLogs ? "300px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.3s ease-in-out",
            }}>

                {showLogs && <OutputViewer logs={logs} />}         
            </div>
            <div id="form-error" className="AsiError row g-3 align-items-center jusify-content-center">
                {idError}
            </div>
        </div>
            
        </>
    );
}