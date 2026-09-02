export default class RequestMethod
{
    /**
     * @type {boolean}
    */
    #needHeader;
    /**
     * @type {boolean}
    */
    #needBody;
    /**
     * @type {string}
    */
    #name;

    /**
     * create new method
     * @param {string | 'GET' | 'PUT' | 'DELETE' | 'POST' } name 
     * @param {boolean} needBody 
     * @param {boolean} needHeader 
     */
    constructor(name = "GET", needBody = false, needHeader = true)
    {
        this.#name = name;
        this.needBody = needBody;
        this.#needHeader = needHeader;
    }

    /**
     * get name of method request
     * @type {string}
     */
    get name()
    {
        return this.#name;
    }

    /**
     * checking is this method need a body for request
     * @type {boolean}
     */
    get isNeedBody()
    {
        return this.#needBody;
    }

    /**
     * checking is this method need a body for request
     * @type {boolean}
     */
    get isNeedheader()
    {
        return this.#needHeader;
    }

}