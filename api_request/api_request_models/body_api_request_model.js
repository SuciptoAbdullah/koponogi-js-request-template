import ApiConfig from "koponogi-api-request-template/api_request/api_config_model.js";
import BaseApiRequest from "koponogi-api-request-template/api_request/api_request_model.js";

/**
 * Subclass untuk menangani HTTP Request yang menggunakan Body (POST, PUT, PATCH).
 * @extends BaseApiRequest
 */
export default class BodyRequest extends BaseApiRequest
{
    /** @type {Record<string, any> | Array<any>} */
    body;
    /** @type {'POST' | 'PUT' | 'PATCH'} */
    method;
    
    /**
     * @param {ApiConfig} config 
     * @param {Record<string, any> | Array<any>} body - Payload data yang akan dikirim.
     * @param {'POST' | 'PUT' | 'PATCH'} [method='POST'] - HTTP Method yang digunakan.
     */
    constructor(config, body = {}, method = 'POST')
    {
        super(config);
        this.body = body;
        this.method = method;

        this.header = {
            'Content-Type': 'application/json',
            ...this.header,
        };
    }

  /**
   * Mengeksekusi HTTP Request dengan payload body.
   * @override
   * @returns {Promise<any>}
   */
    async execute()
    {
        try
        {
            const response = await fetch(this.getFullUrl(), {
                method: this.method,
                headers: this.header,
                body: JSON.stringify(this.body),
            });

            if ( super.validation.isRequestSuccess(response) ) {
                throw new Error(`HTTP Error status: ${res.status}`);
            }

            const data = await response.json();
            this.response = data;

            if ( super.validation.isFunction( this.onSuccess ) ) {
                this.onSuccess(this.response);
            }

            return this.response;
        }
        catch (err)
        {
            if (super.validation.isFunction(this.onError))
            {
                this.onError(err);
            }
            throw err;
        }
    }
}