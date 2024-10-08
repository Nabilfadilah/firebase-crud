import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

const Read = () => {
  const [fruitArray, setFruitArray] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const fruitArrayWithIds = Object.keys(data).map((key) => ({
        fruitId: key, // Menyimpan kunci sebagai fruitId
        ...data[key], // Menggabungkan sisa data seperti fruitName dan fruitDefinition
      }));
      setFruitArray(fruitArrayWithIds); // Set array yang sudah termasuk fruitId
    } else {
      alert("error");
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 mb-4"
        >
          Display Data
        </button>

        <button className="bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-600 mb-4 ">
          <Link to="/write">Add Data</Link>
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">No</th>
            <th className="px-4 py-2 border">Fruit Name</th>
            <th className="px-4 py-2 border">Definition</th>
            <th className="px-4 py-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {fruitArray.map((item, index) => {
            console.log(item); // Log untuk memeriksa apakah `item.fruitId` ada
            return (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{index + 1}.</td>
                <td className="px-4 py-2 border">{item.fruitName}</td>
                <td className="px-4 py-2 border">{item.fruitDefinition}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => navigate(`/update/${item.fruitId}`)} // Sekarang fruitId sudah ada
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mx-1"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
