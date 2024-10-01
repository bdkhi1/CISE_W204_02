import React, { useState, useEffect } from "react";
import Link from "next/link";
import ArticleCard from "./ArticleCard";
import SearchBar from "./SearchBar";
import { Article } from "./Article";

function ShowArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("http://localhost:8082/api/articles")
      .then((res) => {
        return res.json();
      })
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
          article?.description?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  };

  const articleList =
    filteredArticles.length === 0
      ? "there is no article record!"
      : filteredArticles.map((article, k) => (
          <ArticleCard article={article} key={k} />
        ));

  return (
    <div className="ShowArticleList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Article List</h2>
            <p className="lead text-center">View all articles</p>
          </div>

          <div className="col-md-12 d-flex justify-content-between align-items-center">
            <SearchBar onSearch={handleSearch} />
            <Link
              href="/create-article"
              className="btn btn-outline-warning float-right"
            >
              + Add New Article
            </Link>
          </div>
        </div>
        <div className="col-md-12">
          <br />
        </div>
        <div className="list">{articleList}</div>
      </div>
    </div>
  );
}

export default ShowArticleList;
