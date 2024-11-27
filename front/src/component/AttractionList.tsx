import React, { useEffect, useState } from 'react';
import AttractionCard from './AttractionCard.tsx';
import Grid from '@mui/material/Grid';

interface Attraction {
  id: number;
  name: string;
  description: string;
  image_url: string;
  rating: number;
  reviews_count: number;
  price: number;
}

const AttractionList: React.FC = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);

  useEffect(() => {
    fetch('/api/attractions/')
      .then((response) => response.json())
      .then((data) => setAttractions(data))
      .catch((error) => console.error('Error fetching attractions:', error));
  }, []);

  return (
    <Grid container spacing={2}>
      {attractions.map((attraction) => (
        <Grid item xs={12} sm={6} md={4} key={attraction.id}>
          <AttractionCard
            name={attraction.name}
            description={attraction.description}
            imageUrl={attraction.image_url}
            rating={attraction.rating}
            reviewsCount={attraction.reviews_count}
            price={attraction.price.toString()}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AttractionList;



