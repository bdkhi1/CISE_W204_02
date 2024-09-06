import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Article, DefaultEmptyArticle } from "./Article";

const CreateArticleComponent = () => {
  const navigate = useRouter();
  
  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setArticle(prevArticle => ({
      ...prevArticle,
      [name]: value
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(article);

    try {
      const response = await fetch("http://localhost:8082/api/articles", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(article)
      });

      console.log(response);

      if (response.ok) {
        setArticle(DefaultEmptyArticle);
        navigate.push("/");
      } else {
        const errorText = await response.text(); // Capture error details from response
        console.error("Failed to create article:", errorText);
        throw new Error("Failed to create article");
      }
    } catch (err) {
      console.error('Error from CreateArticleComponent:', err);
    }
  };

  return (
    <div className="CreateArticle">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link href="/" className="btn btn-outline-warning float-left">
              Show Article List
            </Link>
          </div>
          <div className="col-md-10 m-auto">
            <h1 className="display-4 text-center">Add Article</h1>
            <p className="lead text-center">Create a new article</p>
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Article"
                  name="title"
                  className="form-control"
                  value={article.title || ''}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Authors"
                  name="authors"
                  className="form-control"
                  value={article.authors || ''}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Source"
                  name="source"
                  className="form-control"
                  value={article.source || ''}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Publication Year"
                  name="pubyear"
                  className="form-control"
                  value={article.pubyear || ''}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="DOI"
                  name="doi"
                  className="form-control"
                  value={article.doi || ''}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Claim"
                  name="claim"
                  className="form-control"
                  value={article.claim || ''}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Evidence"
                  name="evidence"
                  className="form-control"
                  value={article.evidence || ''}
                  onChange={onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-warning btn-block mt-4 mb-4 w-100"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticleComponent;
