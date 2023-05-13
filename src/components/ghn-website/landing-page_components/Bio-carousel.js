import uk from '../assets/uk.png';
import carto from '../assets/carto.png';
import albania from '../assets/albania.png';
import tlc from '../assets/nyc-tlc.png';
import Carousel from "react-material-ui-carousel";

const bio_sliders = [
    {
        header: 'Now',
        paragraph: {
            __html: `
        <p>Now working remotely in <a href="https://carto.com/" >CARTO</a> building maps and spatials tools 🗺.</p>
        <p>Specifically, building the spatial tools for the growing area of cloud ☁️ data warehouses, and also, <a href="https://academy.carto.com/courses/developer-advance/">creating lectures</a> 🧑‍🏫 for all learn to solve complex spatial problems.</p>
        <p>Check out me<a href="https://datastackshow.com/podcast/a-primer-on-spatial-data-with-gabriel-hidalgo-of-carto/"> here talking about CARTO and my journey so far</a> 🥾.</p>
        ` },
        color: 'black',
        photo: carto,
        size: '100%',
        fontsize: '50'
    },
    {
        header: 'London',
        paragraph: {
            __html: `
        <p>Relocated to London 🇬🇧 and joined <a href="https://citymapper.com/company" target="_blank">Citymapper</a> to make transport better for all.</p>
        <p>There worked within the cities team managing data analyst 🧑‍💻 who were taking care many of the major cities in the US</p>
        <p>At the same time coding and improving the technical systems in Citymapper to improve our data infrastructure for all possible datasets we encounter across the world 🌎. If you want to <a href="mailto: gabrielhn@hey.com">talk GTFS Pathways hit me up</a>😊.</p>
        `},
        photo: uk,
        size: '1',
        fontsize: '70',
        color: 'white'
    },
    {
        header: 'NYC',
        paragraph: {
            __html: `
        <p>Lived in NYC🗽 working for the NYC Taxi and Limousine Commission in the External Affairs Team.</p>
        <p>Joined because of the extreme shifts in the industry caused by Uber 🚕 where my interest in tech, gov, transportation started.</p>
        <p>Here I is where are started to coding to better understand 🔬 what was going on at the time, and what has made real the impact of tech 🤖.</p>`
        },
        photo: tlc,
        size: '20',
        fontsize: '50',
        color: 'white'
    },
    {
        header: 'Albania',
        paragraph: { __html: `
        <p>Joined Peace Corp right after college as an Urban planner stationed in the Albania 🇦🇱 town of Ersëke</p>
        <p> I was able to be part of large scale planning projects for Erseke where I lived 🏠. Working as an urban planner in another country and another language taught me how important building relationships 🤝 is to help a community improve and develop 👷‍♂️.</p>` },
        photo: albania,
        size: '20',
        fontsize: '60',
        color: 'black'
    }
]

export default function BioCarousel() {
    return (
        <div id="bio" className="h2-ghn" style={{ margin: "50px" }}>
            <h1>Bio</h1>

            <a className="link-style" 
                target='_blank'
                href="https://ghn-public-data.s3.amazonaws.com/website/website_resume.pdf"
                style={{
                    'fontSize': 15,
                    'color': 'black',
                    'textDecoration': 'none',
                    'fontFamily': 'Quicksand, sans-serif'
                  }}
                >
                For the longer version📜 aka resume
            </a>
            <br />
            <br />
            <Carousel animation="slide" navButtonsAlwaysVisible autoPlay={false} style={{ height: '200vh', padding: '75px' }}>
                {bio_sliders.map((slider, index) => (
                    <div key={index} elevation={10} style={{
                        backgroundImage: `url(${slider.photo})`,
                        backgroundSize: 'cover',
                        height: `${slider.size} %`,
                        padding: '50px'
                    }} className="HeightItem">
                        <h1 style={{ color: `${slider.color}`, textAlign: 'left', fontSize: 50 }}>{slider.header}</h1>
                        <div style={{ width: '70%', textAlign: 'left', backgroundColor: "white", borderRadius: '5px', padding: '1%' }}>
                            <div dangerouslySetInnerHTML={slider.paragraph} />
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}