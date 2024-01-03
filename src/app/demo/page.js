"use client"
import React from "react";
import {
    Typography,
    Container,
    Paper,
    Avatar,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider,
    Grid,
    Chip,
} from "@mui/material";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { DiJavascript } from "react-icons/di";
import { FaReact } from 'react-icons/fa';
import { FaNodeJs } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { TbHexagonLetterE } from "react-icons/tb";

const Portfolio = () => {
    const skills = [
        { label: "HTML", icon: <FaHtml5 /> },
        { label: "CSS", icon: <FaCss3 /> },
        { label: "JavaScript", icon: <DiJavascript /> },
        { label: "React", icon: <FaReact /> },
        { label: "Next js", icon: <SiNextdotjs /> },
        { label: "Node js", icon: <FaNodeJs /> },
        { label: "Express js", icon: <TbHexagonLetterE /> },
        { label: "MongoDB", icon: <SiMongodb /> },
        { label: "MySQL", icon: <GrMysql /> },
        // Add more skills as needed
    ];

    console.log('window.innerWidth', window.innerWidth);

    const calculateGridSize = () => {
        const totalSkills = skills.length;
        if (totalSkills <= 2 || window.innerWidth <= '600') {
            return 6; // 2 skills per row
        } else if (totalSkills <= 4) {
            return 4; // 3 skills per row
        } else {
            return 3; // 4 skills per row
        }
    };

    return (
        <>
            <Container sx={{ pt: "20px", pb: 2 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                            <Avatar alt="Your Name" src="/jarvis.jpg" sx={{ width: 150, height: 150, margin: "0 auto" }} />
                            <Typography variant="h5" sx={{ fontWeight: 700, my: 1 }}>
                                Saurav Anand
                            </Typography>
                            <Typography variant="body3" color="textSecondary">
                                Web Developer
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body2" color="textSecondary">
                                Location: Bangalore
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Email: <a href="mailto:sauravanand195@gmail.com" style={{ textDecoration: "none" }}> sauravanand195@gmail.com</a>
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                                About Me
                            </Typography>
                            <Typography paragraph>
                                Hello! I am a Full-stack web developer with 2.5+ years of hands-on experience in front-end and
                                back-end development. Proficient with various web development frameworks such
                                as ReactJs, Express JS and Next Js. Can work closely with the team and good at adaptation.
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
                <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        Contact Me
                    </Typography>
                    <Typography paragraph>
                        If you have any questions or would like to discuss a project, feel free to reach out to me via email at
                        <a href="mailto:sauravanand195@gmail.com" style={{ textDecoration: "none" }}> sauravanand195@gmail.com</a>
                    </Typography>
                </Paper>
            </Container>
        </>
    );
};

export default Portfolio;
