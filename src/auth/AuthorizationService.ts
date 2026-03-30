import { CloudAuthorization } from "./CloudAuthorization";
import { LocalAuthorization } from "./LocalAuthorization"

/**
 * Factory that returns the correct {@link IAuthorization} implementation based
 * on the `VITE_AUTH_MODE` environment variable.
 *
 * - `"local"` → {@link LocalAuthorization}: exchanges credentials for a bearer token
 *   via the iMIS token endpoint. Intended for local development only.
 * - anything else → {@link CloudAuthorization}: reads the request verification token
 *   from the iMIS-injected hidden HTML element. Used in UAT and production.
 *
 * @returns An {@link IAuthorization} instance appropriate for the current environment.
 */
export function CreateAuthorizationService() {
    if(import.meta.env.VITE_AUTH_MODE === 'local') {
        return new LocalAuthorization();
    }
    return new CloudAuthorization();
}