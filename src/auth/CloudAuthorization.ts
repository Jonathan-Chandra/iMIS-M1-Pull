import type { IAuthorization } from "./IAuthorization";

/**
 * Production/UAT authentication strategy that reads the iMIS request verification
 * (anti-CSRF) token from a hidden `<input>` element injected by the iMIS server.
 *
 * When an iPart page is rendered by iMIS, the server injects:
 * ```html
 * <input type="hidden" id="__RequestVerificationToken" value="..." />
 * ```
 * This token is then passed as the `RequestVerificationToken` header on every API
 * request by the {@link imis_api} interceptor.
 *
 * @implements {IAuthorization}
 */
export class CloudAuthorization implements IAuthorization {

    /**
     * Satisfies the {@link IAuthorization} contract by delegating to the
     * internal `getRequestVerificationToken` method.
     *
     * @returns A promise resolving to the request verification token string.
     */
    async getToken() : Promise<string> {
        return this.getRequestVerificationToken();
    }

    /**
     * Reads the request verification token value from the hidden HTML element
     * with ID `__RequestVerificationToken` that iMIS injects into every iPart page.
     *
     * @returns The token string from the element's `value` attribute.
     */
    private getRequestVerificationToken() : string {
        const tokenElement = document.getElementById("__RequestVerificationToken") as HTMLInputElement ?? new Error("Request Verification Token Element not found");
        return tokenElement.value;

    }

}