import React, { useState } from "react";

function ManualSearch({ onAdd }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <div className="my-4">
      <input
        type="text"
        className="border px-3 py-2 rounded mr-2"
        placeholder="Type an ingredient"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}

export default ManualSearch;
