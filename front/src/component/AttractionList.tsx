import React, { useEffect, useState } from 'react';
import AttractionCard from './AttractionCard.tsx';
import Grid from '@mui/material/Grid';
import { getAttractions } from '../controllers/attractionController.js';
import { Attraction } from '../interfaces/Attraction.ts';

const AttractionList: React.FC = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [Loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await getAttractions(); // Appel au contrôleur pour récupérer les attractions
        console.log('Fetched attractions:', response);
        setLoading(false); // Fin du chargement
        setAttractions(response.data); // Mise à jour des attractions
      } catch (err) {
        setError('Erreur lors du chargement des attractions.');
        console.error(err); // Affichage de l'erreur dans la console
      }
    };

    fetchAttractions();
  }, []); // Cette fonction s'exécute au premier rendu du composant

  if (error) {
    return <div>{error}</div>; // Affichage du message d'erreur si nécessaire
  }

  if (Loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2}>
      {attractions.map((attraction) => (
        <Grid item xs={12} sm={6} md={4} key={attraction.location_id}>
          <AttractionCard {...attraction} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AttractionList;
