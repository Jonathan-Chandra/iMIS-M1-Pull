import type { IAuthorization } from "./IAuthorization";
import axios from "axios";

/**
 * Development-only authentication strategy that obtains an OAuth2 bearer token
 * from the iMIS token endpoint using Resource Owner Password Credentials grant.
 *
 * Credentials (`VITE_AUTH_USERNAME`, `VITE_AUTH_PASSWORD`) and the token URL
 * (`VITE_AUTH_URL`) are read from `.env.development`. Requests to the token
 * endpoint are proxied through Vite's dev server to avoid CORS issues.
 *
 * @remarks This class should never be used in production. Use {@link CloudAuthorization} instead.
 * @implements {IAuthorization}
 */
export class LocalAuthorization implements IAuthorization {
    /**
     * Satisfies the {@link IAuthorization} contract by delegating to the
     * internal `getBearerToken` method.
     *
     * @returns A promise resolving to the OAuth2 bearer token string.
     */
    async getToken(): Promise<string> {
        const token = await this.getBearerToken();
        return token;
    }

    /**
     * Performs the actual OAuth2 Resource Owner Password Credentials token request
     * against the iMIS token endpoint (`VITE_AUTH_URL`).
     *
     * Credentials are submitted as `application/x-www-form-urlencoded` with
     * `grant_type=password`. On a 200 response the `access_token` field is returned.
     *
     * @returns A promise resolving to the raw `access_token` string.
     * @throws An error if the token endpoint returns a non-200 status.
     */
    private async getBearerToken(): Promise<string> {
        console.log('AUTH URL:', import.meta.env.VITE_AUTH_URL);
        const username: string = import.meta.env.VITE_AUTH_USERNAME;
        const password: string = import.meta.env.VITE_AUTH_PASSWORD;
        const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}`,new URLSearchParams({
            "grant_type": "password",
            "username": username,
            "password": password
        }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        if(response.status === 200) {
            return response.data.access_token;
        } else {
            throw new Error("Failed to retrieve access token");
        }

    }
}
