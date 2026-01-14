import { useEffect, useState } from "react";
import axios from "axios";

export default function MyComplaints() {
  const [list, setList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/complaints", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) =>
        setList(res.data.filter((c) => c.user?._id === user.id))
      );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4">My Complaints</h2>

      {list.map((c) => (
        <div key={c._id} className="bg-white p-4 mb-3 rounded shadow">
          <p>{c.text}</p>
          <p className="text-sm text-gray-500">
            Status: {c.status} | Votes: {c.votes}
          </p>
        </div>
      ))}
    </div>
  );
}
