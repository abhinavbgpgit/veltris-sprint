import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import ReactLogo from "../../assets/react.svg";

const Login = () => {
  const [username, setUsername] = useState("johnsmith007");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setFormError("Please enter both username and password.");
      return;
    }
    setFormError("");
    // Demo login logic
    if (username === "abhi@gmail.com" && password === "Hello@123") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/";
    } else {
      setFormError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginCard}>
        {/* Left Slider Section */}
        <div className={styles.sliderSection}>
          <img src={ReactLogo} alt="Demo" className={styles.sliderImage} />
          <div className={styles.sliderTitle}>Exam Mastery Hub</div>
          <div className={styles.sliderSubtitle}>
            Unleash Your Academic Success with Exam Mastery Hub's Exam Excellence Platform
          </div>
          <div className={styles.sliderDots}>
            <span className={`${styles.sliderDot} ${styles.active}`}></span>
            <span className={styles.sliderDot}></span>
            <span className={styles.sliderDot}></span>
            <span className={styles.sliderDot}></span>
          </div>
        </div>
        {/* Right Login Form Section */}
        <div className={styles.formSection}>
          <div className={styles.logo}>
            MASTERY <span className={styles.hub}>HUB</span>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <label className={styles.formLabel} htmlFor="username">
              Username or email
            </label>
            <input
              id="username"
              className={styles.formInput}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
            <label className={styles.formLabel} htmlFor="password">
              Password
            </label>
            <div className={styles.passwordFieldContainer}>
              <input
                id="password"
                className={styles.formInput}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.eyeIconBtn}
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye open SVG
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  // Eye closed SVG
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-6.06"/>
                    <path d="M1 1l22 22"/>
                    <path d="M9.53 9.53A3 3 0 0 0 12 15a3 3 0 0 0 2.47-5.47"/>
                  </svg>
                )}
              </button>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>
            {formError && (
              <div style={{ color: "red", marginBottom: 12 }}>{formError}</div>
            )}
            <button type="submit" className={styles.signInBtn}>
              Sign in
            </button>
          </form>
          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.dividerText}>or</div>
            <div className={styles.dividerLine}></div>
          </div>
          <button className={styles.googleBtn} type="button">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
              style={{ width: 22, height: 22 }}
            />
            Sign in with Google
          </button>
          <div className={styles.createAccount}>
            Are you new?
            <Link to="/register">Create an Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;