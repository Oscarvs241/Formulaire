// src/Formulaire.jsx
import React, { useState } from "react";
import { db } from "./firebase/config";
import { collection, addDoc } from "firebase/firestore";
import "./index.css";

function Formulaire() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    mail: "",
    motDePasse: "",
    sexe: ""
  });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "utilisateurs"), formData);
      setSubmitted(true);
      setFormData({ nom: "", prenom: "", mail: "", motDePasse: "", sexe: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert("Échec de l'enregistrement !");
    } finally {
      setLoading(false);
    }
  };

  const champs = [
    { name: "nom", label: "Nom", type: "text", icon: "👤" },
    { name: "prenom", label: "Prénom", type: "text", icon: "✨" },
    { name: "mail", label: "Adresse e-mail", type: "email", icon: "📧" },
    { name: "motDePasse", label: "Mot de passe", type: "password", icon: "🔒" },
  ];

  return (
    <>
      {/* Background animé */}
      <div className="bg">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <div className="bg-orb orb-3" />
        <div className="bg-orb orb-4" />
      </div>

      <div className="form-wrapper">
        {/* Toast de succès */}
        {submitted && (
          <div className="toast">
            <div className="toast-content">
              <span className="toast-icon">🎉</span>
              <span className="toast-text">Utilisateur enregistré avec succès !</span>
            </div>
          </div>
        )}

        <form className="form-card" onSubmit={handleSubmit}>
          {/* Header */}
          <div className="form-header">
            <div className="form-header-icon">🚀</div>
            <h1 className="form-title">Créer un compte</h1>
            <p className="form-subtitle">Rejoignez-nous dès maintenant</p>
          </div>

          {/* Champs du formulaire */}
          <div className="form-fields">
            {champs.map((champ, i) => (
              <div
                key={champ.name}
                className="field"
                style={{ "--delay": `${i * 0.12}s` }}
              >
                <div className="field-border" />
                <div className={`field-inner ${focused === champ.name ? "focused" : ""}`}>
                  <span className="field-icon">{champ.icon}</span>
                  <input
                    className="field-input"
                    name={champ.name}
                    type={champ.type}
                    value={formData[champ.name]}
                    onChange={handleChange}
                    onFocus={() => setFocused(champ.name)}
                    onBlur={() => setFocused(null)}
                    required
                    autoComplete="off"
                    placeholder=" "
                  />
                  <label className="field-label">{champ.label}</label>
                  <div className="field-glow" />
                </div>
              </div>
            ))}

            {/* Champ Sexe avec select stylisé */}
            <div
              className="field"
              style={{ "--delay": `${4 * 0.12}s` }}
            >
              <div className="field-border" />
              <div className={`field-inner ${focused === "sexe" ? "focused" : ""}`}>
                <span className="field-icon">⚧</span>
                <select
                  className="field-select"
                  name="sexe"
                  value={formData.sexe}
                  onChange={handleChange}
                  onFocus={() => setFocused("sexe")}
                  onBlur={() => setFocused(null)}
                  required
                >
                  <option value="" disabled>-- Choisir --</option>
                  <option value="Homme">♂️ Homme</option>
                  <option value="Femme">♀️ Femme</option>
                
                </select>
                <label className={`field-label ${formData.sexe ? "filled" : ""}`}>
                  Sexe
                </label>
                <div className="field-glow" />
              </div>
            </div>
          </div>

          {/* Bouton de soumission */}
          <button 
            type="submit" 
            className={`btn-submit ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            <span className="btn-text">
              {loading ? "Enregistrement..." : "S'inscrire"}
            </span>
            <span className="btn-icon">{loading ? "⏳" : "→"}</span>
            <div className="btn-shimmer" />
          </button>

          {/* Footer */}
          <p className="form-footer">
            Déjà membre ?{" "}
            <a href="#" className="form-link">
              Se connecter
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Formulaire;
