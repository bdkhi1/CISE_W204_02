"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Article, DefaultEmptyArticle } from "./Article";
import Link from "next/link";

function ShowArticleDetails() {
  const [article, setArticle] = useState<Article>(DefaultEmptyArticle);
  const [loading, setLoading] = useState(true); // Loading state
  const { id } = useParams<{ id: string }>();
  const navigate = useRouter();

  useEffect(() => {
    if (id) {
        setLoading(true); // Set loading to true before fetching
        fetch(`http://localhost:8082/api/analyst/${id}`) // Ensure the endpoint is correct
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((json) => {
                setArticle(json); // Update the state with the new article data
                setLoading(false); // Set loading to false after fetching
            })
            .catch((err) => {
                console.log("Error from ShowArticleDetails: " + err);
                setLoading(false); // Set loading to false on error
            });
    }
}, [id]);


  const onDeleteClick = (id: string) => {
    fetch(`http://localhost:8082/api/analyst/${id}`, { method: "DELETE" })
      .then(() => navigate.push("/"))
      .catch((err) =>
        console.log("Error from ShowArticleDetails_deleteClick: " + err)
      );
  };

  if (loading) {
    return <div className="loading">Loading article details...</div>; // Loading indicator
  }

  return (
    <div className="ShowArticleDetails">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <Link
              href="/"
              className="btn btn-outline-info btn-lg btn-block mb-4 fs-6"
            >
              Show Article List
            </Link>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="display-4">Article&apos;s Record</h1>
            <p className="lead">View Article&apos;s Info</p>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-md-10 m-auto">
            <div>
              <table className="table table-hover table-dark table-striped table-bordered">
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Title</td>
                    <td>{article.title || "N/A"}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Author</td>
                    <td>{article.authors || "N/A"}</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Claim</td>
                    <td>{article.claim || "N/A"}</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>Published Year</td>
                    <td>{article.pubyear ? article.pubyear.toString() : "N/A"}</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>Evidence</td>
                    <td>{article.evidence || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <button
              type="button"
              className="btn btn-outline-info btn-lg btn-block mb-4 fs-6"
              onClick={() => onDeleteClick(article._id || "")}
            >
              Delete Article
            </button>
          </div>
          <div className="col-md-5 text-right">
            <Link
              href={`/edit-article/${article._id}`}
              className="btn btn-outline-info btn-lg btn-block mb-4 fs-6"
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
