import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Paper,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider,
    Grid,
    Chip,
} from "@mui/material";
import HtmlIcon from "@mui/icons-material/Web";
import CssIcon from "@mui/icons-material/FormatColorFill";
import JavascriptIcon from "@mui/icons-material/Code";
import { FaReact } from 'react-icons/fa';
import NodeJsIcon from "@mui/icons-material/Extension";
import MongoDBIcon from "@mui/icons-material/Storage";

const Portfolio = () => {
    const skills = [
        { label: "HTML", icon: <HtmlIcon /> },
        { label: "CSS", icon: <CssIcon /> },
        { label: "JavaScript", icon: <JavascriptIcon /> },
        { label: "React", icon: <FaReact /> },
        { label: "Node.js", icon: <NodeJsIcon /> },
        { label: "MongoDB", icon: <MongoDBIcon /> },
        // Add more skills as needed
    ];

    const calculateGridSize = () => {
        const totalSkills = skills.length;
        if (totalSkills <= 2) {
            return 6; // 2 skills per row
        } else if (totalSkills <= 4) {
            return 4; // 3 skills per row
        } else {
            return 3; // 4 skills per row
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Your Name</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                            <Avatar alt="Your Name" src="/jarvis.jpg" sx={{ width: 150, height: 150, margin: "0 auto" }} />
                            <Typography variant="h5" sx={{ fontWeight: 700, my: 2 }}>
                                Saurav Anand
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Web Developer
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body2" color="textSecondary">
                                Location: Bangalore
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Email: sauravanand195@gmail.com
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                                About Me
                            </Typography>
                            <Typography paragraph>
                                Hello! I am a passionate web developer with a strong background in front-end and back-end technologies.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero in dui venenatis, sit
                                amet auctor dolor congue.
                            </Typography>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, mt: 4 }}>
                                Skills
                            </Typography>
                            <Grid container spacing={1}>
                                {skills.map((skill, index) => (
                                    <Grid item xs={calculateGridSize()} key={index}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>{skill.icon}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={<Chip label={skill.label} />} />
                                        </ListItem>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        Contact Me
                    </Typography>
                    <Typography paragraph>
                        If you have any questions or would like to discuss a project, feel free to reach out to me via email at
                        your.email@example.com.
                    </Typography>
                </Paper>
            </Container>
        </>
    );
};

export default Portfolio;
