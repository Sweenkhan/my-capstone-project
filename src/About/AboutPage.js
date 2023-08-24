import React from "react";
import image1 from "../images/bookself2.jpg";
import image2 from "../images/bookself3.png";
import image3 from "../images/bookself4.jpeg";
import image4 from "../images/bookself5.jpg";
import "./AboutPage.css";

function Aboutpage() {
  return (
    <div className="about">
      <div className="aboutBanner">
        <div className="aboutBannerContent">
          <h1>About Us</h1>
          <p>
            {" "}
            A bookshelf is more than a mere piece of furniture; it's a gateway
            to exploration, a repository of knowledge, and a reflection of one's
            personality and interests. From the elegant symmetry of classic
            wooden designs to the sleek minimalism of modern creations,
          </p>
          <button className="ABOUT-BTTN">LEARN MORE</button>
        </div>
      </div>
      <div className="con">
        <div className="img1">
          <img src={image1} alt=" "></img>
        </div>
        <div className="content">
          <h1>Good heading</h1>
          <p>
            A bookshelf is more than a mere piece of furniture; it's a gateway
            to exploration, a repository of knowledge, and a reflection of one's
            personality and interests. From the elegant symmetry of classic
            wooden designs to the sleek minimalism of modern creations,
          </p>
        </div>
      </div>
      <div className="con">
        <div className="content">
          <h1>Good heading</h1>
          <p>
            The journey through a bookshelf is an adventure in itself. Each
            shelf holds the promise of new worlds, fresh perspectives, and
            uncharted territories. For a bibliophile, a bookshelf is a treasure
            trove, a refuge where the tangible pages of beloved stories are
            ready to be revisited at any moment.
          </p>
        </div>
        <div className="img1">
          <img src={image2} alt=" "></img>
        </div>
      </div>
      <div className="con">
        <div className="img1">
          <img src={image4} alt=" "></img>
        </div>
        <div className="content">
          <h1>Good heading</h1>
          <p>
            Bookshelves also provide an insight into the mind of their owner.
            The choice of books displayed can reveal intellectual pursuits,
            hobbies, and even sentimental attachments. A bookshelf adorned with
            an assortment of genres suggests a curious and open mind,
          </p>
        </div>
      </div>
      <div className="con">
        <div className="content">
          <h1>Good heading</h1>
          <p>
            bookshelf is a testament to the human pursuit of knowledge and
            creativity. It's a stage for ideas to flourish, dreams to be
            nurtured, and conversations to begin. A bookshelf is an
            ever-evolving masterpiece, a canvas that can be rearranged and
            redecorated to reflect the changes in one's life.
          </p>
        </div>
        <div className="img1">
          <img src={image3} alt=" "></img>
        </div>
      </div>
    </div>
  );
}

export default Aboutpage;
