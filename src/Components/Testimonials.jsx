import React from "react";

const testimonialsData = [
  {
    id: 1,
    author: "John Doe",
    position: "CEO, Company A",
    testimonial:
      "Download high quality website templates created with Bootstrap 5! Bootstrap 5 is a major release and comes with many improvements and features that will simplify building new websites. As always, the official Bootstrap documentation page is the best place to start and learn everything about Bootstrap, its features and components. There is also a migrating to v5 guide where you can be informed on how to migrate from v4 to v5 and learn more about all the changes.",
  },
  {
    id: 2,
    author: "Jane Smith",
    position: "Founder, Company B",
    testimonial:
      "Append is a cutting-edge website template meticulously crafted to cater to the needs of startups, apps, and IT service providers. With its sleek and contemporary design, this template offers a perfect blend of functionality and aesthetics, empowering your online presence and captivating your audience.",
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>Client Testimonials</h2>
      <div className="testimonial-list">
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className="testimonial">
            <p>{testimonial.testimonial}</p>
            <div className="testimonial-author">
              <strong>{testimonial.author}</strong>
              <p>{testimonial.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
