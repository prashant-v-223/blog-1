import mongoose, { ObjectId } from "mongoose";

const TemporaryLinkSchema = new mongoose.Schema({
  link: {
    type: ObjectId,
    required: [true, "Link is required!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TemporaryLink = mongoose.models.TemporaryLink ||
  mongoose.model("TemporaryLink", TemporaryLinkSchema);

export default TemporaryLink;

// Cleanup function to delete records older than 1 minute
async function cleanupExpiredLinks() {
  const threshold = new Date(Date.now() - 5 * 60 * 1000); // 1 minute ago
  try {
    const result = await TemporaryLink.deleteMany({ createdAt: { $lt: threshold } });
    console.log(`${result.deletedCount} expired records deleted.`);
  } catch (error) {
    console.error('Error cleaning up expired links:', error);
  }
}

// Schedule the cleanup task to run every minute
setInterval(cleanupExpiredLinks, 60 * 1000); // 60 seconds * 1000 milliseconds