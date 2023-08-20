import React from "react";
import "./About.css";
import aboutImg from "../images/about-ng.jpg"

function About() {
  return (
    <div className="about">
      <div className="aboutCnt">
        <div className="firstCnt">
          <p> <h2>Welcome to Bookshelf!</h2> At Bookshelf, we are passionate about
            books and the incredible journeys they take us on. Our website is a
            labor of love, created to bring together book enthusiasts from all
            walks of life. Whether you're an avid reader, a curious learner, or
            someone looking for inspiration, you've come to the right place. </p>
            <img src={aboutImg} alt="first"></img>
        </div>
        <div className="secondCnt">
          <p> <h2>Our Story</h2>The idea for Bookshelf was born out of a shared
            love for literature and a desire to create a space where book lovers
            could come together to discover, discuss, and celebrate the written
            word </p>
        </div>
      </div>
    </div>
  );
}

export default About;
