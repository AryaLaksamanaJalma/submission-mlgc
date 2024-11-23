const {
  postPredictHandler,
  getPredictionHistoriesHandler,
} = require("./handler");
const inputError = require("../exceptions/inputError");
const fileSizeError = require("../exceptions/fileSizeError");

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 1000000,
        failAction: (request, h, err) => {
          throw new fileSizeError(
            "Payload content length greater than maximum allowed: 1000000"
          );
        },
      },
    },
  },

  {
    path: "/predict/histories",
    method: "GET",
    handler: getPredictionHistoriesHandler,
  },
];

module.exports = routes;
