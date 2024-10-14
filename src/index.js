import dotenv from "dotenv";
import { app } from "./app.js";
import connect_DB from "./config/index.js";

dotenv.config({
  path: "./.env",
});

connect_DB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Mongodb connection faild", error));
