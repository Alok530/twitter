import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from "react-redux";

import { signupFailure, signupStart, signupSuccess } from "../../redux/userReducer";
import { BASE_URL } from "../../baseUrl";
import { openBox } from "../../redux/registerUpdateReducer";

const OpenRegister = ({ setOpenRegister }) => {
  const [registerPage, setRegisterPage] = useState(1);
  const [useEmail, setUseEmail] = useState(false);
  const [checked, setChecked] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    dobMonth: "",
    dobDay: "",
    dobYear: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    if (password !== confirmPassword) {
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 2500);
    }
    dispatch(signupStart());
    try {      
        const res = await axios.post(`/api/auth/signup`, {
        name: formData.name,
        username: formData.username,
        password: password,
        email: formData.email,
        phone: formData.phone,        
        trackTwitterContent: checked
      });
      window.localStorage.setItem("tauthtoken",res.data.token);
      dispatch(signupSuccess(res.data.savedUser));
      dispatch(openBox());
      navigate("/");
    } catch (err) {
      console.log('error inside------>',err);
      dispatch(signupFailure());
    };
  };

  const { error, isLoading } = useSelector((state) => state.user);

  return (
    <div className="openRegister">
      <div className="openRegisterWrapper">
        <div className="openRegisterTop">
          {registerPage === 1 ? (
            <AiOutlineClose
              className="openRegisterClose"
              onClick={() => setOpenRegister(false)}
            />
          ) : (
            <BsArrowLeft
              className="openRegisterClose"
              onClick={() => setRegisterPage((prev) => prev - 1)}
            />
          )}
          <h3>Step {registerPage} of 4</h3>
        </div>
        <div className="openRegisterContent">
          {registerPage === 1 && (
            <>
              <h1>Create your account</h1>
              <input
                type="text"
                className="openRegisterInput"
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
              <input
                type="text"
                className="openRegisterInput"
                placeholder="Name"
                name="name"
                onChange={handleChange}
              />
              {useEmail ? (
                <input
                  type="text"
                  className="openRegisterInput"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  className="openRegisterInput"
                  placeholder="Phone"
                  name="phone"
                  onChange={handleChange}
                />
              )}
              <div
                className="openRegisterInputUseEmail"
                onClick={() => setUseEmail((prev) => !prev)}
              >
                {useEmail ? (
                  "Use phone instead"
                ) : (
                  "Use email instead"
                )}
              </div>              
            </>
          )}
          {registerPage === 2 && (
            <>
              <h1>Customize your experience</h1>
              <h3 className="openRegisterSubtitle">
                Track where you see Twitter content across the web
              </h3>
              <div className="openRegisterTextWithInput">
                <p>
                  Twitter uses this data to personalize your experience.
                  This web browsing history will never be stored with your
                  name, email, or phone number.
                </p>
                <input
                  type="checkbox"
                  className="openRegisterCheckbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
              </div>
              <p className="openRegisterTextLarger">
                {/* By signing up, you agree to our Terms, <span className="activeSettingSpan">Privacy Policy</span>, and <span className="activeSettingSpan">Cookie Use</span>. Twitter may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy. <span className="activeSettingSpan">Learn more</span> */}
              </p>
            </>
          )}
          {registerPage === 3 && (
            <>
              <h1>Create your account</h1>
              <div className="openRegisterInputPreview">
                {formData.username}
              </div>
              <div className="openRegisterInputPreview">
                {formData.email === "" ? formData.phone : formData.email}
              </div>              
              <p
                className="openRegisterText"
                style={{ width: "100%", marginTop: "30px" }}
              >                
              </p>
            </>
          )}
          {registerPage === 4 && (
            <>
              <h1>Enter password</h1>
              <div className="openRegisterText">
                Enter password below to finish sign up process.
              </div>
              <input
                type="password"
                className="openRegisterInput"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="openRegisterInput"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && (
                <div className="openRegisterError">
                  Passwords do not match!
                </div>
              )}
            </>
          )}
          {registerPage !== 4 ? (
            <button
              className="openRegisterButton"
              onClick={() => setRegisterPage((prev) => prev + 1)}
              disabled={formData.name === "" || formData.username === "" ||  (formData.email === "" && formData.phone === "")}
            >
              Next
            </button>
          ) : (
            <>
              <button
                className="openRegisterButton"
                onClick={(e)=>{handleSubmit(e)}}
                disabled={password === "" || confirmPassword === ""}
              >
                {isLoading ? <BeatLoader size={10} color={"#ffffff"} /> : "Sign up"}
              </button>
              {error && (
                <div className="openRegisterError">
                  Something went wrong, please try again!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OpenRegister