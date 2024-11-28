import React from 'react';
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

const AttractionDetail: React.FC<AttractionDetailProps> = ({
  location_id,
  name,
  description,
  category,
  street1,
  street2,
  city,
  state,
  country,
  postalcode,
  address_string,
  price_level,
  num_reviews,
  rating,
  image_url,
  contactInfo,
  geoInfo,
  openingHours,
  cuisineType,
  hotelStyle,
  groups,
  tripAdvisorRating,
  awards,
  similarSuggestions
}) => {
  return (
    <Box>
      <AttractionCard
        location_id={location_id}
        name={name}
        description={description}
        category={category}
        street1={street1}
        street2={street2}
        city={city}
        state={state}
        country={country}
        postalcode={postalcode}
        address_string={address_string}
        price_level={price_level}
        num_reviews={num_reviews}
        rating={rating}
        image_url={image_url}
        contactInfo={contactInfo}
        geoInfo={geoInfo}
        openingHours={openingHours}
        cuisineType={cuisineType}
        hotelStyle={hotelStyle}
        groups={groups}
        tripAdvisorRating={tripAdvisorRating}
        awards={awards}
        similarSuggestions={similarSuggestions}
      />
      <Typography variant="h6" gutterBottom>
        Additional Details:
      </Typography>
      <Typography variant="body2" gutterBottom>
        Contact Info: {contactInfo}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Geo Info: {geoInfo}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Opening Hours: {openingHours}
      </Typography>
      {cuisineType && <Typography variant="body2" gutterBottom>Cuisine Type: {cuisineType}</Typography>}
      {hotelStyle && <Typography variant="body2" gutterBottom>Hotel Style: {hotelStyle}</Typography>}
      {groups && (
        <Box display="flex" flexWrap="wrap" marginTop="1rem">
          {groups.map((group, index) => (
            <Chip key={index} label={group} style={{ margin: '0.2rem' }} />
          ))}
        </Box>
      )}
      <Typography variant="body2" gutterBottom>
        TripAdvisor Rating: {tripAdvisorRating}/10
      </Typography>
      <Box display="flex" flexWrap="wrap" marginTop="1rem">
        {awards.map((award, index) => (
          <Chip key={index} label={award} style={{ margin: '0.2rem' }} />
        ))}
      </Box>
      <Typography variant="body2" gutterBottom>
        Similar Suggestions: {similarSuggestions.join(', ')}
      </Typography>
    </Box>
  );
};

export default AttractionDetail;