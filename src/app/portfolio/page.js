"use client"
import { Grid } from "@mui/material";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import Image from "next/image";

const index = () => {
    return (
        <>
            <Grid container>
                <Grid item xs={3}>
                    <div className="left-wrapper">
                        <div className="colorFFF">
                            <div className="profile-wrapper pt-20">
                                {/* <img className="profile-pic" height="150px" width="150px" src="https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=600" /> */}
                                <Image alt="Picture of the author" src="/jarvis.jpg" height="150" width="150" style={{ borderRadius: "50%", border: "5px solid white", objectFit: "cover" }} />
                            </div>
                        </div>
                        <div className="colorFFF fw700 font25 pt-10 pb-20">Saurav Anand</div>
                        <div className="icon-wrap colorFFF pr-20">
                            <div className="icon-img pl-20"><TwitterIcon /></div>
                            <div className="icon-img pl-20"><InstagramIcon /></div>
                            <div className="icon-img pl-20"><FacebookRoundedIcon /></div>
                            <div className="icon-img pl-20"><EmailOutlinedIcon /></div>
                            <div className="icon-img pl-20"><LinkedInIcon /></div>
                        </div>
                        <div className="tab-wrapper pt-30">
                            <div className="tab-element colorFFF font20 pt-20">
                                <div className="tab-icon"><HomeOutlinedIcon /></div>
                                <div className="tab-name pl-10">Home</div>
                            </div>
                            <div className="tab-element colorFFF font20 pt-20">
                                <div className="tab-icon"><PermIdentityOutlinedIcon /></div>
                                <div className="tab-name pl-10">About</div>
                            </div>
                            <div className="tab-element colorFFF font20 pt-20">
                                <div className="tab-icon"><DescriptionOutlinedIcon /></div>
                                <div className="tab-name pl-10">Resume</div>
                            </div>
                            <div className="tab-element colorFFF font20 pt-20">
                                <div className="tab-icon"><ViewListIcon /></div>
                                <div className="tab-name pl-10">Portfolio</div>
                            </div>
                            <div className="tab-element colorFFF font20 pt-20">
                                <div className="tab-icon"><DnsOutlinedIcon /></div>
                                <div className="tab-name pl-10">Services</div>
                            </div>
                            <div className="tab-element colorFFF font20 pt-20">
                                <div className="tab-icon"><ContactMailOutlinedIcon /></div>
                                <div className="tab-name pl-10">Contact</div>
                            </div>
                        </div>
                        <div className="footer-wrapper colorFFF">
                            <div>&copy;&nbsp;Copyright Jarvis</div>
                            <div>Designed by Saurav</div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className="right-wrapper">
                        <div className="text-wrapper">
                            <div>
                                <div className="prmry-text">Saurav Anand</div>
                            </div>
                            <div className="text-animate-wrap">
                                <span>I'm</span>
                                <div className="message">
                                    <div className="word1">Developer</div>
                                    <div className="word2">coder</div>
                                    <div className="word3">Creator</div>
                                </div>
                            </div>

                            {/* <div className="prmry-text">Saurav Anand</div>
                            <div className="scndry-text">I'm Software Developer</div> */}
                        </div>
                    </div>
                </Grid>
            </Grid>
            <style jsx>{`
                .left-wrapper{background: black; height: 100vh; text-align: center; position: relative;}
                .right-wrapper{background: url("https://cdn.pixabay.com/photo/2015/01/09/11/08/startup-594090_640.jpg"); background-repeat: no-repeat; background-size: cover; height: 100%; opacity: 0.8;}
                // .profile-pic{border-radius: 50%; border: 5px solid white; object-fit: cover;}
                .icon-wrap{display: flex; justify-content: center;}
                .icon-img:hover{cursor: pointer;transition: 1s;color: cyan}
                .tab-wrapper{text-align: left; padding-left: 25%}
                .tab-element{display: flex; cursor: pointer;}
                .tab-element:hover{transition: 1s;color: cyan}
                .footer-wrapper{position: absolute; bottom: 0; width: 100%;}
                .text-wrapper{position: absolute; top: 45%; left: 30%;}
                .prmry-text{font-size: 50px; color: white; font-weight: bold;
                    -webkit-text-stroke-width: 0.5px;
                    -webkit-text-stroke-color: black;
                }
                .text-animate-wrap,.word1,.word2,.word3{font-family:tahoma}.text-animate-wrap{color:#000;font-size:3rem;font-weight:100;line-height:1.5;text-transform:uppercase;white-space:nowrap;overflow:hidden;position:relative;width:550px}.text-animate-wrap span{font-size:40px}.message{background-color:#ff0;color:#333;display:block;font-weight:900;overflow:hidden;position:absolute;padding-left:.5rem;top:.2rem;left:80px;animation:5s ease-in-out infinite openclose}@keyframes openclose{0%,33%,35%{top:.2rem;width:0}5%{width:0}15%{width:330px}30%{top:.2rem;width:330px}38%{top:-4.5rem}48%,62%{top:-4.5rem;width:190px}66%{top:-4.5rem;width:0;text-indent:0}71%,98%{top:-9rem;width:0;text-indent:5px}86%,95%{top:-9rem;width:285px}100%{top:0;width:0;text-indent:0}}
                
            `}</style>
        </>
    );
}

export default index;