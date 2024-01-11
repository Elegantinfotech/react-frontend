import React from "react";
import RotatingBanner from "./RotatingBanner";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import ContactUs from "./ContactUs";
import StudentRegister from "./StudentRegister";
import NavBar from "./NavigationBar";
const Home = () => {
  return (
    <div>
      <div className="sticky-navbar">
        <NavBar />
      </div>
      <div>
        <section id="sectionHome">
          <RotatingBanner />
        </section>
        <section className="other-content" id="sectionAboutUs">
          <h2>About Us</h2>
          <p>
            "Welcome to Elegant Infotech, where our mission is to empower
            individuals with the knowledge and skills they need to excel in
            their chosen careers. We are dedicated to providing the highest
            quality education, ensuring that every student who walks through our
            doors receives the best possible learning experience.
          </p>
          <p>
            At Elegant Infotech, we stand out from the rest with our team of
            experienced and qualified instructors, a curriculum that's always at
            the cutting edge of industry trends, and a commitment to supporting
            our students as they launch their careers. Your journey to success
            begins here, and we're here to guide you every step of the way."
          </p>
        </section>
        <section className="other-content" id="sectionGallery">
          <h2>Courses We Offer</h2>
          <div className="portfolio-images">
            <div className="circle">
              <p className="text">Basic Computers & fundamentals with MS Office</p>
            </div>
            <div className="circle">
              <p className="text">Tally + GST</p>
            </div>
            <div className="circle">
              <p className="text">Spoken English</p>
            </div>
            <div className="circle">
              <p className="text">C programming</p>
            </div>
            <div className="circle">
              <p className="text">C++</p>
            </div>
            <div className="circle">
              <p className="text">Java</p>
            </div>
            <div className="circle">
              <p className="text">Python</p>
            </div>
            <div className="circle">
              <p className="text">CAD</p>
            </div>
            <div className="circle">
              <p className="text">CATIA</p>
            </div>
            <div className="circle">
              <p className="text">Web Designing</p>
            </div>
            <div className="circle">
              <p className="text">Full Stack Development</p>
            </div>

            {/* <img src="/src/assets/images2.jpg" alt="Project 2" /> */}
            {/* Add more images as needed */}
          </div>
        </section>
        <section>
          <Testimonials />
        </section>
        <section id="sectionRegister" className="other-content">
          <StudentRegister />
        </section>
        <section id="sectionContactUs" className="other-content">
          <ContactUs />
        </section>
        {/* Footer */}
        <footer className="footer">
          <h6>Working Hours</h6>
          <ul>
            <li>Monday - Saturday: 11.00am - 6pm</li>
            <li>Sunday: Closed</li>
          </ul>
          <p>
            Copyrights<span className="red-text">&copy;</span> 2023 Elegant
            Infotech - All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};
export default Home;
