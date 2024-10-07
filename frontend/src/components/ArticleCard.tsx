import React from 'react';
import { Article } from './Article';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface IProp {
  article?: Article;
}

const ArticleCard = ({ article }: IProp) => {
  const router = useRouter();
  if (article == undefined) {
    return null;
  }
  const onClick = () => {
    router.push(`/show-article/${article._id}`)
  };
  return (
    <div className='card-container' onClick={onClick}>
      <Image
        src="/images/articleImage.png"
        alt='Articles'
        width={400} 
        height={400} 
      />
      <div className='desc'>
        <h2>
          <b>{article.title}</b>
        </h2>
        <h3>{article.authors}</h3>
        <p>{article.claim}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
