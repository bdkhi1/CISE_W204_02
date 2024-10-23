import React, { useEffect } from "react";
import { Article } from "./Article";
import styles from "./ArticleModal.module.css";

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{article.title}</h2>
          <span className={styles.practice}>{article.practice}</span>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.infoGroup}>
            <label>Authors</label>
            <p>{article.authors}</p>
          </div>

          <div className={styles.infoGroup}>
            <label>Publication Year</label>
            <p>{new Date(article.pubyear).getFullYear()}</p>
          </div>

          <div className={styles.infoGroup}>
            <label>Source</label>
            <p>{article.source}</p>
          </div>

          <div className={styles.infoGroup}>
            <label>DOI</label>
            {article.doi ? (
              <p>
                <a
                  href={`https://doi.org/${article.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.doiLink} 
                >
                  {article.doi}
                </a>
              </p>
            ) : (
              <p>N/A</p>
            )}
          </div>

          <div className={styles.infoGroup}>
            <label>Claim</label>
            <p>{article.claim}</p>
          </div>

          <div className={styles.infoGroup}>
            <label>Evidence</label>
            <p>{article.evidence}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
