import BodyRequest from "koponogi-api-request-template/api_request/api_request_models/body_api_request_model.js";
import ApiConfig from "koponogi-api-request-template/api_request/api_config_model.js";

/**
 * @extends BodyRequest
 */
export default class PutRequest extends BodyRequest
{
    /**
     * @param {Object} props 
     * @param {ApiConfig} props.config 
     * @param {Object} props.body 
     */
    constructor({config, body})
    {
        super(config, body, "PUT");
    }
}