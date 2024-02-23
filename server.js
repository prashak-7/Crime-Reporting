const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const conncetDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("DB connect successfull");
  } catch (err) {
    console.log("DB connect failed");
  }
};
conncetDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
