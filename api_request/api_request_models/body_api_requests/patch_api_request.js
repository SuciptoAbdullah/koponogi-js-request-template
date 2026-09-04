import BodyRequest from "../body_api_request_model";
import ApiConfig from "../../api_config_model";

/**
 * @extends BodyRequest
 */
export default class PatchRequest extends BodyRequest
{
    /**
     * @param {Object} props 
     * @param {ApiConfig} props.config 
     * @param {Object} props.body 
     */
    constructor({config, body})
    {
        super(config, body, "PATCH");
    }
}