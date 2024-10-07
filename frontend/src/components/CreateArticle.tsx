import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< Updated upstream
import Link from "next/link";
import { Article, DefaultEmptyArticle } from "./Article";
=======
import { Article, DefaultEmptyArticle } from "./Article";
import './CreateArticle.module.scss';
import Link from "next/link";
import PopulatedNavBar from "./PopulatedNavBar";
import './CreateArticle.module.scss';
>>>>>>> Stashed changes

const CreateArticleComponent = () => {
  const navigate = useRouter();

  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
  const [authors, setAuthors] = useState<string[]>([]);
  
  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setArticle({ ...article, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
<<<<<<< Updated upstream
    event.preventDefault()
    console.log(article);
    fetch("http://localhost:8082/api/articles", {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(article)})
=======
    event.preventDefault();

    // Prepare the article object
    const articleToSubmit = {
      ...article,
      authors: authors.join(', '), // Join authors into a string
      pubyear: new Date(article.pubyear), // Convert pubyear to Date
      updated_date: new Date(), // Set updated_date to current date
    };

    console.log("Submitting article:", articleToSubmit); // Log the article object
    fetch("http://localhost:8082/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(articleToSubmit),
    })
>>>>>>> Stashed changes
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`); // Handle HTTP errors
        }
        return res.json();
      })
      .then((data) => {
        console.log(data); // Log the response from the server
        setArticle(DefaultEmptyArticle);
<<<<<<< Updated upstream
        // Push to /
=======
        setAuthors([]); // Clear authors on submit
>>>>>>> Stashed changes
        navigate.push("/");
      })
      .catch((err) => {
        console.log('Error from CreateArticle: ' + err);
      });
  };

  const claims = [
    "Agile methodologies enhance team collaboration.",
    "Code reviews improve code quality.",
    "Test-driven development reduces bugs.",
    "Continuous integration leads to faster delivery.",
    "Pair programming increases productivity.",
  ];

  const addAuthor = () => {
    setAuthors([...authors, ""]); 
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index)); // Remove the author at the given index
  };

  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => (index === i ? value : oldValue))
    );
  };

  return (
<<<<<<< Updated upstream
    <div className="CreateArticle">
=======
    <div>
      <PopulatedNavBar />
    
    <div className="CreateArticle py-5">
      
>>>>>>> Stashed changes
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
            <p className="lead text-center">Create new article</p>
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
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="ISBN"
                  name="isbn"
                  className="form-control"
                  value={article.isbn}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className="form-control"
                  value={article.author}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Describe this article"
                  name="description"
                  className="form-control"
                  value={article.description}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="date"
                  placeholder="published_date"
                  name="published_date"
                  className="form-control"
                  value={article.published_date?.toString()}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Publisher of this Article"
                  name="publisher"
                  className="form-control"
                  value={article.publisher}
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
