import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import AttractionCard from './AttractionCard.tsx';
import Filters from './Filters.tsx';
import { Attraction } from '../interfaces/Attraction.ts';
import { getAttractions } from '../controllers/attractionController.js';
import AttractionList from './AttractionList.tsx';

const SearchPage: React.FC = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fetchFilteredAttractions = async () => {
      try {
        const response = await getAttractions(filters);
        setAttractions(response.data);
      } catch (error) {
        console.error('Error fetching filtered attractions:', error);
      }
    };

    fetchFilteredAttractions();
  }, [filters]);

  return (
    <div>
      <Filters setFilters={setFilters} />
      <Grid container spacing={2}>
      {attractions.map((attraction) => (
        <Grid item xs={12} sm={6} md={4} key={attraction.location_id}>
          <AttractionCard {...attraction} />
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default SearchPage;
