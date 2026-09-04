## What is this repo's do??
Write less, request more.
koponogi-api-request-template is a modular utility library built for JavaScript/TypeScript, specifically designed to streamline and simplify HTTP network requests.
This library significantly eliminates repetitive boilerplate code—such as manual configuration setup, request body handling, and parameter validation. Developers can simply invoke the provided classes and methods instantly, securely, and in a structured manner. Key Features:
- Boilerplate-Free: Eliminates long and repetitive network configuration code across your application endpoints.
- Modular Architecture: Promotes clean separation of request logic with dedicated classes for GET, POST, PUT, DELETE, PATCH, and HEAD methods.
- Plug-and-Play: Enables fast and seamless API integration across modern project ecosystems.

## installation
```txt
npm i koponogi-api-request-template
```

# js-api-request

> [EN] A lightweight, class-based JavaScript wrapper around `fetch` for REST API requests (GET, POST, PUT, PATCH, DELETE, HEAD) with centralized config, callbacks, and validation.
>
> [ID] Pembungkus `fetch` JavaScript yang ringan dan berbasis class untuk request REST API (GET, POST, PUT, PATCH, DELETE, HEAD) dengan konfigurasi terpusat, callback, dan validasi.

---

## 1. Requirements / Kebutuhan

> [EN] Node.js 18+ (native `fetch`) or modern browser. ES Modules (`import` / `export`).
>
> [ID] Node.js 18+ (`fetch` bawaan) atau browser modern. ES Modules (`import` / `export`).

```json
// package.json
{
  "type": "module"
}
```
## 2. Code Example / contoh kode

1. method get
```js
import { GetRequest, DeleteRequest, HeadRequest, PatchRequest, PostRequest, PutRequest, ApiConfig} from "koponogi-api-request-template";

/**@type {string} */
const domain = "your-domain.com";
/**@type {string} */
const baseUrl = "/api/test";

async function runTest()
{
    console.log("memulai melalukan request");
    
    try
    {
        console.log("melakukan uji coba method GET");
        const service = new GetRequest({
            config: new ApiConfig({
                domain: domain,
                url: baseUrl,
                onError: (error)=>{console.log(`terjadi error pada GET method: ${error.message}`)},
                onSuccess: (data)=>{console.log(`Method get success dilakukan, berikut datanya: ${ JSON.stringify(data) }`)}
            }),
            query: {'id': 1, name: "sucipto abdullah"}
        });
        await service.execute();
    } 
    catch (error) 
    {
        console.error("Terjadi kesalahan saat pengujian:", error);
    }
}

await runTest();
```
2. method delete
```js
import { GetRequest, DeleteRequest, HeadRequest, PatchRequest, PostRequest, PutRequest, ApiConfig} from "koponogi-api-request-template";

/**@type {string} */
const domain = "your-domain.com";
/**@type {string} */
const baseUrl = "/api/test";

async function runTest()
{
    console.log("memulai melalukan request");
    
    try
    {
        console.log("melakukan uji coba method DELETE");
        const service = new DeleteRequest({
            config: new ApiConfig({
                domain: domain,
                url: baseUrl,
                onError: (error)=>{console.log(`terjadi error pada DELETE method: ${error.message}`)},
                onSuccess: (data)=>{console.log(`Method get success dilakukan, berikut datanya: ${ JSON.stringify(data) }`)}
            }),
            query: {'id': 1, name: "sucipto abdullah"}
        });
        await service.execute();
    } 
    catch (error) 
    {
        console.error("Terjadi kesalahan saat pengujian:", error);
    }
}

await runTest();
```
