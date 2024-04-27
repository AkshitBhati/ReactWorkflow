import React, { useState, useEffect } from 'react';
import asset from "../../assets/note.svg";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  const [err, setErr] = useState(null);
  const [data, setData] = useState([]);

  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();

  const navigateHandler = () => {
    if (!currentUser) {
      navigate("/signin");
    } else {
      navigate("/workflow");
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/workflow/${currentUser._id}`);
      const jsonData = await res.json(); // Parse response JSON
      setData(jsonData); 
    } catch (err) {
      setErr(err);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, [currentUser]); // Run effect when currentUser changes
console.log(data)
  return (
    <div className='home'>
      <img src={asset} alt='logo' />
      <p>Create your first workflow!</p>
      <button onClick={navigateHandler}>Create Workflow</button>
    {
      data && (
        <div className='box'>
          </div>
      )
    }
    </div>
  );
};

export default Home;
