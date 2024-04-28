import React, { useState, useEffect } from 'react';
import asset from "../../assets/note.svg";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import UserWorkflow from '../../components/userWorkflow/UserWorkflow';

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
      const jsonData = await res.json(); 
      setData(jsonData); 
    } catch (err) {
      setErr(err);
    }
  };

  useEffect(() => {
    
    fetchData();
  }, [currentUser]); 
console.log(data)
  return (
    <div className='user-workflow'>
      {data ? data.map((work) => (
        <>
          <UserWorkflow id={work.uniqueid}/>
          
        </>
      )) : (<div className='home'>
      <img src={asset} alt='logo' />
      <p>Create your first workflow!</p>
      <button onClick={navigateHandler}>Create Workflow</button>
    
    </div>)}
    </div>
  );
};

export default Home;
