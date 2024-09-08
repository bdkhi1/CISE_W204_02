import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { Article } from './Article';

function ShowArticleList() {
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
        console.log('Error from ShowArticleList: ' + err);
      });
  }, []);

  const articleList =
    articles.length === 0
      ? 'there is no article record!'
      : articles.map((article, k) => <ArticleCard article={article} key={k} />);

  return (
    <div className='ShowArticleList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Article List</h2>
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
