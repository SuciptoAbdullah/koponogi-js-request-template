import NoBodyRequest from "koponogi-api-request-template/api_request/api_request_models/no_body_api_request_model.js";
import ApiConfig from "koponogi-api-request-template/api_request/api_config_model.js";

/**
 * @extends NoBodyRequest
 */
export default class GetRequest extends NoBodyRequest
{
    /**
     * @param {Object} props 
     * @param {ApiConfig} props.config 
     * @param {Object} props.query 
     */
    constructor({config, query})
    {
        super(config, "GET", query);
    }
}