import RequestMethod from "../method_model";

export default class OPTION_Method extends RequestMethod
{
    constructor()
    {
        const methodName = "OPTION";
        const needHeader = true;
        const needBody = false;

        super(methodName, needBody, needHeader);
    }
}