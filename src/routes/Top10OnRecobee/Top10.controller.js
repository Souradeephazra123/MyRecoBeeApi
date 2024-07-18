import { getTop10Movie } from "../../models/Top10.model.js";

async function httpgetTop10(req, res) {
  return res.status(200).json(await getTop10Movie());
}

export { httpgetTop10 };
