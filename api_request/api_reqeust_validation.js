import BaseApiRequest from "./api_request_model.js";

export default class APIRequestValidation
{
    /**
     * 
     * @param {BaseApiRequest} object 
     */
    declareOnBaseAPIReqeust(object)
    {
        return object.constructor === BaseApiRequest;
    }

    /**
     * 
     * @param {Response} response
     * @returns {boolean} 
     */
    isRequestSuccess(response)
    {
        return response.ok;
    }

    /**
     * @param {any} func
     */
    isFunction(func)
    {
        return typeof func === 'function'
    }

}