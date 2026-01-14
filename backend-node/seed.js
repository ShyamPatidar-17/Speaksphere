import mongoose from "mongoose";
import dotenv from "dotenv";
import Complaint from "./models/Complaint.js"; // Adjust path to your model

dotenv.config();

// 1. The 5 Specific Users you provided
const userIds = [
  "6967b77ff6e72cf6a1618800", // Abhishek
  "6967b79af6e72cf6a1618803", // Dashrath
  "6967b7b2f6e72cf6a1618806", // Aman
  "6967b7caf6e72cf6a1618809", // Shashank
  "6967b92df6e72cf6a161880d"  // Mayank
];

// 2. Realistic Issue Templates to mix and match
const issueTypes = [
  { category: "Mess", title: "Uncooked food served", text: "The rice served in dinner was raw and uncooked." },
  { category: "Mess", title: "Insects in food", text: "Found a small insect in the dal served today." },
  { category: "Mess", title: "Breakfast shortage", text: "Breakfast items ran out before 9 AM." },
  { category: "Hostel", title: "Water cooler broken", text: "The water cooler on the 3rd floor is leaking." },
  { category: "Hostel", title: "Dirty washrooms", text: "Washrooms in Block B haven't been cleaned in 3 days." },
  { category: "Hostel", title: "Room window broken", text: "My room window glass is broken, please fix it." },
  { category: "Infrastructure", title: "Broken fan in classroom", text: "Fan in Room 302 is making loud noises and wobbling." },
  { category: "Infrastructure", title: "Projector not working", text: "Lab 2 projector display is flickering constantly." },
  { category: "Infrastructure", title: "Broken chair", text: "Several chairs in the library are broken." },
  { category: "Academics", title: "Teacher absenteeism", text: "Maths faculty has not attended the last 3 lectures." },
  { category: "Academics", title: "Lab equipment missing", text: "Not enough multimeters for the physics experiment." },
  { category: "WiFi", title: "Slow internet speed", text: "WiFi speed is less than 100kbps in the hostel." },
  { category: "WiFi", title: "No connectivity in library", text: "Cannot connect to EduRoam in the reading hall." },
  { category: "Sports", title: "Basketball rim broken", text: "The net and rim on the court are damaged." },
  { category: "Sports", title: "Gym equipment rusted", text: "Dumbbells are rusted and unsafe to use." }
];

const statuses = ["pending", "resolved", "rejected"];

// 3. Helper to pick random items
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// 4. Generate 100 Issues
const generateComplaints = () => {
  const complaints = [];
  
  for (let i = 0; i < 100; i++) {
    const issue = getRandom(issueTypes);
    const randomUser = getRandom(userIds);
    const randomVoter = getRandom(userIds); // Pick a random user as the last voter
    
    // Generate a random date within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    complaints.push({
      _id: new mongoose.Types.ObjectId(), // Generate unique ID for the complaint
      user: randomUser,
      title: `${issue.title}`, 
      text: `${issue.text}`,
      category: issue.category,
      sentiment: parseFloat((Math.random() * -1).toFixed(2)), // Mostly negative sentiment (-0.1 to -1.0)
      votes: Math.floor(Math.random() * 50) + 1, // Random votes between 1 and 50
      status: getRandom(statuses),
      votedBy: randomVoter,
      createdAt: date
    });
  }
  return complaints;
};

// 5. Run the Seed
const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/your_db_name");
    console.log("Connected to DB");

    const data = generateComplaints();
    
    // Clear old data (optional)
    await Complaint.deleteMany({});
    
    // Insert 100 new records
    await Complaint.insertMany(data);
    
    console.log("✅ Successfully created 100 complaints!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();