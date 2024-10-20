import React, { useState } from "react";
import styles from "./ArticleFilter.module.scss";

const practicesWithClaims = {
  "Agile Development": [
    "Agile Practices Enhance Software Quality",
    "Claim A",
    "Claim B",
  ],
  "Continuous Integration": ["Claim X", "Claim Y"],
  "Test-Driven Development": [
    "Improves Software Maintainability",
    "Code Quality Improvement",
    "Claim Z",
  ],
  "Code Review": ["Claim P", "Claim Q", "Claim R"],
  "Pair Programming": [
    "Enhances Code Quality and Reduces Defects",
    "Claim L",
    "Claim M",
  ],
};

const ArticleFilter = ({ onFilterChange }) => {
  const [selectedPractice, setSelectedPractice] = useState("");
  const [selectedClaim, setSelectedClaim] = useState("");

  const handlePracticeChange = (newPractice) => {
    setSelectedPractice(newPractice);
    setSelectedClaim("");
    onFilterChange(newPractice, "");
  };

  const handleClaimChange = (newClaim) => {
    setSelectedClaim(newClaim);
    onFilterChange(selectedPractice, newClaim);
  };

  const availableClaims = practicesWithClaims[selectedPractice] || [];

  return (
    <div className={styles.articleFilter}>
      <select
        value={selectedPractice}
        onChange={(e) => handlePracticeChange(e.target.value)}
        className={styles.formSelect}
      >
        <option value="">Select a Practice</option>
        {Object.keys(practicesWithClaims).map((practice) => (
          <option key={practice} value={practice}>
            {practice}
          </option>
        ))}
      </select>

      {selectedPractice && (
        <select
          value={selectedClaim}
          onChange={(e) => handleClaimChange(e.target.value)}
          className={`${styles.formSelect} ${styles.marginTop}`}
        >
          <option value="">Select a Claim</option>
          {availableClaims.map((claim) => (
            <option key={claim} value={claim}>
              {claim}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default ArticleFilter;
