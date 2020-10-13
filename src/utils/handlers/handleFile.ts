import { Request, Response } from "express";
import embedData from "../../interfaces/embedData";

let getViewName = (name: string, embed: boolean) => embed ? `${name}.` : name;
const { CDN_URL } = process.env;

export default (req: Request, res: Response, embedResponse: embedData) => {
  const { mimetype, embed } = embedResponse;
  const { params } = req;
  const rawUrl = `${CDN_URL}/raw/${params.file}`;

  /*switch (mimetype?.split("/")[0]) {
    case "image":
      return res.render(getViewName("image", embed))
    default: 
      return res.redirect(`${process.env.CDN_URL}/raw/${req.params.file}`)
  };*/

  if (mimetype?.split("/")[0] == "image") {
    return res.render(getViewName("image", embed), { imageUrl: rawUrl });
  };

  return res.redirect(`${process.env.CDN_URL}/raw/${req.params.file}`);
};