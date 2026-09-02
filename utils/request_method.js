import RequestMethod from "../models/method_model";

import GET_Method from "../models/method_models/get_method";
import DELETE_Method from "../models/method_models/delete_method";
import POST_Method from "../models/method_models/post_method";
import PUT_Method from "../models/method_models/put_method";
import OPTION_Method from "../models/method_models/option_method";
import HEAD_Method from "../models/method_models/head_method";
import PATCH_Method from "../models/method_models/patch_method";

/**
 * this is class that has atribute of all method
 * for example:
 * - GET
 * - POST
 * - PUT
 * - PATCH
 * - DELETE
 * - OPTION
 * - HEAD
 */
export default class RequestMethodes
{
    /**
     * this class is basicly just list of other clas
     */
    constructor()
    {
        throw new Error("ee.....what are you doing?, this RequestMethodes class only has static atribute, you not suposed to declare object");
    }

    /**@type {RequestMethod} */
    static get GET()
    {
        return new GET_Method();
    }

    /**@type {RequestMethod} */
    static get POST()
    {
        return new POST_Method();
    }

    /**@type {RequestMethod} */
    static get PUT()
    {
        return new PUT_Method();
    }

    /**@type {RequestMethod} */
    static get PATCH()
    {
        return new PATCH_Method();
    }

    /**@type {RequestMethod} */
    static get DELETE()
    {
        return new DELETE_Method();
    }

    /**@type {RequestMethod} */
    static get OPTION()
    {
        return new OPTION_Method();
    }

    /**@type {RequestMethod} */
    static get HEAD()
    {
        return new HEAD_Method();
    }

}   