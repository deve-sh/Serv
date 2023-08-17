# Serv

A simple way to spin up a static server for your files. Useful for testing out app-builds before you push them to the cloud.

### Usage

```bash
npx serv (directory)

# Example
npx serv ./dist
# or without ./
npx serv build
```

By default port `3000` is used, but if that port is not free a different port is assigned and logged. You can then access the static server from `localhost:<port>` or `127.0.0.1:<port>`.
