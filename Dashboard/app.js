const { Client, Collection } = require("discord.js");

const port = Number(process.env.DASHPORT) || "80";
var express = require("express");
const { readFileSync } = require("fs");
const app = express();
const os = require("os");
const moment = require("moment");
const DiscordOauth2 = require("discord-oauth2");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const serveIndex = require("serve-index");

/**
 *
 * @param {Client} client
 */

exports.api = (client) => {
  app.enable("trust proxy");
  app.set("etag", false);

  app.use(express.static(__dirname + "/Website"));

  app.set("views", __dirname);
  app.set("view engine", "ejs");
  app.use(cookieParser());

  exports.client = client;

  app.get("/error", (req, res) => {
    res.status(404).send("404: Page not found");
  });

  require("../SRC/request").load(app);

  app.listen(port, () => console.log(`started on port ${port} `));
};
