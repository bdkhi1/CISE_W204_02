import React, { useState, useEffect } from "react";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import SearchBar from "./SearchBar";
import ArticleModal from "./ArticleModal";
import { Article } from "./Article";
import styles from "./ShowArticleList.module.css";

function ShowArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8082/api/articles")
      .then((res) => res.json())
      .then((articles) => {
        setArticles(articles);
        setFilteredArticles(articles);
      })
      .catch((err) => {
        console.log("Error from ShowArticleList: " + err);
      });
  }, []);

  const handleSearch = (query: string) => {
    if (query === "") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) =>
          article.title?.toLowerCase().includes(query.toLowerCase()) ||
          article?.practice?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.showArticleList}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Article List</h2>
          <p className={styles.subtitle}>View all articles</p>
        </div>

        <div className={styles.controls}>
          <SearchBar onSearch={handleSearch} />
          <Link
            href="./create-article"
            className={styles.addButton}
          >
            + Add New Article
          </Link>
        </div>

        <div className={styles.list}>
          {filteredArticles.length === 0 ? (
            <div className={styles.noArticles}>No articles found</div>
          ) : (
            filteredArticles.map((article, k) => (
              <ArticleCard 
                article={article} 
                key={k} 
                onClick={() => handleArticleClick(article)}
              />
            ))
          )}
        </div>
      </div>

      {isModalOpen && selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ShowArticleList;