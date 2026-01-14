import mongoose from "mongoose";
const complaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title:String,
  text: String,
  category: String,
  sentiment: Number,
  votes: { type: Number, default: 0 },
  status: { type: String, default: "pending" },
  votedBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Complaint", complaintSchema);