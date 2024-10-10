import { useState, useEffect } from 'react';

const useFetchArticles = () => {
  const [articles, setArticles] = useState([]);

  // Fetch articles from the backend
  useEffect(() => {
    fetch('http://localhost:8082/api/administration') // Use the full URL to the all data call to display all
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  return articles;
};

export default useFetchArticles;
