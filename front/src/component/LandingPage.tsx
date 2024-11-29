import React, { useState} from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const [usertype, setUsertype] = useState<string | null>(null);
    const [inputText, setInputText] = useState("");

    const navigate = useNavigate();

    const handleUsertype = (type: string) => {
        console.log(type);
        setUsertype(type);
        const now = new Date();
        const expirationTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 1 day from now

        const userData = {
            time: now.toISOString(),
            expiration_time: expirationTime.toISOString(),
            user_profile: type,
        };

        localStorage.setItem("userData", JSON.stringify(userData));
        // axios.post("http://localhost:8000/db/add/", {
        //     data: userData,
        // }, {
        //     headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Content-Type': 'application/json'
        //     }
        // })
        // .then(response => {
        //     console.log("Data saved successfully:", response.data);
        // })
        // .catch(error => {
        //     console.error("Error saving data:", error);
        // });
    }

    const handleInputSubmit = () => {
        console.log("User input:", inputText);
        // Add logic to handle the submitted input (e.g., API call)
        axios.get(`http://localhost:8000/api/get_tripadvisor/?name=${inputText}`)
            .then(response => {
                console.log("Data retrieved successfully:", response.data);
                // Add logic to handle the retrieved data
            })
            .catch(error => {
                console.error("Error retrieving data:", error);
            });
        navigate("/attractions");
    };

    const services = [
        {
            title: "Professional Attractions",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/df/75/f4/caption.jpg?w=800&h=-1&s=1",
            // link: "/#",
            type: "professional"
        },
        {
            title: "Tourism Attractions",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/df/77/93/caption.jpg?w=800&h=-1&s=1",
            // link: "/#",
            type: "tourism"
        },
        {
            title: "Local Attractions",
            image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/df/76/76/caption.jpg?w=800&h=-1&s=1",
            // link: "/#",
            type: "local"
        },
    ];

    return (
        <>
            {/* Title */}
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} padding={10}>
                What are you looking for?
            </Typography>

            {/* Services Container */}
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                gap={4}
                padding="2rem"
                bgcolor="#ffff"
            >
                {services.map((service, index) => (
                    <Box
                        key={index}
                        component="a"
                        href={service.link}
                        position="relative"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            width: "100%",
                            maxWidth: "300px",
                            height: "300px",
                            borderRadius: "15px",
                            overflow: "hidden",
                            backgroundImage: `url(${service.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            textDecoration: "none",
                            transition: "transform 0.3s, box-shadow 0.3s",
                            filter: usertype && usertype !== service.type ? "grayscale(100%)" : "none",
                            "&:hover": {
                                transform: "scale(1.05)",
                                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                            },
                        }}
                        onClick={() => handleUsertype(service.type)}
                    >
                        {/* Overlay and Text */}
                        <Box
                            position="absolute"
                            bottom="1.5rem"
                            left="1.5rem"
                            color="white"
                            sx={{
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                padding: "0.8rem",
                                borderRadius: "10px",
                            }}
                        >
                            <Typography variant="h6" fontWeight="bold">
                                {service.title}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            {/* Footer Input Box */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bgcolor="#ffff"
                padding="2rem"
                marginTop="2rem"
            >
                <Typography variant="h6" fontWeight="bold" marginBottom="1rem">
                    Enter your town below
                </Typography>
                <Box display="flex" flexDirection="row" gap="1rem" alignItems="center">
                    <TextField
                        variant="outlined"
                        placeholder="Type something..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        sx={{ width: "300px" }}
                    />
                    <Button variant="contained" color="primary" onClick={handleInputSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default LandingPage;