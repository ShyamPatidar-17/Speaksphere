import express from "express";
import Complaint from "../models/Complaint.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
const router = express.Router();

router.put("/complaints/:id/status", async(req,res)=>{
  try {
    const { status } = req.body;
    const c = await Complaint.findById(req.params.id);

    if (!c) {
      return res.status(404).json({ msg: "Complaint not found" });
    }

    c.status = status;
    await c.save();
    res.json(c);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


export default router;