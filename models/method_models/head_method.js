import RequestMethod from "../method_model";

export default class HEAD_Method extends RequestMethod
{
    constructor()
    {
        const methodName = "HEAD";
        const needHeader = true;
        const needBody = false;

        super(methodName, needBody, needHeader);
    }
}