import React, { useEffect, useState } from 'react';
import AttractionCard from './AttractionCard.tsx';
import Grid from '@mui/material/Grid';

interface Attraction {
  location_id: string;
  name: string;
  description: string;
  category: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  postalcode: string;
  address_string: string;
  price_level: number | null;
  num_reviews: number | null;
  rating: number | null;
  image_url: string;
  contactInfo: string;
  geoInfo: string;
  openingHours: string;
  cuisineType?: string;
  hotelStyle?: string;
  groups?: string[];
  tripAdvisorRating: number;
  awards: string[];
  similarSuggestions: string[];
}

const AttractionList: React.FC = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);

  useEffect(() => {
    fetch('/api/attractions/')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched attractions:', data);
        setAttractions(data);
      })
      .catch((error) => console.error('Error fetching attractions:', error));
  }, []);

  return (
    <Grid container spacing={2}>
      {attractions.map((attraction) => (
        <Grid item xs={12} sm={6} md={4} key={attraction.location_id}>
          <AttractionCard
            location_id={attraction.location_id}
            name={attraction.name}
            description={attraction.description}
            category={attraction.category}
            street1={attraction.street1}
            street2={attraction.street2}
            city={attraction.city}
            state={attraction.state}
            country={attraction.country}
            postalcode={attraction.postalcode}
            address_string={attraction.address_string}
            price_level={attraction.price_level}
            num_reviews={attraction.num_reviews}
            rating={attraction.rating}
            image_url={attraction.image_url}
            contactInfo={attraction.contactInfo}
            geoInfo={attraction.geoInfo}
            openingHours={attraction.openingHours}
            cuisineType={attraction.cuisineType}
            hotelStyle={attraction.hotelStyle}
            groups={attraction.groups}
            tripAdvisorRating={attraction.tripAdvisorRating}
            awards={attraction.awards}
            similarSuggestions={attraction.similarSuggestions}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AttractionList;