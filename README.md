# dev-null-api

TypeScript client for the public, read-only [dev-null.sh API](https://github.com/nunomaduro/dev-null.sh#public-api).
No authentication is required.

## Installation

```sh
npm install dev-null-api
```

## Usage

```ts
import { DevNull } from "dev-null-api";

const api = new DevNull();

// Get a public user profile.
const user = await api.users.get("nunomaduro");
console.log(user);
```

## API

### Users

#### `api.users.get(username)`

Retrieve a public user profile.

The username may include a leading `@`. The returned object uses the same field names as the API response.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
