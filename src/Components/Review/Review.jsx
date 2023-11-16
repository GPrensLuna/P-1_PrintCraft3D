import React, { useState, useEffect } from 'react';
import { URL } from '../../config';

const Reviews = ({ productId }) => {

 const [reviews, setReviews] = useState([]);
 const [averageScore, setAverageScore] = useState(0);

 useEffect(() => {
    fetch(`${URL}Reviews/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
        setAverageScore(data.averageScore);
      })
      .catch((error) => console.error('Error:', error));
 }, [productId]);

 return (
    <div>
      <h2>Puntuación: {averageScore}</h2>
      <h3>Comentarios:</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>{review}</li>
        ))}
      </ul>
    </div>
 );
};

export default Reviews;