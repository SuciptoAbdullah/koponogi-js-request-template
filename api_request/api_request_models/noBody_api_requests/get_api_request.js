import NoBodyRequest from "../no_body_api_request_model";
import ApiConfig from "../../api_config_model";

/**
 * @extends NoBodyRequest
 */
export default class GetRequest extends NoBodyRequest
{
    /**
     * @param {Object} props 
     * @param {ApiConfig} props.config 
     */
    constructor({config})
    {
        super(config, "GET");
    }
}