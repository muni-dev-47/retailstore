import React, { useState } from "react";
import image from "./download.jpg";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ Google login success:", result.user);
      alert("Welcome " + result.user.displayName);
    } catch (error) {
      console.error("❌ Google login error:", error);
      alert("Google login failed. Try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log(isSignUp ? "Signing up..." : "Logging in...", formData);
  };

  return (
    <div className="container-fluid login-container shadow-lg vh-100">
      <div className="container py-5">
        <div className="row bg-white rounded-4 shadow-lg overflow-hidden" style={{ maxWidth: "1000px", margin: '0 auto' }}>
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-0">
            <div
              className="position-relative w-100 h-100"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100%',
              }}
            >
              <div
                className="position-absolute bottom-0 start-0 end-0 p-4 text-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', // light blur bg
                  backdropFilter: 'blur(10px)', // blur effect
                  WebkitBackdropFilter: 'blur(10px)', // for Safari
                  color: '#fff',
                }}
              >
                <h4 className="fw-bold mb-1">
                  {isSignUp ? "Create Account" : "Welcome Back!"}
                </h4>
                <p className="mb-0">
                  {isSignUp ? "Join us today" : "Please login to access your account"}
                </p>
              </div>

            </div>
          </div>

          {/* Right Form */}
          <div className="col-lg-6 p-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-gradient" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                <i className={`bi ${isSignUp ? 'bi-person-plus' : 'bi-box-arrow-in-right'} me-2`}></i>
                {isSignUp ? "Sign Up" : "Login"}
              </h2>
              <p className="text-muted">Enter your credentials to continue</p>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ borderLeft: '4px solid #667eea' }}
              />
              <label htmlFor="email">
                <i className="bi bi-envelope-fill me-2 text-primary"></i>
                Email address
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                style={{ borderLeft: '4px solid #764ba2' }}
              />
              <label htmlFor="password">
                <i className="bi bi-lock-fill me-2 text-primary"></i>
                Password
              </label>
            </div>

            {isSignUp && (
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  style={{ borderLeft: '4px solid #764ba2' }}
                />
                <label htmlFor="confirmPassword">
                  <i className="bi bi-lock-fill me-2 text-primary"></i>
                  Confirm Password
                </label>
              </div>
            )}

            {!isSignUp && (
              <div className="d-flex justify-content-center align-items-center mb-4">
                <a href="#" className="text-decoration-none" style={{ color: '#764ba2' }}>Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 mb-3 fw-bold"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1.1rem'
              }}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>

            <div className="text-center mb-4 position-relative">
              <hr className="my-4" />
              <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                or continue with
              </span>
            </div>

            <div className="d-flex justify-content-center gap-3 mb-4">
              <button
                type="button"
                className="btn btn-outline-danger rounded-circle p-2"
                style={{ width: '45px', height: '45px' }}
                onClick={handleGoogleLogin}
              >
                <i className="bi bi-google fs-5"></i>
              </button>
            </div>

            <div className="text-center">
              <p className="text-muted d-flex justify-content-evenly">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button
                  type="button"
                  className="text-decoration-none fw-bold border-0 bg-transparent"
                  style={{ color: '#764ba2' }}
                  onClick={() => setIsSignUp(!isSignUp)}
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