/**
 * @file IMISClient.ts
 * Pre-configured Axios HTTP client and data-access functions for the iMIS REST API.
 *
 * The exported `imis_api` instance handles authentication automatically via a
 * request interceptor: in local development it attaches a `Bearer` token, and in
 * cloud deployments it attaches the iMIS `RequestVerificationToken`.
 *
 * @see {@link CreateAuthorizationService} for how the auth strategy is selected.
 */
import axios, { type AxiosInstance } from "axios";
import {CreateAuthorizationService} from "../auth/AuthorizationService";
import type { IParty } from "../models/IMIS/Interfaces/IParty";
import type { IIQA } from "../models/IMIS/Interfaces/IIQA";
import type { IQueryResults } from "../models/IMIS/Interfaces/IQueryResults";

/** Singleton auth service — strategy (local vs cloud) determined at module load time. */
const authorizationService = CreateAuthorizationService();

/** True when running in local development mode (`VITE_AUTH_MODE=local`). */
const modeIsLocal = import.meta.env.VITE_AUTH_MODE === "local";

/**
 * Shared Axios instance for all iMIS API requests.
 * Base URL is read from the `VITE_API_URL` environment variable.
 * Authentication headers are injected by the request interceptor below.
 */
export const imis_api : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

/**
 * Request interceptor that attaches the appropriate auth header before every
 * outgoing request.
 *
 * - Local mode: `Authorization: Bearer <token>` (OAuth2 bearer token from iMIS token endpoint)
 * - Cloud mode: `RequestVerificationToken: <token>` (anti-CSRF token from hidden HTML element)
 */
imis_api.interceptors.request.use(async (config) => {
    const token: string = await authorizationService.getToken() ?? new Error("Failed to retrieve token during API request.");
    if(modeIsLocal) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }
    else {
        config.headers.set("RequestVerificationToken", token);
    }
    return config;
});

/**
 * Fetches a single iMIS Party record by its iMIS ID.
 *
 * @param id - The iMIS party/contact ID (not NRDS ID).
 * @returns The full {@link IParty} record for the given ID.
 * @throws Re-throws any Axios error from the underlying HTTP call.
 */
export const getParty = async (id: string) : Promise<IParty> => {

    try {
        const response = await imis_api.get<IParty>(`/Party/${id}`);
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Executes an iMIS IQA (Intelligent Query Architect) query and auto-paginates
 * through all result pages, returning the full result set.
 *
 * Pagination is handled by incrementing `Offset` by `Limit` (500) on each
 * iteration until `HasNext` is false. The iMIS `$type` discriminator property
 * is stripped from each item before returning so callers receive clean objects.
 *
 * @param queryPath - The fully qualified IQA query name (e.g. `VITE_IMIS_PARTY_ID_QUERY`).
 * @param params - Additional query parameters merged into the request (e.g. `{ MajorKey: "123456789" }`).
 * @returns A {@link IQueryResults} containing all accumulated items and the total count.
 * @throws Re-throws any Axios error encountered during pagination.
 */
export const queryData = async <T>(queryPath: string, params: Object): Promise<IQueryResults<T>> => {
    try {
        let queryParams = { ...params, Limit: 500, Offset: 0 };
        let hasNext = true;
        let items: T[] = [];
        let totalCount: number = 0;
        while (hasNext) {
            const iqaResults = await getPartialQueryResults(queryPath, queryParams);
            hasNext = iqaResults.HasNext;
            items.push(...iqaResults.Items.$values as T[]);
            queryParams.Offset += queryParams.Limit;
            totalCount = iqaResults.TotalCount;
        }
        const cleaned = items.map((item) =>
            Object.fromEntries(
                Object.entries(item as Record<string, unknown>).filter(([key]) => key !== "$type")
            ) as T
        );
        return { Items: cleaned, TotalCount: totalCount };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * Fetches a single page of IQA query results from the iMIS `/Query` endpoint.
 * This is an internal helper called by {@link queryData} and is not exported.
 *
 * @param queryPath - The fully qualified IQA query name.
 * @param params - Query parameters including `QueryName`, `Limit`, and `Offset`.
 * @returns One page of raw {@link IIQA} results including pagination metadata.
 * @throws Re-throws any Axios error from the underlying HTTP call.
 */
const getPartialQueryResults = async<T>(queryPath: string, params: Object) : Promise<IIQA<T>> => {
    try {
        const requestParams = { QueryName: queryPath, ...params };
        console.log(`Attempting to query using params: ${JSON.stringify(requestParams)}`);
        const response = await imis_api.get<IIQA<T>>(`/Query`, { params: requestParams });
        return response.data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}