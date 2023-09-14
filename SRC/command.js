const { logger } = require("./Req/Logger");
const { ramapi, ramapi2 } = require("./Req/ram-api");

module.exports = (client) => {
  new ramapi.RamApiDemo(60000, 1)
    .helloAsync()
    .then((data) => logger.infoAsync(data.text))
    .catch((err) => {});
  new ramapi2.funAsync(process.env.APITOKEN)
    .helloAsync()
    .then((data) => logger.infoAsync(data.imageURL))
    .catch((err) => {});
};
