import Request from "../request_model.js";
import RequestMethodes from "../utils/request_method.js";

import { requestWithoutBody } from "../../utils/request_withoutbody.js";

export default class DELETE_Request extends Request
{
    /**
     * 
     * @param {Object} props
     * @param {string} props.domain
     * @param {string} props.url
     * @param {object} props.header
     * @param {object} props.parameter
     */
    constructor({domain = "", url = "", header = {}, parameter = {}})
    {
        super({
            domain: domain,
            url: url,
            header: header,
            parameter: parameter,
            method: RequestMethodes.DELETE
        });
    }

    async startRequest()
    {
        try
        {
            const response = await requestWithoutBody({
                url: super.fullUrl,
                method: super.method.name,
                header: super.header,
                parameter: super.parameter
            });
            
            this.response = response;
            this._data = response.json ? await response.json() : await response.text();
        }
        catch (error)
        {
            console.error("Gagal melakukan request:", error.message);
            throw error;
        }
    }
}