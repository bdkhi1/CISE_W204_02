'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Article, DefaultEmptyArticle } from './Article'; // Update import
import Link from 'next/link';

function UpdateArticleInfo() {
  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
  const { id } = useParams<{ id: string }>(); // Extract id from useParams
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8082/api/articles/${id}`) // Update API endpoint
      .then((res) => res.json())
      .then((json) => setArticle(json))
      .catch((err) => console.log('Error from UpdateArticleInfo: ' + err));
  }, [id]);

  const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const textAreaOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch(`http://localhost:8082/api/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article),
    })
      .then(() => router.push(`/show-article/${id}`))
      .catch((err) => console.log('Error from UpdateArticleInfo: ' + err));
  };

  return (
    <div className='UpdateArticleInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link href='/' className='btn btn-outline-warning float-left'>
              Show Article List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Article</h1>
            <p className='lead text-center'>Update Article&apos;s Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                placeholder='Title of the Article'
                name='title'
                className='form-control'
                value={article.title}
                onChange={inputOnChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='authors'>Authors</label>
              <input
                type='text'
                placeholder='Authors'
                name='authors'
                className='form-control'
                value={article.authors}
                onChange={inputOnChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='source'>Source</label>
              <input
                type='text'
                placeholder='Source'
                name='source'
                className='form-control'
                value={article.source}
                onChange={inputOnChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='pubyear'>Publication Year</label>
              <input
                type='text'
                placeholder='Publication Year'
                name='pubyear'
                className='form-control'
                value={article.pubyear}
                onChange={inputOnChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='doi'>DOI</label>
              <input
                type='text'
                placeholder='DOI'
                name='doi'
                className='form-control'
                value={article.doi}
                onChange={inputOnChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='claim'>Claim</label>
              <textarea
                placeholder='Claim'
                name='claim'
                className='form-control'
                value={article.claim}
                onChange={textAreaOnChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='evidence'>Evidence</label>
              <textarea
                placeholder='Evidence'
                name='evidence'
                className='form-control'
                value={article.evidence}
                onChange={textAreaOnChange}
              />
            </div>
            <br />

            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Article
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateArticleInfo;
