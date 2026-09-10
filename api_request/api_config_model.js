export default class ApiConfig
{
    /**@type {string} */
    #domain;
    /**@type {string} */
    #url;
    /**@type {Object} */
    #header;

    /**@type { (error: Error | any) => void } */
    onError;
    /**@type { (data: any) => void } */
    onSuccess;
    /**@type { () => void } */
    onLoading;

    /**
     * @param {Object} props
     * @param {string} props.domain
     * @param {string} props.url
     * @param {Object} props.header
     * @param {(error: Error | any) => void} props.onError
     * @param {(data: any) => void} props.onSuccess
     */
    constructor({domain = "", url = "", header = {}, onError = (error) => {}, onSuccess = () => {}}, onLoading = () => {})
    {
        this.#domain = domain;
        this.#url = url;
        this.#header = header;
        this.onError = onError;
        this.onSuccess = onSuccess;
        this.onLoading = onLoading;
    }

    /**@returns {string} */
    get domain()
    {
        return this.#domain;
    }

    /**@returns {string} */
    get url()
    {
        return this.#url;
    }

    /**@returns {Object} */
    get header()
    {
        return this.#header;
    }

}