import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const AttractionCard = ({
  name,
  description,
  imageUrl,
  rating,
  reviewsCount,
  price
}) => {
  return (
    <Card style={{ maxWidth: 345, margin: '1rem', padding: '0.5rem', borderRadius: '15px' }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
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
            {rating}/10 ({reviewsCount} avis)
          </Typography>
          <Typography variant="body2">{price}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

AttractionCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviewsCount: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
};

export default AttractionCard;

