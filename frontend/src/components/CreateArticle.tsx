import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Article, DefaultEmptyArticle } from "./Article";
import Link from "next/link";
import PopulatedNavBar from "./PopulatedNavBar";

const CreateArticleComponent = () => {
  const navigate = useRouter();

  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
  const [authors, setAuthors] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Common Software Engineering practices
  const practices = [
    "Agile Development",
    "Continuous Integration",
    "Test-Driven Development",
    "Code Review",
  ];

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const handlePracticeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setArticle({ ...article, practice: event.target.value });
  };

  const validateForm = () => {
    if (!article.title || authors.length === 0 || !article.pubyear || !article.source || !article.practice) {
      return "Please fill in all required fields.";
    }
    return null;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    setErrorMessage(null);

    const articleToSubmit = {
      ...article,
      authors: authors.join(', '),
      pubyear: new Date(article.pubyear).toISOString(), // Using ISO format for consistency
      updated_date: new Date().toISOString(),
    };

    console.log("Submitting article:", articleToSubmit);
    fetch("http://localhost:8082/api/analyst", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(articleToSubmit),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setArticle(DefaultEmptyArticle);
        setAuthors([]);
        navigate.push("/");
      })
      .catch((err) => {
        console.error('Error from CreateArticle: ', err);
        setErrorMessage("An error occurred while submitting the article. Please try again.");
      });
  };

  const addAuthor = () => {
    setAuthors([...authors, ""]);
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => (index === i ? value : oldValue))
    );
  };

  return (
    <div>
      <PopulatedNavBar />
      <div className="CreateArticle py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link href="/" className="btn btn-outline-warning float-left mb-3">
                Show Article List
              </Link>
            </div>
            <div className="col-md-10 m-auto">
              <h1 className="display-4 text-center title">Add Article</h1>
              <p className="lead text-center description">Create a new article</p>

              {/* Error message display */}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <form noValidate onSubmit={onSubmit} className="form-container">

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Title of the Article"
                    name="title"
                    className="form-control"
                    value={article.title}
                    onChange={onChange}
                    required
                  />
                </div>

                {authors.map((author, index) => (
                  <div key={`author-${index}`} className="form-group d-flex align-items-center mb-3">
                    <input
                      type="text"
                      placeholder="Author Name"
                      value={author}
                      onChange={(event) => changeAuthor(index, event.target.value)}
                      className="form-control"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => removeAuthor(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-outline-info mb-3"
                  onClick={addAuthor}
                >
                  Add Author
                </button>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="DOI"
                    name="doi"
                    className="form-control"
                    value={article.doi}
                    onChange={onChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="date"
                    placeholder="Published Date"
                    name="pubyear"
                    className="form-control"
                    value={article.pubyear ? article.pubyear.toString().split('T')[0] : ''}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Publisher of this Article"
                    name="source"
                    className="form-control"
                    value={article.source}
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="practice">Select Software Engineering Practice</label>
                  <select
                    name="practice"
                    className="form-control"
                    value={article.practice}
                    onChange={handlePracticeChange}
                    required
                  >
                    <option value="">Select a practice</option>
                    {practices.map((practice, index) => (
                      <option key={index} value={practice}>
                        {practice}
                      </option>
                    ))}
                  </select>
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
    </div>
  );
};

export default CreateArticleComponent;
