import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUploadModal from './ImageUploadModal';

const RecipeEditForm = ({ recipeData, onCancel }) => {
    console.log(recipeData)
    const [editedRecipe, setEditedRecipe] = useState({
        id: '',
        title: '',
        description: '',
        image: '',
        prep_time: '',
        cook_time: '',
        servings: '',
        ingredients: [],
        steps: []
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeStepIndex, setActiveStepIndex] = useState(null);


    useEffect(() => {
        if (recipeData) {
            setEditedRecipe({
                ...recipeData.recipe[0],
                ingredients: recipeData.ingredients,
                steps: recipeData.steps
            });
        }
    }, [recipeData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedRecipe(prev => ({ ...prev, [name]: value }));
    };

    const handleIngredientChange = (index, e) => {
        const updatedIngredients = [...editedRecipe.ingredients];
        updatedIngredients[index][e.target.name] = e.target.value;
        setEditedRecipe({ ...editedRecipe, ingredients: updatedIngredients });
    };

    const handleAddIngredient = () => {
        setEditedRecipe(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, { ingredient_name: '', quantity: '' }]
        }));
    };

    // Function to handle removing an ingredient
    const handleRemoveIngredient = index => {
        setEditedRecipe(prev => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index)
        }));
    };

    const handleStepChange = (index, e) => {
        const updatedSteps = [...editedRecipe.steps];
        updatedSteps[index][e.target.name] = e.target.value;
        setEditedRecipe({ ...editedRecipe, steps: updatedSteps });
    };

        // Function to handle adding a new step
        const handleAddStep = () => {
            setEditedRecipe(prev => ({
                ...prev,
                steps: [...prev.steps, { step_description: '', step_number: prev.steps.length + 1 }]
            }));
        };
    
        // Function to handle removing a step
        const handleRemoveStep = index => {
            setEditedRecipe(prev => ({
                ...prev,
                steps: prev.steps.filter((_, i) => i !== index)
            }));
        };
    

    const openModal = (stepIndex) => {
        setIsModalOpen(true);
        setActiveStepIndex(stepIndex);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setActiveStepIndex(null);
    };

    const handleUploadSuccess = (stepIndex, imageData) => {
        // Update the steps with the new image data
        // This depends on how you want to store the image data
    };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add logic to structure the data as per your API requirements
        const dataToSend = {
            ...editedRecipe,
            ingredients: editedRecipe.ingredients.map(({ ingredient_id, ingredient_name, quantity }) => ({
                ingredient_id, ingredient_name, quantity
            })),
            steps: editedRecipe.steps.map(({ step_id, step_number, step_description }) => ({
                step_id, step_number, step_description
            })),
        };

        try {
            const response = await axios.put(`${process.env.REACT_APP_RECPIE_API_URL}/recipe/${editedRecipe.id}`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                    // Include other headers like authorization tokens if needed
                }
            });

            console.log('Recipe updated:', response.data);
            // Call onCancel or any other logic to navigate away or give feedback
            onCancel();
        } catch (error) {
            console.error('Error updating recipe:', error);
            // Handle errors (e.g., show a message to the user)
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>


            <label className="block mb-2">
                Title:
                <input
                    type="text"
                    name="title"
                    value={editedRecipe.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </label>

            <label className="block mb-2">
                Description:
                <textarea
                    name="description"
                    value={editedRecipe.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </label>

            <label className="block mb-2">
                Prep Time (mins):
                <input
                    type="number"
                    name="prep_time"
                    value={editedRecipe.prep_time}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </label>

            <label className="block mb-2">
                Cook Time (mins):
                <input
                    type="number"
                    name="cook_time"
                    value={editedRecipe.cook_time}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </label>

            <label className="block mb-2">
                Servings:
                <input
                    type="number"
                    name="servings"
                    value={editedRecipe.servings}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </label>

            <h3 className="font-bold mb-2">Ingredients:</h3>
            {editedRecipe.ingredients.map((ingredient, index) => (
                <div key={index} className="mb-2 flex items-center">
                    <input
                        type="text"
                        name="ingredient_name"
                        value={ingredient.ingredient_name}
                        onChange={(e) => handleIngredientChange(index, e)}
                        className="mr-2 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="quantity"
                        value={ingredient.quantity}
                        onChange={(e) => handleIngredientChange(index, e)}
                        className="mr-2 p-2 border border-gray-300 rounded"
                    />
                    <button 
                        type="button" 
                        onClick={() => handleRemoveIngredient(index)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button 
                type="button" 
                onClick={handleAddIngredient}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-2"
            >
                Add Ingredient
            </button>
            <h3 className="font-bold mb-2">Steps:</h3>
            {editedRecipe.steps.map((step, index) => (
                <div key={index} className="mb-2 flex items-center">
                    <textarea
                        name="step_description"
                        value={step.step_description}
                        onChange={(e) => handleStepChange(index, e)}
                        className="mr-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <button 
                        type="button" 
                        onClick={() => handleRemoveStep(index)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={() => openModal(index)}>
            Add Image
            </button>
            <button 
                type="button" 
                onClick={handleAddStep}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-2"
            >
                Add Step
            </button>
            <div>
                
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Save Changes
            </button>

            <button type="button" onClick={onCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">
                Cancel
            </button>
            </div>
            <ImageUploadModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          onUploadSuccess={handleUploadSuccess} 
          stepIndex={activeStepIndex} 
        />
        </form>
        </>
    );
};

export default RecipeEditForm;
