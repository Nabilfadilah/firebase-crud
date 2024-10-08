import React, { useState, useEffect } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get, update } from "firebase/database";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams(); // Ambil id dari URL
  const [fruitName, setFruitName] = useState("");
  const [fruitDefinition, setFruitDefinition] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataById = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, `nature/fruits/${id}`); // Pastikan menggunakan id yang benar
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setFruitName(data.fruitName);
        setFruitDefinition(data.fruitDefinition);
        console.log(data);
      } else {
        alert("No data available for this ID");
      }
    };

    fetchDataById();
  }, [id]);

  const handleUpdate = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `nature/fruits/${id}`);
    await update(dbRef, {
      fruitName,
      fruitDefinition,
    });
    navigate("/read"); // Redirect back to the read page after update
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="bg-gray-400 p-4 rounded-md w-1/2">
        <div className="flex justify-end items-center gap-10">
          <h2 className="text-white text-lg font-bold mb-4">
            Update Fruit Data
          </h2>
          <button className="bg-gray-500 text-white font-bold px-4 py-2 rounded hover:bg-gray-600 mb-4">
            <Link to="/read">Back</Link>
          </button>
        </div>
        <div className="mb-4">
          <label
            htmlFor="fruitName"
            className="block text-sm font-medium text-white mb-2"
          >
            Fruit Name
          </label>
          <input
            id="fruitName"
            className="bg-slate-600 text-white p-2 rounded w-full"
            type="text"
            value={fruitName}
            onChange={(e) => setFruitName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="fruitDefinition"
            className="block text-sm font-medium text-white mb-2"
          >
            Fruit Definition
          </label>
          <input
            id="fruitDefinition"
            className="bg-slate-600 text-white p-2 rounded w-full"
            type="text"
            value={fruitDefinition}
            onChange={(e) => setFruitDefinition(e.target.value)}
          />
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Data
        </button>
      </div>
    </div>
  );
};

export default Update;
