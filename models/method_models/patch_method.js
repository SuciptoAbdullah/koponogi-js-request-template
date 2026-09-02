import RequestMethod from "../method_model";

export default class PATCH_Method extends RequestMethod
{
    constructor()
    {
        const methodName = "PATCH";
        const needHeader = true;
        const needBody = true;

        super(methodName, needBody, needHeader);
    }
}