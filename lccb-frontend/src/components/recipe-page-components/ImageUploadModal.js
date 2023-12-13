import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadModal = ({ isOpen, onClose, onUploadSuccess, stepIndex, stepId, recipeId }) => {

  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };


  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('stepId', stepId);
    formData.append('recipeId', recipeId);

    try {
      const response = await axios.post(`${process.env.REACT_APP_RECPIE_API_URL}/upload/step-image/${stepIndex}`, formData);
      console.log(`Step ${stepIndex} Image uploaded:`, response.data);
      onUploadSuccess(stepIndex, response.data); // Pass any necessary data back to the parent
      onClose(); // Close the modal
    } catch (error) {
      console.error(`Error uploading step ${stepIndex} image:`, error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Upload Image for Step {stepIndex + 1}</h2>
        {imagePreviewUrl && (
          <img src={imagePreviewUrl} alt="Preview" className="mb-4 max-w-xs h-auto" />
        )}

        <input type="file" onChange={handleImageChange} className="block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100"/>
        <div className="flex justify-end mt-4">
          <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Upload</button>
          <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
