import ApiConfig from "koponogi-api-request-template/api_request/api_config_model.js";
import BaseApiRequest from "koponogi-api-request-template/api_request/api_request_model.js";

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
            if(super.validation.isFunction(this.onLoading))
            {
                this.onLoading();
            }

            const fullUrl = `${this.getFullUrl()}?${this.queryString}`;

            const requestJson = {
                url: fullUrl,
                method: this.method,
                header: this.header
            };

            const worker = new Worker("koponogi-api-request-template/api_request/worker/no_body_worker.js");

            worker.postMessage(requestJson);

            worker.onmessage = (event) => {
                
                const success = event.data.status;

                if(!success)
                {
                    const errorMessage = event.data.message;
                    throw new Error(errorMessage);
                }

                const responseData = event.data.data;

                this.response = responseData;

            }
            
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