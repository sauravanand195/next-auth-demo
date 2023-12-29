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
    Box,
    TextField,
    Snackbar,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const products = [
    {
        id: 1,
        name: 'Todo App',
        description: 'Organize your work and life, finally.',
        content: 'Maintain your day-to-day tasks or list everything that you have to do, with the most important tasks at the top of the list, and the least important tasks at the bottom.',
        action: 'Start Organising',
        route: '/todo',
    },
    {
        id: 2,
        name: 'Shopping App',
        description: 'Shop online with great deals over a wide range of products.',
        content: 'Enjoy unlimited Free Shipping, early access to Lightning Deals and more. Explore deals on top categories like Electronics, Fashion & more online today! Best Deals. Low Prices. No Cost EMI Available.',
        action: 'Start Shopping',
        route: '/shopping',
    },
    {
        id: 1,
        name: 'Planner App',
        description: 'Organize your work and life, finally.',
        content: 'Maintain your day-to-day tasks or list everything that you have to do, with the most important tasks at the top of the list, and the least important tasks at the bottom.',
        action: 'Start Planning',
        route: '/planner',
    },
];

const testimonials = [
    {
        id: 1,
        name: 'John Doe',
        quote: 'Amazing products! The quality is unmatched, and the customer service is exceptional.',
    },
    {
        id: 2,
        name: 'Jane Smith',
        quote: 'I love the variety of products. Each one feels unique and well-crafted.',
    },
    // Add more testimonials as needed
];

const productBenefits = [
    {
        id: 1,
        title: 'Premium Quality',
        description: 'Experience the highest quality materials and craftsmanship in every product.',
    },
    {
        id: 2,
        title: 'Innovative Designs',
        description: 'Stay ahead with our cutting-edge and trendsetting product designs.',
    },
    {
        id: 3,
        title: 'Customer Satisfaction',
        description: 'Our products are designed to exceed customer expectations and satisfaction.',
    },
    // Add more benefits as needed
];

function getRandomImage() {
    const width = 400; // Specify the desired width of the image
    const height = 200; // Specify the desired height of the image
    return `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`;
}

function App() {
    const router = useRouter();
    const parallaxRef = useRef(null);
    const parallaxRef2 = useRef(null);
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

        // Play the video when the component mounts
        // const videoElement = document.getElementById('videoElement');
        // if (videoElement) {
        //     videoElement.play().catch((error) => {
        //         console.error('Error playing video:', error);
        //     });
        // }

        fetchCardImages();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (parallaxRef.current) {
                const scrollY = window.scrollY;
                // Calculate the background position for each section
                const backgroundPosition1 = `${scrollY * 0.5}px`;
                const backgroundPosition2 = `${(scrollY - parallaxRef.current.offsetTop) * 0.5}px`;

                // Apply background positions
                parallaxRef.current.style.backgroundPositionY = backgroundPosition1;
                // Add more sections as needed
                parallaxRef2.current.style.backgroundPositionY = backgroundPosition2;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Add your form submission logic here
            console.log(formData);

            // Example: Simulate API request
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                // Show a success message or redirect the user
            }, 1000);
        }
    };

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
                    borderRadius: '0px',
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: 'stretch', // Ensure both sides take the full height
                }}
            >
                <Grid item xs={6} sm={6} md={6} style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography
                        variant="h4"
                        component="div"
                        style={{ color: 'white', fontWeight: "bold", textShadow: '4px 4px 4px rgba(0, 0, 0, 0.8)', }}
                    >
                        Welcome to My Awesome Store
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "10px", position: 'relative', overflow: 'hidden' }}>
                    {/* Video element without default controls */}
                    <video
                        id="videoElement"
                        src="/advertise.mp4" // Replace with the actual path to your video file
                        type="video/mp4"
                        controls
                        controlsList="nodownload nofullscreen"
                        autoPlay
                        // playsInline
                        muted  // Mute the video to autoplay without user interaction
                        style={{
                            width: '100%',
                            height: '80%',
                            objectFit: 'cover',
                            borderRadius: '5px',
                            boxShadow: '26px 30px 20px rgba(0, 0, 0, 0.4)', // Apply a shadow for depth
                            cursor: 'pointer',
                        }}
                    >
                        Your browser does not support the video tag.
                    </video>
                </Grid>
            </Paper>

            <Container style={{ paddingTop: '20px' }}>
                <Typography variant="h4" component="div" align="center" style={{ margin: '20px 0', fontWeight: 'bold' }}>
                    Discover the Excellence of Our Products
                </Typography>
                <Grid container spacing={3}>
                    {products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card
                                elevation={4}
                                style={{
                                    marginBottom: '20px',
                                    borderRadius: '5px',
                                    overflow: 'hidden',
                                    minHeight: "480px",
                                    transition: 'transform 0.2s',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                    },
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <img
                                    src={cardImages[index] || getRandomImage()}
                                    alt={`Product ${product.id}`}
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                                <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingBottom: "20px" }}>
                                    <Typography variant="h5" component="div">
                                        {product.name}
                                    </Typography>
                                    <Typography color="text.secondary">{product.description}</Typography>
                                    <Typography variant="body2" color="text.secondary" style={{ marginTop: '10px', flex: 1 }}>
                                        {product.content}
                                    </Typography>
                                    <div style={{ marginTop: '10px' }}>
                                        <Button variant="contained" color="primary" onClick={() => { router.push(product.route) }}>
                                            {product.action}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Customer Testimonials Section */}
            <div
                ref={parallaxRef2}
                style={{
                    background: 'url(https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&w=600) center/cover',
                    paddingTop: '40px',
                    paddingBottom: '40px',
                    // borderRadius: '10px',
                }}
            >
                <Container style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', padding: "24px", marginBottom: "40px" }}>
                    <Typography variant="h5" component="div" align="center" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
                        What Our Customers Say
                    </Typography>
                    <Grid container spacing={3}>
                        {testimonials.map((testimonial) => (
                            <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
                                <Paper style={{ padding: '20px', textAlign: 'center' }}>
                                    <Typography variant="body1" component="div" style={{ marginBottom: '10px' }}>
                                        {testimonial.quote}
                                    </Typography>
                                    <Typography variant="subtitle1" component="div" color="primary">
                                        {testimonial.name}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Container style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', padding: "24px" }}>
                    <Typography variant="h5" component="div" align="center" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
                        Key Product Benefits
                    </Typography>
                    <Grid container spacing={3}>
                        {productBenefits.map((benefit) => (
                            <Grid item xs={12} sm={6} md={4} key={benefit.id}>
                                <Paper style={{ padding: '20px', textAlign: 'center' }}>
                                    <Typography variant="h6" component="div" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                                        {benefit.title}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        {benefit.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>

            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                            Contact Us
                        </Typography>
                        <form onSubmit={handleSubmit} noValidate>
                            <TextField
                                fullWidth
                                margin="normal"
                                id="name"
                                label="Your Name"
                                variant="outlined"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                id="email"
                                label="Email Address"
                                variant="outlined"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                id="message"
                                label="Message"
                                multiline
                                rows={4}
                                variant="outlined"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                error={Boolean(errors.message)}
                                helperText={errors.message}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Send Message'}
                            </Button>
                        </form>
                    </Box>
                </Paper>
                <Snackbar
                    open={isSubmitting}
                    message="Submitting form..."
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                />
            </Container>
        </div >
    );
}

export default App;
