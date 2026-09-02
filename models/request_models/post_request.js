import Request from "../request_model.js";
import RequestMethodes from "../utils/request_method.js";

import requestWithBody from "../../utils/request_withbody.js";

export default class POST_Request extends Request
{
    /**
     * 
     * @param {Object} props
     * @param {string} props.domain
     * @param {string} props.url
     * @param {object} props.header
     * @param {object} props.body
     * @param {object} props.parameter
     */
    constructor({domain = "", url = "", header = {}, body = {}, parameter = {}})
    {
        super({
            domain: domain,
            url: url,
            header: header,
            body: body,
            parameter: parameter,
            method: RequestMethodes.POST
        });
    }

    async startRequest()
    {
        try
        {
            const response = await requestWithBody({
                url: super.fullUrl,
                method: super.method.name,
                header: super.header,
                body: super.body
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