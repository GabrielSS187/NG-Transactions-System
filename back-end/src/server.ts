import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import path from "path";

import "./services/translationsYup";

export const app: Express = express();

dotenv.config();

app.use("/files", express.static(path.resolve("src/uploads/imgs")));

app.use(express.json());
app.use(cors());

const HOST = "0.0.0.0";
const PORT = 8000;

const api_url = process.env.API_URL === "http://localhost:8000"
? process.env.API_URL : process.env.DOCKER_API_URL;

const server = app.listen(process.env.PORT || PORT, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in ${api_url}`);
   } else {
      console.error(`Failure upon starting server.`);
   };
});