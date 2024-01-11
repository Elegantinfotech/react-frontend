import React from 'react';
import { Carousel } from 'react-bootstrap';

function RotatingBanner() {
  return (
    <div className='banner-container'>
    <Carousel>
      <Carousel.Item className='c_item'>
        <img
          className="d-block w-100"
          src="/src/assets/images1.jpg" 
          alt="First slide"
        />
        <Carousel.Caption className='c_caption'>
          <h3>Unlock Your Potential with Us</h3>
          <p>Discover a world of opportunity through quality education. Explore our diverse range of courses and embark on a journey to success.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='c_item'>
        <img
          className="d-block w-100"
          src="/src/assets/images2.jpg" 
          alt="Second slide"
        />
        <Carousel.Caption className='c_caption'>
          <h3>Empower Your Future with Knowledge</h3>
          <p>We're dedicated to equipping you with the skills and expertise needed for a successful career. Join us in shaping your future.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='c_item'>
        <img
          className="d-block w-100"
          src="/src/assets/images3.jpg" 
          alt="Second slide"
        />
        <Carousel.Caption className='c_caption'>
          <h3>Quality Education, Endless Possibilities</h3>
          <p>Experience top-notch education with our expert instructors and cutting-edge curriculum. Choose from a wide variety of courses and open the door to limitless opportunities.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default RotatingBanner;
