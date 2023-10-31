const os = require("os");
const moment = require("moment");
const { readFileSync } = require("fs");

const jwt = require("jsonwebtoken");

const { botversion } = require("../../../../version");
const { client } = require("../../../app");

module.exports = {
  name: "/",
  run: async (req, res) => {
    let seconds = os.uptime();
    let totalSeconds = client.uptime / 1000;

    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var bd = Math.floor(totalSeconds / (3600 * 24));
    var bh = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    var bm = Math.floor((totalSeconds % 3600) / 60);
    var bs = Math.floor(totalSeconds % 60);
    let usedmem = os.totalmem() - os.freemem();
    const ram = `${Math.round(usedmem / 1024 / 1024 / 1024)}Gb / ${Math.round(
      os.totalmem() / 1024 / 1024 / 1024
    )}Gb `;
    const cores = `${os.cpus().length}`;
    const cpu = os.cpus()[0].model;
    const os1 = os.version();

    let args = {
      ram,
      guilds: client.guilds.cache.size,
      commands: client.totalcmds,
      cpu,
      cores,
      version: botversion,
      os: os1,
      osuptime: `${d ? `${d} Days,` : " "} ${h ? ` ${h} Hours,` : " "} ${
        m ? ` ${m} Minutes,` : " "
      } ${"" + s || " NULL"} Seconds`,
      botuptime: `${bd ? `${bd} Days,` : " "} ${bh ? `${bh} Hours,` : " "} ${
        bm ? `${bm} Minutes,` : " "
      } ${"" + bs || " NULL"} Seconds`,
      boticon: client.user.avatarURL({ extension: "png" }),
    };

    // if (!req.cookies.token) return res.render("./Website/html/home.ejs", args)
    // let decoded;
    // try {
    //     decoded = jwt.verify(req.cookies.token, dashbaord.token);
    // } catch (error) {

    // }

    // if (decoded) {
    //     let data = await dashboardScema.findOne({ _id: decoded.uuid, userID: decoded.userID });

    //     let user = await client.users.fetch(data.userID);

    //     let args2 = {
    //         ram,
    //         guilds: client.guilds.cache.size,
    //         commands: client.totalcmds,
    //         cpu,
    //         cores,
    //         version: bot.version,
    //         os: os1,
    //         osuptime: `${d ? `${d} Days,` : " "} ${h ? ` ${h} Hours,` : " "} ${m ? ` ${m} Minutes,` : " "} ${"" + s || " NULL"} Seconds`,
    //         botuptime: `${bd ? `${bd} Days,` : " "} ${bh ? `${bh} Hours,` : " "} ${bm ? `${bm} Minutes,` : " "} ${"" + bs || " NULL"} Seconds`,
    //         avatar: `${user.avatarURL({ dynamic: true })}`,
    //         username: `${user.username}`,
    //         discriminator: `${user.discriminator}`,
    //         id: `${user.id}`,
    //         loggedIN: true,
    //         boticon: client.user.avatarURL({ extension: "png" }),

    //     }

    //     res.render("./Website/html/dash.ejs", args2)
    // } else {
    res.render("./Website/html/home.ejs", args);
    // }
  },
};
