import React from 'react';
import { Box, Typography, TextField, Button, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="2rem"
      bgcolor="#fff"
    >
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Welcome to your Trip Advisor
      </Typography>

      <Typography variant='body1' textAlign='center' mb={3}>
        Not Tripadvisor, do not sue us please.
      </Typography>

      {/* Banner Section */}
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '100%',
          maxWidth: '900px',
          height: '400px',
          borderRadius: '15px',
          overflow: 'hidden',
          backgroundImage: 'url("https://cdn.pixabay.com/photo/2021/06/22/16/39/arch-6356637_1280.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Text Content */}
        <Box
          position="absolute"
          bottom="2rem"
          left="2rem"
          color="white"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '1rem',
            borderRadius: '10px',
          }}
        >

          <Typography variant="h5" fontWeight="bold">
            Explore the world with us !
          </Typography>
          <Typography variant="body1" mt={1}>
            We went, we reviewed, we reached milestones. Come check attractions around you !
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              marginTop: '1rem',
              textTransform: 'none',
              borderRadius: '25px',
            }}
            onClick={() => navigate('/landing')}
          >
            Discover Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
