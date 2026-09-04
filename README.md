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

No dependencies / Tanpa dependensi.

---

## 2. Project Structure / Struktur Proyek

```
js-api-request/
├── index.js                                        # Public exports / Ekspor publik
└── api_request/
    ├── api_config_model.js                         # ApiConfig: domain, url, header, callbacks
    ├── api_request_model.js                        # BaseApiRequest (abstract / abstrak)
    ├── api_reqeust_validation.js                   # APIRequestValidation helper
    └── api_request_models/
        ├── body_api_request_model.js               # BodyRequest (POST, PUT, PATCH)
        ├── no_body_api_request_model.js            # NoBodyRequest (GET, DELETE, HEAD)
        ├── body_api_requests/
        │   ├── post_api_request.js                 # PostRequest
        │   ├── put_api_request.js                  # PutRequest
        │   └── patch_api_request.js                # PatchRequest
        └── noBody_api_requests/
            ├── get_api_request.js                  # GetRequest
            ├── delete_api_request.js               # DeleteRequest
            └── head_api_request.js                 # HeadRequest
```

> [EN] Design pattern: `ApiConfig` (data) → `BaseApiRequest` (abstract base) → `BodyRequest` / `NoBodyRequest` (method groups) → concrete classes (`GetRequest`, etc.). Entry point is `index.js`.
>
> [ID] Pola desain: `ApiConfig` (data) → `BaseApiRequest` (base abstrak) → `BodyRequest` / `NoBodyRequest` (kelompok method) → class konkret (`GetRequest`, dll.). Titik masuknya adalah `index.js`.

---

## 3. Code Analysis / Analisa Kode

### 3.1 `ApiConfig` (`api_config_model.js`)

> [EN] Value object holding request configuration. Private fields `#domain`, `#url`, `#header` with getters, public `onSuccess(data)` and `onError(error)` callbacks.
>
> [ID] Objek nilai yang menyimpan konfigurasi request. Field privat `#domain`, `#url`, `#header` dengan getter, serta callback publik `onSuccess(data)` dan `onError(error)`.

```js
new ApiConfig({
  domain: "https://jsonplaceholder.typicode.com",
  url: "/posts/1",
  header: { Authorization: "Bearer TOKEN" },
  onSuccess: (data) => console.log(data),
  onError: (err) => console.error(err),
});
```

| Prop / Properti | Type / Tipe | Description / Deskripsi |
|---|---|---|
| `domain` | `string` | Base URL, e.g. `https://api.example.com` / Basis URL, cth. `https://api.example.com` |
| `url` | `string` | Endpoint path, e.g. `/users/1` / Jalur endpoint, cth. `/users/1` |
| `header` | `Object` | HTTP headers / Header HTTP |
| `onSuccess` | `(data) => void` | Called on success / Dipanggil saat sukses |
| `onError` | `(error) => void` | Called on failure / Dipanggil saat gagal |

### 3.2 `BaseApiRequest` (`api_request_model.js`)

> [EN] Abstract class. Cannot be instantiated directly (throws if `constructor === BaseApiRequest`). Provides `domain`, `url`, `header`, `onError`, `onSuccess`, `response` fields, `validation` getter, `getFullUrl()` (joins domain + url while trimming slashes), and abstract `execute()`.
>
> [ID] Class abstrak. Tidak bisa diinstansiasi langsung (melempar error jika `constructor === BaseApiRequest`). Menyediakan field `domain`, `url`, `header`, `onError`, `onSuccess`, `response`, getter `validation`, `getFullUrl()` (menggabungkan domain + url sambil merapikan slash), dan `execute()` abstrak.

### 3.3 `APIRequestValidation` (`api_reqeust_validation.js`)

> [EN] Small helper: `declareOnBaseAPIReqeust(obj)` (abstract guard), `isRequestSuccess(response)` (`response.ok`), `isFunction(func)` (`typeof === 'function'`).
>
> [ID] Helper kecil: `declareOnBaseAPIReqeust(obj)` (penjaga abstrak), `isRequestSuccess(response)` (`response.ok`), `isFunction(func)` (`typeof === 'function'`).

### 3.4 `NoBodyRequest` vs `BodyRequest`

> [EN] `NoBodyRequest` (GET/DELETE/HEAD): calls `fetch(url, { method, headers })`, throws on `!res.ok`, parses `res.json()`, triggers `onSuccess`, rethrows + triggers `onError` on failure. `BodyRequest` (POST/PUT/PATCH): same flow plus `body: JSON.stringify(body)` and auto-injects `'Content-Type': 'application/json'` (overridable via custom header).
>
> [ID] `NoBodyRequest` (GET/DELETE/HEAD): memanggil `fetch(url, { method, headers })`, melempar error jika `!res.ok`, memparsing `res.json()`, memicu `onSuccess`, serta memicu `onError` + melempar ulang saat gagal. `BodyRequest` (POST/PUT/PATCH): alur sama ditambah `body: JSON.stringify(body)` dan otomatis menambah `'Content-Type': 'application/json'` (bisa dioverride lewat header kustom).

### 3.5 Concrete classes / Class konkret

> [EN] Thin wrappers fixing the HTTP method: `GetRequest({config})`, `DeleteRequest({config})`, `HeadRequest({config})`, `PostRequest({config, body})`, `PutRequest({config, body})`, `PatchRequest({config, body})`. All exposed from `index.js`.
>
> [ID] Pembungkus tipis yang mengunci HTTP method: `GetRequest({config})`, `DeleteRequest({config})`, `HeadRequest({config})`, `PostRequest({config, body})`, `PutRequest({config, body})`, `PatchRequest({config, body})`. Semuanya diekspor dari `index.js`.

---

## 4. Installation / Instalasi

> [EN] Copy the `api_request/` folder + `index.js` into your project. No `npm install` needed.
>
> [ID] Salin folder `api_request/` + `index.js` ke proyek Anda. Tidak perlu `npm install`.

```bash
# example / contoh
cp -r js-api-request/api_request ./src/
cp js-api-request/index.js ./src/api.js
```

---

## 5. Usage / Cara Penggunaan

### 5.1 Basic setup / Pengaturan dasar

```js
import {
  ApiConfig,
  GetRequest,
  PostRequest,
  PutRequest,
  PatchRequest,
  DeleteRequest,
} from "./index.js";

const config = new ApiConfig({
  domain: "https://jsonplaceholder.typicode.com",
  url: "/posts/1",
  header: {},
  onSuccess: (data) => console.log("OK:", data),
  onError: (err) => console.error("FAIL:", err),
});
```

### 5.2 GET — fetch data / mengambil data

```js
import { ApiConfig, GetRequest } from "./index.js";

const config = new ApiConfig({
  domain: "https://jsonplaceholder.typicode.com",
  url: "/posts/1",
  header: {},
  onSuccess: (data) => console.log(data),
  onError: (err) => console.error(err),
});

// style 1: await + try/catch
try {
  const data = await new GetRequest({ config }).execute();
  console.log(data);
} catch (err) {
  console.error(err);
}

// style 2: rely on callbacks / mengandalkan callback
new GetRequest({ config }).execute();
```

### 5.3 POST — create data / membuat data

```js
import { ApiConfig, PostRequest } from "./index.js";

const config = new ApiConfig({
  domain: "https://jsonplaceholder.typicode.com",
  url: "/posts",
  header: {},
  onSuccess: (data) => console.log("Created:", data),
  onError: (err) => console.error(err),
});

const body = { title: "Hello", body: "World", userId: 1 };

const created = await new PostRequest({ config, body }).execute();
```

### 5.4 PUT — replace data / mengganti data penuh

```js
import { ApiConfig, PutRequest } from "./index.js";

const config = new ApiConfig({
  domain: "https://jsonplaceholder.typicode.com",
  url: "/posts/1",
  header: { Authorization: "Bearer TOKEN" },
  onSuccess: () => {},
  onError: (e) => console.error(e),
});

await new PutRequest({
  config,
  body: { id: 1, title: "Updated", body: "Full replace", userId: 1 },
}).execute();
```

### 5.5 PATCH — partial update / update sebagian

```js
import { ApiConfig, PatchRequest } from "./index.js";

const config = new ApiConfig({
  domain: "https://jsonplaceholder.typicode.com",
  url: "/posts/1",
  header: {},
  onSuccess: (d) => console.log(d),
  onError: (e) => console.error(e),
});

await new PatchRequest({ config, body: { title: "Patched title" } }).execute();
```

### 5.6 DELETE — remove data / menghapus data

```js
import { ApiConfig, DeleteRequest } from "./index.js";

const config = new ApiConfig({
  domain: "https://jsonplaceholder.typicode.com",
  url: "/posts/1",
  header: {},
  onSuccess: (d) => console.log("Deleted:", d),
  onError: (e) => console.error(e),
});

await new DeleteRequest({ config }).execute();
```

### 5.7 HEAD — headers only / hanya header

```js
import { ApiConfig, HeadRequest } from "./index.js";

const config = new ApiConfig({
  domain: "https://jsonplaceholder.typicode.com",
  url: "/posts/1",
  header: {},
  onSuccess: (d) => console.log(d),
  onError: (e) => console.error(e),
});

await new HeadRequest({ config }).execute();
```

> [EN] Note: `execute()` always returns a Promise resolving to parsed JSON and also fires `onSuccess`/`onError` if provided. Wrap in `try/catch` because it rethrows errors after calling `onError`.
>
> [ID] Catatan: `execute()` selalu mengembalikan Promise berisi JSON yang sudah diparsing dan juga memicu `onSuccess`/`onError` jika disediakan. Bungkus dengan `try/catch` karena error dilempar ulang setelah `onError` dipanggil.

### 5.8 Reusing config / Menggunakan ulang config

> [EN] One `ApiConfig` per endpoint. Change `url` by creating a new `ApiConfig` — `getFullUrl()` safely joins e.g. `https://api.com/` + `/users` → `https://api.com/users`.
>
> [ID] Satu `ApiConfig` per endpoint. Ganti `url` dengan membuat `ApiConfig` baru — `getFullUrl()` menggabungkan dengan aman, cth. `https://api.com/` + `/users` → `https://api.com/users`.

```js
const makeConfig = (url, body = undefined) =>
  new ApiConfig({
    domain: "https://api.example.com",
    url,
    header: { Authorization: "Bearer TOKEN" },
    onSuccess: console.log,
    onError: console.error,
  });

await new GetRequest({ config: makeConfig("/users") }).execute();
await new PostRequest({ config: makeConfig("/users"), body: { name: "Budi" } }).execute();
```

---

## 6. API Reference / Referensi API

| Export / Ekspor | Constructor / Konstruktor | Method | Body? |
|---|---|---|---|
| `ApiConfig` | `new ApiConfig({domain, url, header, onSuccess, onError})` | — | — |
| `GetRequest` | `new GetRequest({config})` | `GET` | ❌ |
| `DeleteRequest` | `new DeleteRequest({config})` | `DELETE` | ❌ |
| `HeadRequest` | `new HeadRequest({config})` | `HEAD` | ❌ |
| `PostRequest` | `new PostRequest({config, body})` | `POST` | ✅ |
| `PutRequest` | `new PutRequest({config, body})` | `PUT` | ✅ |
| `PatchRequest` | `new PatchRequest({config, body})` | `PATCH` | ✅ |

All request classes: `.execute() => Promise<any>`, `.response`, `.getFullUrl()`, `.validation`.
Semua class request: `.execute() => Promise<any>`, `.response`, `.getFullUrl()`, `.validation`.

---

## 7. Known Limitations / Keterbatasan yang Diketahui

> [EN]
> 1. `BodyRequest.execute()` has inverted success logic in current source (`if (isRequestSuccess) throw` + undefined `res` variable) — needs fix to `if (!isRequestSuccess) throw` with `response.status`.
> 2. File `api_reqeust_validation.js` has a typo in the name; imports without `.js` extension may fail under strict Node ESM.
> 3. `HEAD` requests call `res.json()` but HEAD responses have no body — will throw on compliant servers.
> 4. All responses are assumed JSON (`res.json()`); non-JSON/plain-text endpoints are not handled.
>
> [ID]
> 1. `BodyRequest.execute()` saat ini logika suksesnya terbalik (`if (isRequestSuccess) throw` + variabel `res` yang tidak terdefinisi) — perlu diperbaiki menjadi `if (!isRequestSuccess) throw` dengan `response.status`.
> 2. Nama file `api_reqeust_validation.js` ada typo; import tanpa ekstensi `.js` bisa gagal di Node ESM yang ketat.
> 3. Request `HEAD` memanggil `res.json()` padahal respons HEAD tidak punya body — akan error di server yang patuh standar.
> 4. Semua respons diasumsikan JSON (`res.json()`); endpoint non-JSON/teks biasa belum ditangani.
