/**
 * Shape of the OAuth2 token response returned by the iMIS token endpoint
 * (`/token` with `grant_type=password`).
 *
 * This is the raw JSON body that {@link LocalAuthorization} receives and extracts
 * `access_token` from during local development authentication.
 *
 * @property access_token - The bearer token to attach to subsequent API requests.
 * @property token_type - Always `"bearer"` for iMIS token responses.
 * @property expires_int - Token lifetime in seconds.
 * @property userName - The authenticated user's username.
 * @property '.issued' - ISO 8601 timestamp indicating when the token was issued.
 * @property '.expires' - ISO 8601 timestamp indicating when the token expires.
 */
export interface IToken {
    access_token: string;
    token_type: string;
    expires_int: number,
    userName: string;
    '.issued': string;
    '.expires': string;
}