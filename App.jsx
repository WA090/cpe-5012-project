import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState('');

  const builtInImages = [
    {
      name: 'Lion',
      url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Cat',
      url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Dog',
      url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleBuiltInImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="App">
      <h1>Meme Generator</h1>

      <div className="image-controls">
        <h2>Choose an Image</h2>

        <label className="upload-button">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>

        <h3>Built-in Images</h3>

        <div className="built-in-images">
          {builtInImages.map((image) => (
            <button
              key={image.name}
              onClick={() => handleBuiltInImage(image.url)}
            >
              {image.name}
            </button>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="image-container">
          <img
            src={selectedImage}
            alt="Selected"
            className="watermarked-image"
          />
        </div>
      )}
    </div>
  );
}

export default App;