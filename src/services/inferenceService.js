const tf = require("@tensorflow/tfjs-node");
const inputError = require("../exceptions/inputError");

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();
    const prediction = model.predict(tensor);
    const probability = prediction.dataSync()[0];

    const label = probability > 0.5 ? "Cancer" : "Non-cancer";

    let suggestion;
    if (label === "Cancer") {
      suggestion = "Segera periksa ke dokter!";
    } else {
      suggestion = "Penyakit kanker tidak terdeteksi.";
    }
    return { label, suggestion };
  } catch (error) {
    throw new inputError(`Terjadi kesalahan dalam melakukan prediksi`);
  }
}

module.exports = predictClassification;
