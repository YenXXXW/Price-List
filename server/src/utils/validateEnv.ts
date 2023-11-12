import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_URL: str(),
  PORT: port(),
  SESSION_SECRET: str(),
  // NODE_ENV: str(),
  // ALLOWED_DEPLOYED_URL: str(),
  // LOCAL_HOST_ADDRESS: str(),
});
