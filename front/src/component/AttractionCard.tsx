import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';

interface AttractionCardProps {
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

const AttractionCard: React.FC<AttractionCardProps> = ({
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
    <Card style={{ maxWidth: 345, margin: '1rem', padding: '0.5rem', borderRadius: '15px' }}>
      <CardMedia
        component="img"
        height="140"
        image={image_url}
        alt={name}
        style={{ borderRadius: '10px' }}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <Box display="flex" justifyContent="space-between" marginTop="1rem">
          <Typography variant="body2">
            {rating}/10 ({num_reviews} avis)
          </Typography>
          <Typography variant="body2">Price Level: {price_level}</Typography>
        </Box>
        <Typography variant="body2" gutterBottom>
          Category: {category}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Address: {address_string}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {street1}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {street2}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {city}, {state}, {country} {postalcode}
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
      </CardContent>
    </Card>
  );
};

export default AttractionCard;