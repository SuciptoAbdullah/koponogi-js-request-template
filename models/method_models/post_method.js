import RequestMethod from "../method_model";

export default class POST_Method extends RequestMethod
{
    constructor()
    {
        const methodName = "POST";
        const needHeader = true;
        const needBody = true;

        super(methodName, needBody, needHeader);
    }
}