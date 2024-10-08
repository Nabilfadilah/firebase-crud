import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

const Write = () => {
  const [inputValue1, setInputValue1] = useState();
  const [inputValue2, setInputValue2] = useState();
  const navigate = useNavigate();

  // coneksi
  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "nature/fruits"));
    set(newDocRef, {
      fruitName: inputValue1,
      fruitDefinition: inputValue2,
    })
      .then(() => {
        alert("Data saved succesfully");
        navigate("/read");
      })
      .catch((error) => {
        alert("error: ", error.message);
      });
    console.log(db);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="bg-gray-400 p-4 rounded-md w-1/2">
        <div className="flex justify-end">
          {/* <h1 className="font-extrabold">Add Fruit</h1> */}

          <button className="bg-gray-500 text-white font-bold px-4 py-2 rounded hover:bg-gray-600 mb-4">
            <Link to="/read">Back</Link>
          </button>
        </div>
        <div className="mb-4">
          <label
            htmlFor="input1"
            className="block text-sm font-medium text-white mb-2"
          >
            Nama Buah
          </label>
          <input
            id="input1"
            className="bg-slate-600 text-white p-2 rounded w-full"
            type="text"
            placeholder="Masukkan data pertama"
            value={inputValue1}
            onChange={(e) => setInputValue1(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="input2"
            className="block text-sm font-medium text-white mb-2"
          >
            Deskripsi Buah
          </label>
          <input
            id="input2"
            className="bg-slate-600 text-white p-2 rounded w-full"
            type="text"
            placeholder="Masukkan data kedua"
            value={inputValue2}
            onChange={(e) => setInputValue2(e.target.value)}
          />
        </div>

        <button
          onClick={saveData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Data
        </button>
      </div>
    </div>
  );
};

export default Write;
