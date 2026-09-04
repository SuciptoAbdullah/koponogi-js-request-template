import BaseApiRequest from "../api_request_model.js";
import ApiConfig from "../api_config_model.js";

/**
 * Subclass untuk menangani HTTP Request tanpa Body (GET, DELETE, HEAD).
 * @extends BaseApiRequest
 */
export default class NoBodyRequest extends BaseApiRequest
{
    /** @type {'GET' | 'DELETE' | 'HEAD'} */
    method;

    /** @type {string} */
    queryString;
    
    /**
     * @param {ApiConfig} config 
     * @param {'GET' | 'DELETE' | 'HEAD'} [method='GET'] - HTTP Method yang digunakan.
     * @param {Object} queryString
     */
    constructor(config, method = 'GET', query = {})
    {
        super(config);
        this.method = method;
        this.queryString = this.#objectToQueryString(query);
    }

    /**
     * Mengubah objek JavaScript menjadi string URL Query.
     * 
     * @param {Object} params - Objek yang berisi data key-value untuk query string.
     * @returns {string} String query yang siap digabungkan ke URL (tanpa simbol '?').
     */
    #objectToQueryString(params)
    {
        if (!params || typeof params !== 'object')
        {
            return '';
        }

        const searchParams = new URLSearchParams();

        for (const [key, value] of Object.entries(params))
        {
            if (value !== null && value !== undefined)
            {
                searchParams.append(key, value);
            }
        }

        return searchParams.toString();
    }

    /**
     * Mengeksekusi HTTP Request tanpa body.
     * @override
     * @returns {Promise<any>}
     */
    async execute()
    {
        try
        {
            const fullUrl = `${this.getFullUrl()}?${this.queryString}`;

            const res = await fetch( fullUrl,
            {
                method: this.method,
                headers: this.header,
            });

            if ( !super.validation.isRequestSuccess(res) )
            {
                throw new Error(`HTTP Error status: ${res.status}\nError: ${res.statusText}`);
            }

            const data = await res.json();
            this.response = data;

            if ( super.validation.isFunction(this.onSuccess) )
            {
                this.onSuccess(this.response);
            }

            return this.response;
        }
        catch (err)
        {
            if ( super.validation.isFunction(this.onError) )
            {
                this.onError(err);
            }
            throw err;
        }
    }
}