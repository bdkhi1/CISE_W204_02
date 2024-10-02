import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Article, DefaultEmptyArticle } from "./Article";
import Link from "next/link";

const CreateArticleComponent = () => {
  const navigate = useRouter();
  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(article);
    fetch("http://localhost:8082/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    })
      .then((res) => {
        console.log(res);
        setArticle(DefaultEmptyArticle);
        navigate.push("/");
      })
      .catch((err) => {
        console.log("Error from CreateArticle: " + err);
      });
  };

  return (
    <div className="CreateArticle py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-12 text-center">
            <h1 className="display-4">Add Article</h1>
            <p className="lead">
              Submit a new article by filling in the details below.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 m-auto">
            <Link
              href="/"
              className="btn btn-outline-info btn-lg btn-block mb-4 fs-6"
            >
              Show Article List
            </Link>

            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Article"
                  name="title"
                  className="form-control"
                  value={article.title}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="ISBN"
                  name="isbn"
                  className="form-control"
                  value={article.claim}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className="form-control"
                  value={article.authors}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Describe this article"
                  name="description"
                  className="form-control"
                  value={article.evidence}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  placeholder="Published Date"
                  name="published_date"
                  className="form-control"
                  value={article.pubyear?.toString()}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Publisher of this Article"
                  name="publisher"
                  className="form-control"
                  value={article.source}
                  onChange={onChange}
                />
              </div>
              {/* Use a button for form submission */}
              <button
                type="submit"
                className="btn btn-outline-info btn-lg btn-block mb-4 fs-6"
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
