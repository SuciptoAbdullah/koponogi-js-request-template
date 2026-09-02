import RequestMethod from "../method_model";

export default class PUT_Method extends RequestMethod
{
    constructor()
    {
        const methodName = "PUT";
        const needHeader = true;
        const needBody = true;

        super(methodName, needBody, needHeader);
    }
}