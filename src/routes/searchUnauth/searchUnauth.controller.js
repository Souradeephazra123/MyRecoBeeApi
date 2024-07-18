import { findMovie } from "../../models/searchUnauth.model.js";

async function httpGetSearhResult(req, res) {
  const query = String(req.params.key);
  const result = await findMovie(query);
  return res.status(200).json(result);
}

export { httpGetSearhResult };
