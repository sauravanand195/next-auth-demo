"use client"
import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Button,
    Paper,
} from '@mui/material';
import SwipeableViews from 'react-swipeable-views';

const carouselProducts = [
    {
        id: 1,
        name: 'Fashion Sale',
        description: 'Explore the latest fashion trends. Up to 50% off!',
        price: 39.99,
        image: 'https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
        id: 2,
        name: 'Electronics Deals',
        description: 'Save big on the latest electronics. Limited-time offers!',
        price: 69.99,
        image: 'https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
];

const featuredProducts = [
    {
        id: 1,
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 1599,
        image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600', // Add your image path
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'Description for Product 2',
        price: 2299,
        image: 'https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=600', // Add your image path
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'Description for Product 2',
        price: 4999,
        image: 'https://images.pexels.com/photos/1537671/pexels-photo-1537671.jpeg?auto=compress&cs=tinysrgb&w=600', // Add your image path
    },
    {
        id: 4,
        name: 'Product 4',
        description: 'Description for Product 2',
        price: 999,
        image: 'https://images.pexels.com/photos/2857040/pexels-photo-2857040.jpeg?auto=compress&cs=tinysrgb&w=600', // Add your image path
    },
    // Add more featured products as needed
];

const Index = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const autoPlayDelay = 2000; // Set the delay for auto-play in milliseconds

    useEffect(() => {
        const autoPlayInterval = setInterval(() => {
            const nextStep = (activeStep + 1) % carouselProducts.length;
            setActiveStep(nextStep);
        }, autoPlayDelay);

        return () => clearInterval(autoPlayInterval);
    }, [activeStep, carouselProducts.length]);

    return (
        <Container sx={{ padding: 4 }}>
            {/* Carousel Section */}
            <Typography variant="h4" gutterBottom>
                New Arrivals
            </Typography>
            <SwipeableViews index={activeStep} onChangeIndex={handleStepChange} autoPlay interval={autoPlayDelay}>
                {carouselProducts.map((product) => (
                    <Card key={product.id}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={product.name}
                                height="140"
                                image={product.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="h6" color="text.primary" sx={{ marginTop: 2 }}>
                                    ₹{product.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </SwipeableViews>

            {/* Featured Products Section */}
            <Typography variant="h4" gutterBottom sx={{ marginTop: 4 }}>
                Featured Products
            </Typography>
            <Grid container spacing={3}>
                {featuredProducts.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={product.name}
                                    height="140"
                                    image={product.image}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                    <Typography variant="h6" color="text.primary" sx={{ marginTop: 2 }}>
                                        ${product.price.toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Button variant="contained" color="primary" fullWidth>
                                Add to Cart
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Index;
