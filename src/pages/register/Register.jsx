import React, { useState } from "react";
import { Link } from "react-router-dom";
import PasswordStrengthBar from "./PasswordStrengthBar";
import styles from "./Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [team, setTeam] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !role || (role === "Developer" && !team) || !termsAccepted) {
      setFormError("Please fill all required fields and accept the terms.");
      return;
    }
    setFormError("");
    // Submit logic here
    alert("Registration submitted!");
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.formTitle}>Register</h2>
      <form onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          Username
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel}>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className={styles.formInput}
          />
        </label>
        <PasswordStrengthBar password={password} />
        <label className={styles.formLabel}>
          Role
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            required
            className={styles.formSelect}
          >
            <option value="">Select role</option>
            <option value="PM">Project Manager</option>
            <option value="Developer">Developer</option>
          </select>
        </label>
        {role === "Developer" && (
          <label className={styles.formLabel}>
            Team
            <select
              value={team}
              onChange={e => setTeam(e.target.value)}
              required
              className={styles.formSelect}
            >
              <option value="">Select team</option>
              <option value="FE">Frontend</option>
              <option value="BE">Backend</option>
              <option value="QA">QA</option>
            </select>
          </label>
        )}
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={e => setTermsAccepted(e.target.checked)}
            style={{ marginRight: 8 }}
          />
          I accept the terms and conditions
        </label>
        {formError && <div className={styles.errorMsg}>{formError}</div>}
        <button type="submit" className={styles.submitBtn}>
          Register
        </button>
      </form>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <span>Already have an account? </span>
          <Link to="/login" className={styles.formLink}>
            Login
          </Link>
        </div>
      </div>
  );
};

export default Register;