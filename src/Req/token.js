const { ramapi2 } = require("./ram-api");

exports.token = async () => {
  let token = "";
  try {
    await new ramapi2.tokenAsync()
      .loginAsync(process.env.APIEMAIL, process.env.APIPASS)
      .then((data) => {
        // console.log(data);
        token = data.token;
      })
      .catch((err) => {});
  } catch (error) {}

  return token;
};
