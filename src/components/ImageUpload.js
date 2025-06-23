import React, { useState } from "react";
import axios from "axios";

function ImageUpload({ onDetect }) {
  const [preview, setPreview] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      detectIngredients(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const detectIngredients = async (base64Image) => {
    const res = await axios.post(
      "https://infer.roboflow.com/snapchefplus/detect-count-and-visualize-6?api_key=o9nY4Cbu8jN9N1V18nhJ",
      { image: base64Image }
    );
    const items = res.data.predictions.map((p) => p.class);
    onDetect(items);
  };

  return (
    <div className="mb-4 text-center">
      <input type="file" onChange={handleUpload} accept="image/*" />
      {preview && <img src={preview} alt="preview" className="mt-4 max-w-xs" />}
    </div>
  );
}

export default ImageUpload;
