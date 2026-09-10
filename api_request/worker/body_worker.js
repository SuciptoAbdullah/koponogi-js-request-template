/**
 * 
 * @param {Object} event 
 */
self.onmessage = async function (event)
{
    try
    {
        const { url, method, header, body } = event.data;
    
        const response = await fetch(
            url,
            {
                method: method,
                headers: header,
                body: JSON.stringify(body)
            }
        );
    
        if(!response.ok)
        {
            const dataError = await response.json();

            throw new Error(`request failed, ${dataError}`);
        }

        /**
         * @type {Object}
         */
        const dataSuccess = await response.json();

        self.postMessage(
        {
           status: true,
           data: dataSuccess 
        });
    } 
    catch (error) 
    {
        self.postMessage(
        {
           status: false,
           message: error 
        });
    }
}