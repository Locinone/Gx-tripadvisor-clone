import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AttractionCard from './AttractionCard.tsx';
import { Typography, Box, Chip } from '@mui/material';

interface AttractionDetailProps {
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

const AttractionDetail: React.FC = () => {
  const { location_id } = useParams<{ location_id: string }>();
  const [attraction, setAttraction] = useState<AttractionDetailProps | null>(null);

  useEffect(() => {
    fetch(`/api/attractions/${location_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched attraction:', data);
        setAttraction(data);
      })
      .catch((error) => console.error('Error fetching attraction:', error));
  }, [location_id]);

  if (!attraction) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
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
      <Typography variant="h6" gutterBottom>
        Additional Details:
      </Typography>
      <Typography variant="body2" gutterBottom>
        Contact Info: {attraction.contactInfo}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Geo Info: {attraction.geoInfo}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Opening Hours: {attraction.openingHours}
      </Typography>
      {attraction.cuisineType && <Typography variant="body2" gutterBottom>Cuisine Type: {attraction.cuisineType}</Typography>}
      {attraction.hotelStyle && <Typography variant="body2" gutterBottom>Hotel Style: {attraction.hotelStyle}</Typography>}
      {attraction.groups && (
        <Box display="flex" flexWrap="wrap" marginTop="1rem">
          {attraction.groups.map((group, index) => (
            <Chip key={index} label={group} style={{ margin: '0.2rem' }} />
          ))}
        </Box>
      )}
      <Typography variant="body2" gutterBottom>
        TripAdvisor Rating: {attraction.tripAdvisorRating}/10
      </Typography>
      <Box display="flex" flexWrap="wrap" marginTop="1rem">
        {attraction.awards.map((award, index) => (
          <Chip key={index} label={award} style={{ margin: '0.2rem' }} />
        ))}
      </Box>
      <Typography variant="body2" gutterBottom>
        Similar Suggestions: {attraction.similarSuggestions.join(', ')}
      </Typography>
    </Box>
  );
};

export default AttractionDetail;
