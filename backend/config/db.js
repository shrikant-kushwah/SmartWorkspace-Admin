const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  // quick check so the app doesn't crash later with a weird error
  if (!uri) {
    console.error("MONGODB_URI is missing.");
    process.exit(1);
  }

  try {
    // keeping these options for compatibility with older setups
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // console.log("mongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error("Server will exit due to database connection failure.");
    process.exit(1);
  }

  return mongoose.connection;
}

module.exports = connectDB;