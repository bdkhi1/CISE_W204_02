'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, DefaultEmptyArticle } from './Article'; // Update import
import Link from 'next/link';

function ShowArticleDetails() {
  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);

  const { id } = useParams<{ id: string }>(); // Extract id from useParams
  const navigate = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8082/api/articles/${id}`) // Update API endpoint
      .then((res) => res.json())
      .then((json) => setArticle(json))
      .catch((err) => console.log('Error from ShowArticleDetails: ' + err));
  }, [id]);

  const onDeleteClick = (id: string) => {
    fetch(`http://localhost:8082/api/articles/${id}`, { method: 'DELETE' }) // Update API endpoint
      .then(() => navigate.push('/'))
      .catch((err) => console.log('Error from ShowArticleDetails_deleteClick: ' + err));
  };

  const ArticleItem = (
    <div>
      <table className='table table-hover table-dark table-striped table-bordered'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Title</td>
            <td>{article.title}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Authors</td>
            <td>{article.authors}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>Source</td>
            <td>{article.source}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Publication Year</td>
            <td>{article.pubyear}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>DOI</td>
            <td>{article.doi}</td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td>Claim</td>
            <td>{article.claim}</td>
          </tr>
          <tr>
            <th scope='row'>7</th>
            <td>Evidence</td>
            <td>{article.evidence}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowArticleDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link href='/' className='btn btn-outline-warning float-left'>
              Show Article List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Article&apos;s Record</h1>
            <p className='lead text-center'>View Article&apos;s Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{ArticleItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => onDeleteClick(article._id || "")}
            >
              Delete Article
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              href={`/edit-article/${article._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit Article
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowArticleDetails;
