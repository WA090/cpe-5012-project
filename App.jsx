import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState('');

  const [texts, setTexts] = useState([]);
  const [newText, setNewText] = useState('');
  const [draggingId, setDraggingId] = useState(null);
  const [selectedTextId, setSelectedTextId] = useState(null);

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
      x: 20,
      y: 20,
      font: 'Arial',
      size: 24,
      color: '#ffffff',
      align: 'left',
      opacity: 1,
      outline: false,
    };

    setTexts([...texts, textLayer]);
    setNewText('');
  };

  const deleteText = (id) => {
    setTexts(texts.filter((text) => text.id !== id));

    if (selectedTextId === id) {
      setSelectedTextId(null);
    }
  };

  const updateTextStyle = (property, value) => {
    setTexts((currentTexts) =>
      currentTexts.map((text) =>
        text.id === selectedTextId
          ? {
              ...text,
              [property]: value,
            }
          : text
      )
    );
  };

  const handleMouseDown = (event, id) => {
    event.preventDefault();
    setDraggingId(id);
    setSelectedTextId(id);
  };

  const handleMouseMove = (event) => {
    if (draggingId === null) {
      return;
    }

    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setTexts((currentTexts) =>
      currentTexts.map((text) =>
        text.id === draggingId
          ? {
              ...text,
              x,
              y,
            }
          : text
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const selectedText = texts.find(
    (text) => text.id === selectedTextId
  );

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

          {selectedText && (
            <div className="style-controls">
              <h2>Text Styling</h2>

              <label>
                Font:
                <select
                  value={selectedText.font}
                  onChange={(e) =>
                    updateTextStyle('font', e.target.value)
                  }
                >
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Impact">Impact</option>
                </select>
              </label>

              <label>
                Size:
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={selectedText.size}
                  onChange={(e) =>
                    updateTextStyle(
                      'size',
                      Number(e.target.value)
                    )
                  }
                />
              </label>

              <label>
                Color:
                <input
                  type="color"
                  value={selectedText.color}
                  onChange={(e) =>
                    updateTextStyle('color', e.target.value)
                  }
                />
              </label>

              <label>
                Alignment:
                <select
                  value={selectedText.align}
                  onChange={(e) =>
                    updateTextStyle('align', e.target.value)
                  }
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </label>

              <label>
                Opacity:
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={selectedText.opacity}
                  onChange={(e) =>
                    updateTextStyle(
                      'opacity',
                      Number(e.target.value)
                    )
                  }
                />
              </label>

              <label>
                Outline:
                <input
                  type="checkbox"
                  checked={selectedText.outline}
                  onChange={(e) =>
                    updateTextStyle(
                      'outline',
                      e.target.checked
                    )
                  }
                />
              </label>
            </div>
          )}

          <div
            className="image-container"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={selectedImage}
              alt="Selected"
              className="watermarked-image"
            />

            {texts.map((text) => (
              <div
                key={text.id}
                className={`text-layer ${
                  selectedTextId === text.id
                    ? 'selected-text'
                    : ''
                }`}
                style={{
                  left: `${text.x}px`,
                  top: `${text.y}px`,
                  fontFamily: text.font,
                  fontSize: `${text.size}px`,
                  color: text.color,
                  textAlign: text.align,
                  width: '200px',
                  opacity: text.opacity,
                  WebkitTextStroke: text.outline
                    ? '1px black'
                    : 'none',
                }}
                onMouseDown={(event) =>
                  handleMouseDown(event, text.id)
                }
              >
                {text.text}

                <button
                  className="delete-text"
                  onMouseDown={(event) =>
                    event.stopPropagation()
                  }
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