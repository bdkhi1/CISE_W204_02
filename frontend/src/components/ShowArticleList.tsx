import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ArticleCard from './ArticleCard'; // Ensure this component exists
import { Article } from './Article'; // Ensure this type matches your data

function ShowArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('http://localhost:8082/api/articles')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          setArticles([]); // Handle unexpected data format
        }
      })
      .catch((err) => {
        console.error('Error from ShowArticleList:', err);
        setArticles([]); // Optionally handle the error
      });
  }, []);

  const articleList =
    articles.length === 0
      ? 'There are no articles available!'
      : articles.map((article, index) => <ArticleCard article={article} key={index} />);

  return (
    <div className='ShowArticleList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Articles List</h2>
          </div>

          <div className='col-md-11'>
            <Link
              href='/create-article'
              className='btn btn-outline-warning float-right'
            >
              + Add New Article
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className='list'>{articleList}</div>
      </div>
    </div>
  );
}

export default ShowArticleList;
