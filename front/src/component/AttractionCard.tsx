import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import { Attraction } from '../interfaces/Attraction';
const AttractionCard: React.FC<Attraction> = ({
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
      </CardContent>
    </Card>
  );
};

export default AttractionCard;
