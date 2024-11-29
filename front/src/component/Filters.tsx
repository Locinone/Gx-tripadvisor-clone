import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

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
  const [minRating, setMinRating] = useState('');
  const [maxRating, setMaxRating] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [openPeriod, setOpenPeriod] = useState('');
  const [profileType, setProfileType] = useState('');

  const applyFilters = () => {
    setFilters({
      category,
      location,
      radius,
      minReviews,
      minPhotos,
      priceLevel,
      minRating,
      maxRating,
      city,
      country,
      openPeriod,
      profileType,
    });
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      {/* Category */}
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Location */}
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Radius */}
      <TextField
        label="Radius"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Minimum Reviews */}
      <TextField
        label="Minimum Reviews"
        value={minReviews}
        onChange={(e) => setMinReviews(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Minimum Photos */}
      <TextField
        label="Minimum Photos"
        value={minPhotos}
        onChange={(e) => setMinPhotos(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Price Level */}
      <TextField
        label="Price Level"
        value={priceLevel}
        onChange={(e) => setPriceLevel(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Minimum Rating */}
      <TextField
        label="Minimum Rating"
        value={minRating}
        onChange={(e) => setMinRating(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Maximum Rating */}
      <TextField
        label="Maximum Rating"
        value={maxRating}
        onChange={(e) => setMaxRating(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* City */}
      <TextField
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Country */}
      <TextField
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Open Period */}
      <TextField
        label="Open Period"
        value={openPeriod}
        onChange={(e) => setOpenPeriod(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Profile Type */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Profile Type</InputLabel>
        <Select
          value={profileType}
          onChange={(e) => setProfileType(e.target.value)}
          label="Profile Type"
        >
          <MenuItem value="local">Local</MenuItem>
          <MenuItem value="tourist">Tourist</MenuItem>
          <MenuItem value="professional">Professional</MenuItem>
        </Select>
      </FormControl>

      {/* Apply Filters Button */}
      <Button variant="contained" color="primary" onClick={applyFilters}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default Filters;
