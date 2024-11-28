import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface FiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const Filters: React.FC<FiltersProps> = ({ setFilters }) => {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('');
  const [minReviews, setMinReviews] = useState('');
  const [minPhotos, setMinPhotos] = useState('');
  const [priceLevel, setPriceLevel] = useState('');

  const applyFilters = () => {
    setFilters({
      category,
      location,
      radius,
      minReviews,
      minPhotos,
      priceLevel,
    });
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Radius"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Minimum Reviews"
        value={minReviews}
        onChange={(e) => setMinReviews(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Minimum Photos"
        value={minPhotos}
        onChange={(e) => setMinPhotos(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price Level"
        value={priceLevel}
        onChange={(e) => setPriceLevel(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={applyFilters}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filters;
