// import React, { useEffect, useState } from "react";
// import image from "./download.jpg";
// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "./firebase";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteInputData, googleLogin, login, signup, userFormData } from "../Redux/userSlice";
// import { useNavigate } from "react-router-dom";
// import Input from "./Input";
// const Login = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [next, setNext] = useState(false);
//   const navigate = useNavigate();
//   const formData = useSelector(store => store.user.userInput);
//   const dispatch = useDispatch();

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const res = await dispatch(googleLogin({ email: result.user.email }))
//       navigate("/");
//     } catch (error) {

//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(userFormData({ key: name, value }));
//   };

//   useEffect(() => {
//     dispatch(deleteInputData());
//   }, [isSignUp])

//   useEffect(() => {
//     if (localStorage.getItem("user")) {
//       navigate("/");
//     }
//   })

//   const handleLogin = async () => {
//     const res = await dispatch(login(formData))
//     navigate("/");
//   }
//   const handleSignUp = async () => {
//     const res = await dispatch(signup(formData))
//     navigate("/");
//   }
//   return (
//     <div className="container-fluid login-container shadow-lg vh-100">
//       <div className="container py-5">
//         <div className="row bg-white rounded-4 shadow-lg overflow-hidden" style={{ maxWidth: "1000px", margin: '0 auto' }}>
//           <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-0">
//             <div
//               className="position-relative w-100 h-100"
//               style={{
//                 backgroundImage: `url(${image})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 backgroundRepeat: 'no-repeat',
//                 minHeight: '100%',
//               }}
//             >
//               <div
//                 className="position-absolute bottom-0 start-0 end-0 p-4 text-center"
//                 style={{
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                   backdropFilter: 'blur(10px)',
//                   WebkitBackdropFilter: 'blur(10px)',
//                   color: '#fff',
//                 }}
//               >
//                 <h4 className="fw-bold mb-1">
//                   {isSignUp ? "Create Account" : "Welcome Back!"}
//                 </h4>
//                 <p className="mb-0">
//                   {isSignUp ? "Join us today" : "Please login to access your account"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-6 p-5">
//             <div className="text-center mb-4">
//               <h2 className="fw-bold text-gradient" style={{
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent'
//               }}>
//                 <i className={`bi ${isSignUp ? 'bi-person-plus' : 'bi-box-arrow-in-right'} me-2`}></i>
//                 {isSignUp ? "Sign Up" : "Login"}
//               </h2>
//               <p className="text-muted">Enter your credentials to continue</p>
//             </div>

//             {!next && <Input type={"email"} id={"email"} name={"email"} value={formData?.email} placeholder={"name@gmail.com"} handleonChange={handleChange} lableName={"Email Address"} lableClass={"bi bi-envelope-fill me-2 text-primary"} />
//             }

//             {isSignUp && next && <>
//               <Input
//                 type="text"
//                 id="shopName"
//                 name="shopName"
//                 value={formData?.shopName}
//                 placeholder="Enter your shop name"
//                 handleonChange={handleChange}
//                 lableName="Shop Name"
//                 lableClass="bi bi-shop me-2 text-primary"
//               />

//               <Input
//                 type="text"
//                 id="shopAdd"
//                 name="shopAdd"
//                 value={formData?.shopAdd}
//                 placeholder="Shop No, Street, City"
//                 handleonChange={handleChange}
//                 lableName="Full Address"
//                 lableClass="bi bi-geo-alt-fill me-2 text-primary"
//               />

//               <Input
//                 type="text"
//                 id="district"
//                 name="district"
//                 value={formData?.district}
//                 placeholder="Enter your district"
//                 handleonChange={handleChange}
//                 lableName="District"
//                 lableClass="bi bi-building me-2 text-primary"
//               />
//             </>}

//             {!next && <Input type={"password"} id={"Password"} name={"Password"} value={formData?.password} placeholder={"Password"} handleonChange={handleChange} lableName={"Password"} lableClass={"bi bi-lock-fill me-2 text-primary"} />
//             }
//             {isSignUp && !next && (
//               <Input type={"password"} id={"confirmPassword"} name={"confirmPassword"} value={formData?.confirmPassword} placeholder={"Confirm Password"} handleonChange={handleChange} lableName={"Confirm Password"} lableClass={"bi bi-lock-fill me-2 text-primary"} />
//             )}

//             {!isSignUp && (
//               <div className="d-flex justify-content-center align-items-center mb-4">
//                 <a href="#" className="text-decoration-none" style={{ color: '#764ba2' }}>Forgot password?</a>
//               </div>
//             )}

//             <button
//               type="submit"
//               className="btn btn-primary w-100 py-2 mb-3 fw-bold"
//               style={{
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 border: 'none',
//                 borderRadius: '50px',
//                 fontSize: '1.1rem'
//               }}
//               onClick={isSignUp ? !next ? () => setNext(val => !val) : handleSignUp : handleLogin}
//             >
//               {isSignUp ? next ? "SignUp" : "Next" : "Login"}
//             </button>

//             <div className="text-center mb-4 position-relative">
//               <hr className="my-4" />
//               <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
//                 or continue with
//               </span>
//             </div>

//             <div className="d-flex justify-content-center gap-3 mb-4">
//               <button
//                 type="button"
//                 className="btn btn-outline-danger rounded-circle p-2"
//                 style={{ width: '45px', height: '45px' }}
//                 onClick={handleGoogleLogin}
//               >
//                 <i className="bi bi-google fs-5"></i>
//               </button>
//             </div>

//             <div className="text-center">
//               <p className="text-muted d-flex justify-content-evenly">
//                 {isSignUp ? "Already have an account? " : "Don't have an account? "}
//                 <button
//                   type="button"
//                   className="text-decoration-none fw-bold border-0 bg-transparent"
//                   style={{ color: '#764ba2' }}
//                   onClick={() => setIsSignUp(!isSignUp)}
//                 >
//                   {isSignUp ? "Login" : "Sign up"}
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInputData,
  googleLogin,
  login,
  signup,
  userFormData
} from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import Input from "./Input";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpWithGoogle, setGoogleSignUp] = useState(false);
  const [next, setNext] = useState(false);
  const navigate = useNavigate();
  const formData = useSelector((store) => store.user.userInput);
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      if (!next) {
        const result = await signInWithPopup(auth, googleProvider);

        const email = result.user.email;
        if (!isSignUp) {
          const res = await dispatch(googleLogin({ email }))
          if (res.payload.token) {
            alert("You have successfully logged in.");
          } else {
            alert(res.payload)
          }
          navigate("/")
          return;
        }
        if (email) {
          dispatch(userFormData({ key: "email", value: email }));
          setGoogleSignUp(true);
          setNext(true);
        } else {
          alert("Google login failed to retrieve email.");
        }
      }

    } catch (error) {
      console.error("Google Login Error", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(userFormData({ key: name, value }));
  };


  useEffect(() => {
    dispatch(deleteInputData());
    setNext(false);
  }, [isSignUp, dispatch]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert("Please enter email and password.");
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      alert("Please fill in all fields with a valid Gmail address.");
      return;
    } else {
      const res = await dispatch(login({ email: formData.email, password: formData.password }));
      if (res.payload.token) {
        alert("You have successfully logged in.");
      } else {
        alert(res.payload)
      }
      navigate("/");
    }

  };

  const handleSignUp = async () => {
    const {
      shopName,
      shopAdd,
      district,
      phoneNumber
    } = formData;

    const errors = [];

    if (!shopName) errors.push("Shop name is required.");

    if (!phoneNumber || !/^[6-9]\d{9}$/.test(phoneNumber)) {
      alert("Please enter a valid 10-digit Indian mobile number starting with 6-9.");
    }

    if (!shopAdd || shopAdd.split(",").length < 3) {
      errors.push("Shop address must be in format: No, Street Name, City");
    }
    if (!district) errors.push("District is required.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    } else {
      if (!signUpWithGoogle) {
        const res = await dispatch(signup(formData));
        if (res.payload.token) {
          alert("Your account has been created successfully.");
        } else {
          alert(res.payload)
        }
      }
      else {
        const res = await dispatch(googleLogin(formData));
        if (res.payload.token) {
          alert("Your account has been created successfully.");
        } else {
          alert(res.payload)
        }
      }
      navigate("/");
    }
  };

  return (
    <div className="container-fluid login-container shadow-lg vh-100">
      <div className="container py-5">
        <div
          className="row bg-white rounded-4 shadow-lg overflow-hidden"
          style={{ maxWidth: "1000px", margin: "0 auto" }}
        >
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-0">
            <div
              className="position-relative w-100 h-100 back"
            >
              <div
                className="position-absolute bottom-0 start-0 end-0 p-4 text-center"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  color: "#fff"
                }}
              >
                <h4 className="fw-bold mb-1">
                  {isSignUp ? "Create Account" : "Welcome Back!"}
                </h4>
                <p className="mb-0">
                  {isSignUp
                    ? "Join us today"
                    : "Please login to access your account"}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6 p-5">
            <div className="text-center mb-4">
              <h2
                className="fw-bold text-gradient"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                <i
                  className={`bi ${isSignUp ? "bi-person-plus" : "bi-box-arrow-in-right"
                    } me-2`}
                ></i>
                {isSignUp ? "Sign Up" : "Login"}
              </h2>
              <p className="text-muted">Enter your credentials to continue</p>
            </div>

            {!next && (
              <>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData?.email || ""}
                  placeholder="name@gmail.com"
                  handleonChange={handleChange}
                  labelName="Email Address"
                  labelClass="bi bi-envelope-fill me-2 text-primary"
                />

                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData?.password || ""}
                  placeholder="Password"
                  handleonChange={handleChange}
                  labelName="Password"
                  labelClass="bi bi-lock-fill me-2 text-primary"
                />

                {isSignUp && (
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData?.confirmPassword || ""}
                    placeholder="Confirm Password"
                    handleonChange={handleChange}
                    labelName="Confirm Password"
                    labelClass="bi bi-lock-fill me-2 text-primary"
                  />
                )}
              </>
            )}

            {isSignUp && next && (
              <>
                <Input
                  type="text"
                  id="shopName"
                  name="shopName"
                  value={formData?.shopName || ""}
                  placeholder="Enter your shop name"
                  handleonChange={handleChange}
                  labelName="Shop Name"
                  labelClass="bi bi-shop me-2 text-primary"
                />

                <Input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData?.phoneNumber || ""}
                  placeholder="Enter your mobile number"
                  handleonChange={handleChange}
                  labelName="Mobile Number"
                  labelClass="bi bi-telephone-fill me-2 text-primary"
                  maxLength="10"
                  pattern="[0-9]{10}"
                />

                <Input
                  type="textarea"
                  id="shopAdd"
                  name="shopAdd"
                  value={formData?.shopAdd || ""}
                  placeholder="No, Street Name, City, District"
                  handleonChange={handleChange}
                  labelName="No, Street Name, City, District"
                  labelClass="bi bi-geo-alt-fill me-2 text-primary"
                />

                <Input
                  type="text"
                  id="district"
                  name="district"
                  value={formData?.district || ""}
                  placeholder="Enter your district"
                  handleonChange={handleChange}
                  labelName="District"
                  labelClass="bi bi-building me-2 text-primary"
                />
              </>
            )}

            {!isSignUp && (
              <div className="d-flex justify-content-center align-items-center mb-4">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ color: "#764ba2" }}
                >
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 mb-3 fw-bold"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "50px",
                fontSize: "1.1rem"
              }}
              onClick={
                isSignUp
                  ? !next
                    ? () => {
                      if (
                        !formData.email ||
                        !formData.password ||
                        !formData.confirmPassword
                      ) {
                        alert("Please fill in all fields before continuing.");
                        return;
                      }
                      if (formData.password !== formData.confirmPassword) {
                        alert("Passwords do not match.");
                        return;
                      }
                      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
                        alert("Please fill in all fields with a valid Gmail address.");
                        return;
                      }
                      if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/.test(formData.password)) {
                        alert("Password must contain at least one uppercase letter, one number, and one special character.");
                        return;
                      }
                      setNext(true);
                    }
                    : handleSignUp
                  : handleLogin
              }
            >
              {isSignUp ? (next ? "Sign Up" : "Next") : "Login"}
            </button>

            {!next && <> <div className="text-center mb-4 position-relative">
              <hr className="my-4" />
              <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                or continue with
              </span>
            </div>

              <div className="d-flex justify-content-center gap-3 mb-4">
                <button
                  type="button"
                  className="btn btn-outline-danger rounded-circle p-2"
                  style={{ width: "45px", height: "45px" }}
                  onClick={handleGoogleLogin}
                >
                  <i className="bi bi-google fs-5"></i>
                </button>
              </div>
            </>}

            <div className="text-center">
              <p className="text-muted d-flex justify-content-evenly">
                {isSignUp
                  ? "Already have an account? "
                  : "Don't have an account? "}
                <button
                  type="button"
                  className="text-decoration-none fw-bold border-0 bg-transparent"
                  style={{ color: "#764ba2" }}
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setNext(false);
                  }}
                >
                  {isSignUp ? "Login" : "Sign up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
