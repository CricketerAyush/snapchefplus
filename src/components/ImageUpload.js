import React, { useState } from "react";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleDetectIngredients = async () => {
    if (!selectedImage) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage, "image.jpg");

    try {
      const response = await fetch(
        "https://serverless.roboflow.com/infer/workflows/snapchefplus/detect-count-and-visualize-6",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer rf_gOEVVijPSUTpOqNBFRkvquK5NPA3", // ⬅️ Replace with your actual publishable key
          },
          body: formData,
        }
      );

      const data = await response.json();

      // Extract prediction results
      const detections =
        data?.results?.[0]?.predictions?.map((item) => item.class) || [];

      setPredictions(detections);
    } catch (error) {
      console.error("Detection failed:", error);
      alert("Failed to detect ingredients.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">SnapChef+ Ingredient Detector</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {selectedImage && (
        <div className="mb-4">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="rounded shadow-md max-h-64 mx-auto"
          />
        </div>
      )}

      <button
        onClick={handleDetectIngredients}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Detecting..." : "Detect Ingredients"}
      </button>

      {predictions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Detected Ingredients:</h3>
          <ul className="list-disc list-inside">
            {predictions.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
