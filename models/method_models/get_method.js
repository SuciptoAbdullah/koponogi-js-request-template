import RequestMethod from "../method_model";

export default class GET_Method extends RequestMethod
{
    constructor()
    {
        const methodName = "GET";
        const needHeader = false;
        const needBody = false;

        super(methodName, needBody, needHeader);
    }
}