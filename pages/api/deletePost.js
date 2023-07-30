import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

// withApiAuthRequired verify users authentication
export default withApiAuthRequired(async function handler(req, res) {
  try {
    const {
      user: { sub },
    } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db("SassBlog");
    const userProfile = await db.collection("users").findOne({
      auth0Id: sub,
    });

    const { postId } = req.body;
    await db.collection("posts").deleteOne({
      userId: userProfile._id,
      _id: new ObjectId(postId), // convert postId string to mongoDB object
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error trying to delete a post", error);
  }
  return;
});
