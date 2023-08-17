#!/usr/bin/env node

import express from "express";
import getPort from "get-port";

let portRunningOn: number;

async function runStaticServer() {
  const directory = process.argv[2] as string;
  if (!directory)
    throw new Error("Please specify a directory. I.E: npx serve ./build");

  portRunningOn = await getPort({ port: 3000 });

  const app = express();
  app.use(express.static(directory));

  const underlyingServer = app.listen(portRunningOn, () => {
    console.log("Static server running on port:", portRunningOn);
    console.log("Press Ctrl/Cmd + C twice to stop the server and free port");
  });

  const releaseResources = async () => {
    underlyingServer.close();
  };

  return releaseResources;
}

runStaticServer().then((releaseResources) => {
  process.on("exit", async (code) => {
    console.log("Process exited with code:", code);
    await releaseResources();
    process.exit(code);
  });

  process.on("SIGTERM", async () => {
    await releaseResources();
    console.log(`Serve process received a SIGTERM signal`);
    process.exit(0);
  });

  process.on("SIGINT", async () => {
    await releaseResources();
    console.log(`Serve process has been interrupted`);
    process.exit(0);
  });

  process.on("uncaughtException", async (err) => {
    console.log(`Uncaught Exception: ${err.message}`);
    await releaseResources();
    process.exit(1);
  });

  process.on("unhandledRejection", async (reason, promise) => {
    console.log("Unhandled rejection at ", promise, `reason: ${reason}`);
    await releaseResources();
    process.exit(1);
  });
});
