import React, { useState } from "react";
import Stylecre from "./Stylecre.css"
function Creation() { 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cin, setCin] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !cin) {
      setError("Please enter username, CIN, and password");
      return;
    }

    setError(""); 
    alert("Account created successfully!");
  };

  return (
    <div className="account-creation-container">
      <h2>Création de Compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cin">CIN</label>
          <input
            type="text"
            id="cin"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Créer le compte</button>
      </form>
    </div>
  );
}

export default Creation;
