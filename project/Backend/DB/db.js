const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://nagireddyshettipalli4:nagi12345@cluster0.dkmq7ha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then(() => console.log("🔥 DB Connected Successfully"))
      .catch((err) => console.error("DB Error:", err));
  } catch (err) {
    console.error("DB Error:", err);
  }
};

module.exports = connectDB; 