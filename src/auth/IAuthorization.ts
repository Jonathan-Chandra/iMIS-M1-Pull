/**
 * Contract for all authentication strategy implementations.
 *
 * Concrete implementations are {@link LocalAuthorization} (development) and
 * {@link CloudAuthorization} (production/UAT). The active implementation is
 * selected at runtime by {@link CreateAuthorizationService} based on the
 * `VITE_AUTH_MODE` environment variable.
 */
export interface IAuthorization {
    /**
     * Retrieves the current authentication token appropriate for the environment.
     *
     * In local mode this is an OAuth2 bearer token; in cloud mode it is the
     * iMIS request verification (anti-CSRF) token.
     *
     * @returns A promise resolving to the token string.
     */
    getToken(): Promise<string>;
}