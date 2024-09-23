import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@/components/Article';
import ArticleCard from '@/components/ArticleCard';

function ShowAdminArticles() {
  const [articles, setArticles] = useState<[Article?]>([]);

  useEffect(() => {
    fetch('http://localhost:8082/api/articles')
      .then((res) => {
        return res.json();
      })
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.log('Error from ShowAdminArticles: ' + err);
      });
  }, []);

  const articleList =
    articles.length === 0
      ? 'there is no article record!'
      : articles.map((article, k) => <ArticleCard article={article} key={k} />);

  return (
    <div className='ShowAdminArticles'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Change Articles</h2>
          </div>
        </div>

        <div className='list'>{articleList}</div>
      </div>
    </div>
  );
}

export default ShowAdminArticles;
