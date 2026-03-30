import axios, { type AxiosInstance } from "axios";
import {CreateAuthorizationService} from "../auth/AuthorizationService";
import type { IParty } from "../models/IMIS/Interfaces/IParty";
import type { IIQA } from "../models/IMIS/Interfaces/IIQA";
import type { IQueryResults } from "../models/IMIS/Interfaces/IQueryResults";

const authorizationService = CreateAuthorizationService();
const modeIsLocal = import.meta.env.VITE_AUTH_MODE === "local";


export const imis_api : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

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