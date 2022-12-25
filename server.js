const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const DB_HOST =
  "mongodb+srv://testuser1:123456789lll@cluster0.yqvsvlt.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection success"))
  .catch((error) => console.log(message.error));
