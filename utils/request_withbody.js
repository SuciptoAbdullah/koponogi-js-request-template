/**
 * Melakukan HTTP request yang memiliki body data (seperti POST, PUT, PATCH).
 * 
 * @param {Object} props 
 * @param {string} props.url 
 * @param {object} props.header 
 * @param {object} props.body 
 * @param {string} props.method 
 * 
 * @returns {Promise<Response>} Mengembalikan Promise berisi objek Response bawaan Web API
 */
export default async function requestWithBody({url, header, body, method})
{
    try
    {
        const opsiRequest = {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
                ...header
            },
            body: JSON.stringify(body)
        };
        const response = await fetch(url, opsiRequest);

        return response;
    } 
    catch (error)
    {
        console.error("Gagal mengeksekusi requestWithBody:", error.message);
        throw error;
    }
}
