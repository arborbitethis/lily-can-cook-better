import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadModal = ({ isOpen, onClose, onUploadSuccess, stepIndex }) => {

  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      // Replace with your image upload API endpoint
      const response = await axios.post(`/upload/step-image/${stepIndex}`, formData);
      console.log(`Step ${stepIndex} Image uploaded:`, response.data);
      onUploadSuccess(stepIndex, response.data); // Pass any necessary data back to the parent
      onClose(); // Close the modal
    } catch (error) {
      console.error(`Error uploading step ${stepIndex} image:`, error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="image-upload-modal">
      <h2>Upload Image for Step {stepIndex + 1}</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ImageUploadModal;
