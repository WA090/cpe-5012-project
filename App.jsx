import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState('');

  const [texts, setTexts] = useState([]);
  const [newText, setNewText] = useState('');

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

  const addText = () => {
    if (newText.trim() === '') {
      return;
    }

    const textLayer = {
      id: Date.now(),
      text: newText,
    };

    setTexts([...texts, textLayer]);
    setNewText('');
  };

  const deleteText = (id) => {
    setTexts(texts.filter((text) => text.id !== id));
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
        <>
          <div className="text-controls">
            <h2>Add Text</h2>

            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Enter your text"
            />

            <button onClick={addText}>
              Add Text
            </button>
          </div>

          <div className="image-container">
            <img
              src={selectedImage}
              alt="Selected"
              className="watermarked-image"
            />

            {texts.map((text) => (
              <div
                key={text.id}
                className="text-layer"
              >
                {text.text}

                <button
                  className="delete-text"
                  onClick={() => deleteText(text.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;