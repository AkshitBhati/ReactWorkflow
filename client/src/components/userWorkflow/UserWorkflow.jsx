import React, { useState, useEffect } from 'react';
import "./UserWorkflow.css";

// Import all the images
import svg1 from "../../assets/1.svg";
import svg2 from "../../assets/2.svg";
import svg3 from "../../assets/3.svg";
import svg4 from "../../assets/4.svg";
import svg5 from "../../assets/5.svg";
import svg6 from "../../assets/6.svg";
import svg7 from "../../assets/7.svg";
import svg8 from "../../assets/8.svg";
import svg9 from "../../assets/9.svg";
import svg10 from "../../assets/10.svg";
import { useNavigate } from 'react-router-dom';

const UserWorkflow = ({ uniqueid }) => {
  const images = [svg1, svg2, svg3, svg4, svg5, svg6, svg7, svg8, svg9, svg10];

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  }, []); 

  const navigate = useNavigate()
  const navigateToWorkflow = () => {
    navigate(`/workflow/${uniqueid}`)
  }

  return (
    <div className='box' onClick={navigateToWorkflow}>
    
      <img src={selectedImage} alt="Random Image" />
      <p>{uniqueid}</p>
    </div>
  );
};

export default UserWorkflow;
