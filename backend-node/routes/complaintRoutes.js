import express from "express";
import axios from "axios";
import Complaint from "../models/Complaint.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, async(req,res)=>{
  const { text, category } = req.body;
  const py = await axios.post(process.env.PY_API,{ text });
  const c = await Complaint.create({
    user:req.user.id, text, category, sentiment: py.data.sentiment
  });
  res.json(c);
});


router.get("/all",async(req,res)=>{
  const complaints=await Complaint.find({})
  res.send(complaints)
})

router.get("/", protect, async(req,res)=>{
  const list = await Complaint.find().populate("user","name");
  res.json(list);
});

router.get("/:id", async(req,res)=>{
  console.log(req.params.id)
  const list = await Complaint.findById(req.params.id);
  res.send(list);
});

router.post("/:id/vote", protect, async(req,res)=>{
  const c = await Complaint.findById(req.params.id);
  console.log(c)
  c.votes += 1;
  console.log("vxdg",c)
  await c.save();
  res.json(c);
});


router.put("/:id/status", async(req,res)=>{

   console.log(req.params.id)


  try {
    const { status } = req.body;
    const c = await Complaint.findById(req.params.id);

    if (!c) {
      return res.status(404).json({ msg: "Complaint not found" });
    }

    c.status = status;
    await c.save();
    res.send(c);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;