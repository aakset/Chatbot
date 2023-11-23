import React from 'react';
import "../style/About.css";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h2 className='About-Title'>Welcome to PolarChat!</h2>
      <p className='About-Content'>
        Hi! I am Aakash and this is my PolarChat app for the module "Prog 2". 
      </p>
      <p className='About-Content'>
        PolarChat is a chatbot that answers polar questions, or in other words yes / no questions. 
        Additionally, it is able to answer a few other questions and open websites.     
      </p>
      <p className='About-Content'>
        KEEP IN MIND: The navigation works strictly through the chat.
        This project was created by me, Aakash Sethi, and is under Peter Rutschmann's supervision.
      </p>

      <Link to="/login" className="button">
      Log back in!
      </Link>
    </div>
  );
};

export default About;
