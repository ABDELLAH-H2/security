import React, { useState } from "react";
import "./Stylecre.css";
import "./Style.css";
import { usePersonneStore } from "../store/Personne";

function Creation() {
  const [formData, setFormData] = useState({
    name: "",
    prenom: "",
    cin: "",
    password: ""
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handform = (e) => {
    e.preventDefault();
  };

  const { createPersonne } = usePersonneStore();

  const handcreatePersonne = async () => {
    const { success, message } = await createPersonne(formData);
    
    const alertBox = document.getElementById("alert-box");
    if (success) {
      alertBox.textContent = "Person added successfully!";
      alertBox.style.backgroundColor = "#4CAF50";
    } else {
      alertBox.textContent = `Failed to add person: ${message}`;
      alertBox.style.backgroundColor = "#FF5733";
      setErrorMessage(message);
    }
    alertBox.style.display = "block";

    setTimeout(() => {
      alertBox.style.display = "none";
    }, 3000);
  };

  return (
    <div className="account-creation-container">
      <h2>Création de Compte</h2>
      <form onSubmit={handform}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cin">CIN</label>
          <input
            type="text"
            id="cin"
            value={formData.cin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
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
        <button type="submit" className="submit-btn" onClick={handcreatePersonne}>
          Créer le compte
        </button>
      </form>
      <div id="alert-box" className="alert-box"></div>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}

export default Creation;
