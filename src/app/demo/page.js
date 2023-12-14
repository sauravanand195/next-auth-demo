"use client"
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Button,
    CssBaseline,
    Paper,
    Link,
    IconButton,
    Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const products = [
    {
        id: 1,
        name: 'Product 1',
        description: 'High-quality product with amazing features.',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo id orci bibendum porttitor in ut velit.',
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'Innovative solution for your needs.',
        content: 'Pellentesque ut ipsum at purus eleifend commodo. Vestibulum ut est ac ligula euismod tincidunt.',
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'Premium product for a premium experience.',
        content: 'Suspendisse potenti. Duis id ultricies ipsum. Nunc vestibulum ligula eu velit pharetra.',
    },
];

function getRandomImage() {
    const width = 400; // Specify the desired width of the image
    const height = 200; // Specify the desired height of the image
    return `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`;
}

function App() {
    const parallaxRef = useRef(null);
    const [cardImages, setCardImages] = useState([]);

    useEffect(() => {
        // Fetch random card images from Lorem Picsum
        const fetchCardImages = async () => {
            const imagePromises = Array.from({ length: products.length }, () =>
                axios.get(getRandomImage())
            );

            try {
                const imageResponses = await Promise.all(imagePromises);
                const imageUrls = imageResponses.map((response) => response.config.url);
                setCardImages(imageUrls);
            } catch (error) {
                console.error('Error fetching card images:', error);
            }
        };

        fetchCardImages();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (parallaxRef.current) {
                const scrollY = window.scrollY;
                parallaxRef.current.style.backgroundPositionY = `${scrollY * 0.5}px`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <CssBaseline />
            <Paper
                ref={parallaxRef}
                style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg?auto=compress&cs=tinysrgb&w=600)',
                    backgroundSize: 'cover',
                    height: '300px', // Adjust the height based on your design
                    position: 'relative',
                }}
            >
                <Typography
                    variant="h3"
                    component="div"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    Welcome to My Awesome Store
                </Typography>
            </Paper>

            <Container style={{ paddingTop: '20px' }}>
                <Grid container spacing={3}>
                    {products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card
                                elevation={4}
                                style={{
                                    marginBottom: '20px',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <img
                                    src={cardImages[index] || getRandomImage()} // Use a random image if fetching fails
                                    alt={`Product ${product.id}`}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography color="text.secondary">{product.description}</Typography>
                                    <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px' }}>
                                        {product.content}
                                    </Typography>
                                    <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
                <Typography variant="body2" color="text.secondary" align="center">
                    &copy; {new Date().getFullYear()} My Product Store
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <IconButton color="primary" href="#" target="_blank">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton color="primary" href="#" target="_blank">
                        <TwitterIcon />
                    </IconButton>
                    <IconButton color="primary" href="#" target="_blank">
                        <FacebookIcon />
                    </IconButton>
                </div>
                <Typography variant="body2" color="text.secondary" align="center">
                    <Link color="inherit" href="#">
                        Privacy Policy
                    </Link>{' '}
                    |{' '}
                    <Link color="inherit" href="#">
                        Terms of Service
                    </Link>
                </Typography>
            </Paper>
        </div>
    );
}

export default App;
