# momento-http-client
Official JavaScript/TypeScript wrapper for Momento HTTP API 

## Getting Started

1. Create a Momento cache and an access token in the [Momento Console](https://console.gomomento.com/). Check out the [getting started](https://docs.momentohq.com/getting-started) guide for more information.

2. To use the momento-http-client library in your Deno project, use:

```typescript
import { HttpClient } from "https://deno.land/x/momento_http@v0.1.0/src/index.ts"
```

Or if you prefer to use a Deno import map, put this in your deno.json file:

```json
"imports": {
  "momento_http": "https://deno.land/x/momento_http@v0.1.0/src/index.ts"
}
```

And then simplify your import statement:

```typescript
import { HttpClient } from "momento_http"
```

3. Then you can instantiate your HttpClient and make get, set, and delete requests to your Momento Cache.

```typescript
const authToken = "<Your Momento API token>"
const endpoint = "<Your Momento HTTP API endpoint>"
const cacheName = "<Your Momento Cache name>"

const momento = new HttpClient(authToken, endpoint)

await momento.set(cacheName, "key", "value")
await momento.get(cacheName, "key")
await momento.delete(cacheName, "key")
```

## Testing

If you want to run the unit tests, simply run:

```bash
npm run unit-test
```

If you want to run the integration tests, first provide the following environment variables:

```
export MOMENTO_AUTH_TOKEN="<your token>"
export MOMENTO_CACHE_NAME="<your cache name>"
export MOMENTO_HTTP_ENDPOINT="<your endpoint>"
```

Then run:

```bash
npm run integration-test
```

## Learn More

You can find a full working Deno example using momento-http-client [here](https://github.com/momentohq/client-sdk-javascript/tree/main/examples/deno/http-api).

Alternately, you can find a full working Deno example using the Momento Web SDK [here](https://github.com/momentohq/client-sdk-javascript/tree/main/examples/deno/web-sdk).

For more information about how to get started with Momento in general, check out the [Momento Docs website](https://docs.momentohq.com/).

