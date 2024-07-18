import { getRecentReleaseData } from "../../models/RecentRelease.model.js";

async function httpRecentRelease(req, res) {
  return res.status(200).json(await getRecentReleaseData());
}

export { httpRecentRelease };
