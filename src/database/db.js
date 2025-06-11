import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("wait connect to the database");

  mongoose
    .connect(
      process.env.MONGODB_URI
    )
    .then(() => console.log("Connected"))
    .catch((error) => console.log("coneccao nao estabelida: " + error));
};
export default connectDatabase;
