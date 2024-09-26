import { useState, useEffect } from 'react';

const useFetchArticles = () => {
  const [articles, setArticles] = useState([]);

  // Fetch articles from the backend
  useEffect(() => {
    fetch('http://localhost:8082/api/articles') // Use full URL if API is hosted on a different domain
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  return articles; // Return the fetched articles data
};

export default useFetchArticles;
