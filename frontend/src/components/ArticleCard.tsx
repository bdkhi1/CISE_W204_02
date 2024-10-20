import React from 'react';
import Image from 'next/image';
import { Article } from './Article';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageContainer}>
        <Image
          src={'/images/articleImage.png'} 
          alt={article.title}
          width={300}
          height={200}
          className={styles.image}
        />
        <div className={styles.practiceTag}>{article.practice}</div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.authors}>
          <span className={styles.label}>Authors:</span> {article.authors}
        </p>
        <div className={styles.metadata}>
          <span className={styles.year}>
            <span className={styles.label}>Year:</span> {new Date(article.pubyear).getFullYear()}
          </span>
          <span className={styles.separator}>•</span>
          <span className={styles.source}>
            <span className={styles.label}>Source:</span> {article.source}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;