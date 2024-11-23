class fileSizeError extends Error {
  constructor(message) {
    super(message);
    this.name = "FileSizeError";
  }
}

module.exports = fileSizeError;
