"use client"
import React, { useEffect } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const Index = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

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

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        window.history.scrollRestoration = 'manual';
    }, [])

    useEffect(() => {
        const autoPlayInterval = setInterval(() => {
            const nextStep = (activeStep + 1) % carouselProducts.length;
            setActiveStep(nextStep);
        }, 3000);

        return () => clearInterval(autoPlayInterval);
    }, [activeStep, carouselProducts]);

    const currentProduct = carouselProducts[activeStep];

    return (
        <Container sx={{ padding: 4 }}>
            {/* Carousel Section */}
            <Typography variant="h4" gutterBottom>
                New Arrivals
            </Typography>
            <Card onClick={() => handleProductClick(currentProduct)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={currentProduct.name}
                        height="140"
                        image={`${currentProduct.image}?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            {currentProduct.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {currentProduct.description}
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{ marginTop: 2 }}>
                            ₹{currentProduct.price.toFixed(2)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            {/* Modal for Product Descriptions */}
            <Dialog open={openModal} onClose={handleModalClose} maxWidth="md" fullWidth>
                <DialogTitle>{selectedProduct?.name}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <CardMedia
                                component="img"
                                alt={selectedProduct?.name}
                                height="240"  // Adjust the height as needed
                                image={`${selectedProduct?.image}?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DialogContentText>{selectedProduct?.description}</DialogContentText>
                            <DialogContentText>Price: ₹{selectedProduct?.price.toFixed(2)}</DialogContentText>
                            {/* Add more details as needed */}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

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
                                    image={`${product.image}?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`}
                                    onClick={() => handleProductClick(product)}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                                        <Typography variant="h6" color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
                                            ₹{product.price.toFixed(2)}
                                        </Typography>
                                        <Typography variant="h6" color="text.primary"
                                            sx={{ cursor: "pointer", padding: "6px 16px", borderRadius: "4px", backgroundColor: "#1976d2", color: "white", fontSize: "0.875rem", fontWeight: 500, boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)", display: 'flex', alignItems: 'center', textTransform: 'uppercase' }}
                                        >Add to Cart
                                        </Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Index;