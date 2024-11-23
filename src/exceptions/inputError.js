const clientError = require("../exceptions/clientError");

class inputError extends clientError {
  constructor(message) {
    super(message, 400);
    this.name = "InputError";
  }
}

module.exports = inputError;
