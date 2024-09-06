import React from 'react';
import { Article } from './Article'; // Make sure this imports the correct type
import { useRouter } from 'next/navigation';

interface IProp {
  article?: Article; // Update the prop type to Article
}

const ArticleCard = ({ article }: IProp) => {
  const router = useRouter();

  if (article == undefined) {
    return null;
  }

  const onClick = () => {
    router.push(`/show-article/${article._id}`); // Adjust the route for articles
  };

  return (
    <div className='card-container' onClick={onClick}>
      <img
        src='https://images.unsplash.com/photo-1506748686214e9df14d2d6a0a59' // You might want to use a different image or add logic to handle article images
        alt='Article'
        height={200}
      />
      <div className='desc'>
        <h2>{article.title}</h2> {/* Display the article title */}
        <h3>{article.authors}</h3> {/* Display the authors */}
        <p>{article.claim}</p> {/* Display a relevant field from the article */}
      </div>
    </div>
  );
};

export default ArticleCard;
