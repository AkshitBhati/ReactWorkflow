import React, { useState } from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/UserSlice";
import { ClipLoader } from "react-spinners";
import "./Signin.css";

const Signin = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});

  const { loading, error: errMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const showPassword = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className="signin-container">
      <h1>SignIn</h1>

      <div className="signin-form">
        <div className="form-section">
          <p>Email</p>
          <input
            type="text"
            id="email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        <div className="form-section">
          <p>Password</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type={show ? "text" : "password"}
              id="password"
              onChange={handleChange}
              value={formData.password}
            />
            <p
              style={{ fontSize: "19px", cursor: "pointer" }}
              onClick={showPassword}
            >
              {show ? <IoMdEye /> : <IoIosEyeOff />}
            </p>
          </div>
        </div>

        <button onClick={handleSubmit}>
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <ClipLoader size={15} color="#fff" />
              <span className="pl-3">Loading ...</span>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
        <p style={{ fontSize: "15px" }}>
          New Here?{" "}
          <Link to={"/signup"}>
            <span
              style={{
                color: "rgb(9, 106, 197)",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              SignUp
            </span>
          </Link>
        </p>
        {errMessage && (
              <div className='failure'>
          <p >{errMessage}</p>
                </div>
        )}
      </div>
    </div>
  );
};

export default Signin;
