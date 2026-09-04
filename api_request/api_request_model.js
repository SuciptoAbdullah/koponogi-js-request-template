import ApiConfig from "./api_config_model";
import APIRequestValidation from "./api_reqeust_validation";
/**
 * Class Abstrak untuk menangani request API.
 * Tidak boleh diinstansiasi secara langsung.
 * @abstract
 */
export default class BaseApiRequest
{
  /**@type {APIRequestValidation} */
  #validation;

  /**@type {string} */
  domain;
  /**@type {string} */
  url;
  /**@type {Record<string, string>} */
  header;
  /**@type {((error: Error | any) => void) | null} */
  onError;
  /**@type {((data: any) => void) | null} */
  onSuccess;
  /**@type {Response | null} */
  response;

  /**
   * @param {ApiConfig} config - Objek konfigurasi request.
   */
  constructor(config)
  {
    this.#validation = new APIRequestValidation();

    if (this.#validation.declareOnBaseAPIReqeust(this))
    {
      throw new Error("Class abstrak 'BaseApiRequest' tidak dapat diinstansiasi secara langsung.");
    }

    this.domain = config.domain;
    this.url = config.url;
    this.header = config.header || {};

    this.onError = config.onError || null;
    this.onSuccess = config.onSuccess || null;

    this.response = null;
  }

  /**@type {APIRequestValidation} */
  get validation()
  {
    return this.#validation;
  }

  /**
   * Menggabungkan domain dan URL endpoint.
   * @returns {string} Fully qualified URL.
   */
  getFullUrl() {
    const cleanDomain = this.domain.replace(/\/+$/, '');
    const cleanUrl = this.url.replace(/^\/+/, '');
    return `${cleanDomain}/${cleanUrl}`;
  }

  /**
   * Metode abstrak untuk mengeksekusi request.
   * Wajib diimplementasikan oleh subclass.
   * @abstract
   * @returns {Promise<any>}
   */
  async execute() {
    throw new Error("Metode abstrak 'execute()' wajib diimplementasikan pada child class.");
  }
}