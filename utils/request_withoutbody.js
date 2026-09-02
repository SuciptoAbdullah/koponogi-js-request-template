
/**
 * @param {object} parameter 
 * @returns {boolean}
 */
function isParameterExist(parameter)
{
    return parameter && Object.keys(parameter).length > 0 ;
}

/**
 * 
 * @param {string} urlTujuan 
 * @param {string} queryParams 
 */
function addValueUrl(urlTujuan, queryParams)
{
    return urlTujuan.includes('?') ? `&${queryParams}` : `?${queryParams}`;
}

/**
 * Melakukan HTTP request yang tidak memiliki body data (seperti GET, HEAD, DELETE).
 * 
 * @param {Object} props 
 * @param {string} props.url 
 * @param {object} [props.header]
 * @param {object} [props.parameter]
 * @param {string} props.method 
 * 
 * @returns {Promise<Response>}
 */
export async function requestWithoutBody({url, header, parameter, method})
{
    try 
    {
        /**
         * @type {string}
        */
       let urlTujuan = url;

       if (isParameterExist(parameter)) {
            /**
             * @type {string}
            */
           const queryParams = new URLSearchParams(parameter).toString();
           /**
            * @type {string}
           */
            urlTujuan += addValueUrl(urlTujuan, queryParams);
        }

        const opsiRequest = {
            method: method.toUpperCase(),
            headers: {
                'Accept': 'application/json',
                ...header
            }
        };

        const response = await fetch(urlTujuan, opsiRequest);

        return response;
    } 
    catch (error) 
    {
        console.error("Gagal mengeksekusi requestWithoutBody:", error.message);
        throw error;
    }
}
