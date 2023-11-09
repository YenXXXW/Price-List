import app from "./app";
import mongoose from "mongoose";

import env from "./utils/validateEnv";

mongoose
  .connect(env.MONGO_URL)
  .then(() => {
    console.log("mongoDB connected");
    app.listen(env.PORT, () => {
      console.log("Server running on port", env.PORT);
    });
  })
  .catch(console.error);
