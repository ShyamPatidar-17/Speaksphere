import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");

  const submitComplaint = async () => {
    await axios.post(
      "http://localhost:5000/api/complaints",
      { text, category },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
    alert("Complaint submitted");
    setText("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Submit Grievance</h2>

        <textarea
          className="w-full p-3 border rounded mb-4"
          placeholder="Describe your issue..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>General</option>
          <option>Infrastructure</option>
          <option>Academics</option>
        </select>

        <button
          onClick={submitComplaint}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
