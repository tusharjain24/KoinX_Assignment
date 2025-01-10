import dotenv from "dotenv";
import connectDB from "./connection/DbConnection.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error:", error);
    });

    app.listen(process.env.PORT || 8002, () => {
      console.log(`Sever is running at port:${process.env.PORT}`);
    });
  })

  .catch((error) => {
    console.log("MongoDB Connection Failed:", error);
  });