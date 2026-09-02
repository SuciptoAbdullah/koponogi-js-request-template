import RequestMethod from "./method_model";

import RequestMethodes from "../utils/request_method";

export default class Request
{
    /**@type {string} */
    #domain;

    /**@type {string} */
    #url;
    
    /**@type {RequestMethod} */
    #method;

    /**@type {object} */
    #header;

    /**@type {object} */
    #body;

    /**@type {object} */
    #parameter;

    /**@type {Response} */
    #response;

    /**@type {object} */
    _data;

    /**
     * 
     * @param {Object} props
     * @param {string} props.domain
     * @param {string} props.url
     * @param {object} props.header
     * @param {object} props.body
     * @param {object} props.parameter
     * @param {RequestMethod | RequestMethodes.GET | RequestMethodes.POST | RequestMethodes.PUT | RequestMethodes.PATCH | RequestMethodes.HEAD | RequestMethodes.DELETE | RequestMethodes.OPTION } props.method
     */
    constructor({domain = "", url = "", header = {}, body = {}, parameter = {}, method = RequestMethodes.GET })
    {
        this.#domain = domain;
        this.#url = url;
        this.#header = header;
        this.#body = body;
        this.#parameter = parameter;
        this.#method = method;
        this._data = null;
    }

    async startRequest()
    {
        throw new Error("you are not supposed to start request from here actualy");
    }

        /**
     * Mengambil nilai domain.
     * @returns {string} Nama domain
     */
    get domain()
    {
        return this.#domain;
    }

    /**
     * Mengambil nilai URL lengkap.
     * @returns {string} URL request
     */
    get url()
    {
        return this.#url;
    }

    /**
     * @returns {string}
     */
    get fullUrl()
    {
        return this.#domain + this.#url;
    }

    /**
     * Mengambil metode HTTP request yang digunakan.
     * @returns {RequestMethod} Metode request (GET, POST, dll.)
     */
    get method()
    {
        return this.#method;
    }

    /**
     * Mengambil objek header request.
     * @returns {object} Pasangan key-value header
     */
    get header()
    {
        return this.#header;
    }

    /**
     * Mengambil data body request.
     * @returns {object} Data body
     */
    get body()
    {
        return this.#body;
    }

    /**
     * Mengambil objek query parameter URL.
     * @returns {object} Pasangan key-value parameter
     */
    get parameter()
    {
        return this.#parameter;
    }

    /**
     * Mengambil objek respons hasil dari fetch.
     * @returns {Response} Objek Response bawaan Web API
     */
    get response()
    {
        return this.#response;
    }

    /**
     * Mengatur objek respons hasil fetch.
     * @param {Response} nilaiBaru
     */
    set response(nilaiBaru)
    {
        if (!(nilaiBaru instanceof Response))
            {
            throw new Error("Response harus merupakan instance asli dari Web API Response!");
        }
        this.#response = nilaiBaru;
    }

    /**
     * Mengambil data hasil response dari request.
     * @returns {object|string} Data yang telah diparse dari response (JSON atau teks)
     */
    get data()
    {
        return this._data;
    }
}