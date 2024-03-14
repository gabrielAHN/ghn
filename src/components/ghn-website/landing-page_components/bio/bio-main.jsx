import BioMap from "./bio-map/bio-map-main";
import BioCarousel from "./bio-carousel";
import Box from '@mui/material/Box';


export default function BioMain() {
    return (
        <>
            <h1>Bio</h1>
            <h1>
            <a className="link-style" style={{fontSize: '0.5em'}}
            target='_blank'
            href="https://ghn-public-data.s3.amazonaws.com/website/website_resume.pdf">
            For the longer version📜 aka resume
            </a>
            </h1>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <BioMap />
            </Box>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <BioCarousel />
            </Box>
        </>
    );

}