import React from 'react';

const Gallery = () => {
const images = [
    "/src/assets/images1.jpg",
    "/src/assets/images2.jpg",
    "/src/assets/images3.jpg",
    "/src/assets/images1.jpg",
    "/src/assets/images2.jpg",
    "/src/assets/images3.jpg",
    "/src/assets/images1.jpg",
    "/src/assets/images2.jpg"

  ];
  return (
    <section className="gallery">
      <h2>Portfolio</h2>
      <div className="gallery-item">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image} alt={`Portfolio Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;