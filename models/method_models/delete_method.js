import RequestMethod from "../method_model";

export default class DELETE_Method extends RequestMethod
{
    constructor()
    {
        const methodName = "DELETE";
        const needHeader = true;
        const needBody = true;

        super(methodName, needBody, needHeader);
    }
}