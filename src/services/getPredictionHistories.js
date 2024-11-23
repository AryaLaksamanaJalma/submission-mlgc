const { Firestore } = require("@google-cloud/firestore");

async function getPredictionHistories() {
  const db = new Firestore();

  const predictCollection = db.collection("predictions");
  const snapshot = await predictCollection.orderBy("createdAt", "desc").get();

  const histories = [];
  snapshot.forEach((doc) => {
    histories.push({
      id: doc.id,
      history: doc.data(),
    });
  });
  return histories;
}

module.exports = getPredictionHistories;
