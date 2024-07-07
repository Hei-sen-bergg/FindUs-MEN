import React from 'react';
import './About.scss';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About FindUs</h1>
      <p className="about-text">
        Welcome to <strong>FindUs</strong>, a platform designed specifically for solo travelers and teams looking for genuine places to stay. We understand the challenges of finding reliable accommodations, especially for solo adventurers, and our goal is to make your travel experience smoother and more enjoyable.
      </p>
      <h2 className="about-subtitle">Our Mission</h2>
      <p className="about-text">
        At <strong>FindUs</strong>, our mission is to connect backpackers with safe, comfortable, and authentic places to stay. We aim to build a supportive community where travelers can share their experiences and help each other find the best accommodations.
      </p>
      <h2 className="about-subtitle">Features</h2>
      <ul className="about-features">
        <li>Easy inquiry process</li>
        <li>Affordable rates</li>
        <li>Group booking options</li>
        <li>Intuitive user interface</li>
      </ul>
      <h2 className="about-subtitle">Why Choose Us</h2>
      <p className="about-text">
        <strong>FindUs</strong> is unique because we cater specifically to the needs of solo travelers and small groups. We offer a platform where you can negotiate and finalize bookings only if you are satisfied with the accommodations, ensuring that you have control over your travel plans.
      </p>
      <h2 className="about-subtitle">User Experience</h2>
      <p className="about-text">
        Our app is designed to be user-friendly, with features that make it easy to find and inquire about rooms. We offer excellent customer support and encourage user reviews to help you make informed decisions.
      </p>
      <h2 className="about-subtitle">Join Our Community</h2>
      <p className="about-text">
        Become a part of our community of backpackers. Share your travel stories, tips, and experiences to help others find the best places to stay. Together, we can create a network of reliable accommodations for everyone.
      </p>
      <p className="about-signature">
        Sincerely,
        <br />
        The FindUs Team
      </p>
    </div>
  );
};

export default About;
