import BaseApiRequest from "../api_request_model";
import ApiConfig from "../api_config_model";

/**
 * Subclass untuk menangani HTTP Request tanpa Body (GET, DELETE, HEAD).
 * @extends BaseApiRequest
 */
export default class NoBodyRequest extends BaseApiRequest
{
    /** @type {'GET' | 'DELETE' | 'HEAD'} */
    method;
    
    /**
     * @param {ApiConfig} config 
     * @param {'GET' | 'DELETE' | 'HEAD'} [method='GET'] - HTTP Method yang digunakan.
     */
    constructor(config, method = 'GET')
    {
        super(config);
        this.method = method;
    }

    /**
     * Mengeksekusi HTTP Request tanpa body.
     * @override
     * @returns {Promise<any>}
     */
    async execute() {
        try {
            const res = await fetch(this.getFullUrl(),
            {
                method: this.method,
                headers: this.header,
            });

            if (!res.ok)
            {
                throw new Error(`HTTP Error status: ${res.status}`);
            }

            const data = await res.json();
            this.response = data;

            if (typeof this.onSuccess === 'function')
            {
                this.onSuccess(this.response);
            }

            return this.response;
        }
        catch (err)
        {
            if (typeof this.onError === 'function')
            {
                this.onError(err);
            }
            throw err;
        }
    }
}