require("dotenv").config();

const Hapi = require("@hapi/hapi");
const routes = require("../server/routes");
const loadModel = require("../services/loadModel");
const inputError = require("../exceptions/inputError");
const fileSizeError = require("../exceptions/fileSizeError");

(async () => {
  const server = Hapi.server({
    port: 8080,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  const model = await loadModel();
  server.app.model = model;

  server.route(routes);
  server.ext("onPreResponse", function (request, h) {
    const response = request.response;

    if (response instanceof fileSizeError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(413);
      return newResponse;
    }

    if (response instanceof inputError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(400);
      return newResponse;
    }

    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.output.statusCode);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server start at: ${server.info.uri}`);
})();
