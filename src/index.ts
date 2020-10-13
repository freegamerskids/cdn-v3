import { join } from "path";
import { config } from "dotenv"; config({ path: join(__dirname, "../.env") });
import express from "express";
import { renderFile } from "eta";
import fetch from "node-fetch";
import handleFile from "./utils/handlers/handleFile";
const { PORT, FILE_PATH, BACKEND_URL, CDN_URL } = process.env;
const app = express();

app.engine("eta", renderFile);
app.set("view engine", "eta");
app.set("views", "./views");

app.get("/:file", async (req, res) => {
  const { file } = req.params;
  let response = await fetch(`${BACKEND_URL}/files/embed/${file}`, {
    method: "get"
  });

  let { success, message, embed, title, color, mimetype, description } = await response.json();
  if (!success) return res.status(400).json({ success: false, message });
  handleFile(req, res, { embed, title, color, mimetype, description });
});

app.use("/raw/", express.static(FILE_PATH!));


app.listen(PORT, () => {
  console.log("started cdn server");
});