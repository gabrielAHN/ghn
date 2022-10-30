import ME from '../assets/me.png';
import carto from '../assets/carto.png';
import albania from '../assets/albania.jpeg';
import tlc from '../assets/tlc.jpeg';
import Carousel from "react-material-ui-carousel";

const bio_sliders = [
    {
        header: 'Now',
        paragraph: { __html: `<p>Now working in <a href="https://carto.com/" >CARTO</a> building maps and spatials tools for all. Specifically, building the spatial tools for the growing area of cloud ☁️ data warehouses, <a href="https://datastackshow.com/podcast/a-primer-on-spatial-data-with-gabriel-hidalgo-of-carto/">check out me here talking about CARTO and my journey here</a>. Also, <a href="https://academy.carto.com/courses/developer-advance/">creating lectures</a> for users to be better use the platform or learn about technical skills needs to do complex spatial analysis.</p>` },
        photo: carto,
        size: '30'
    },
    {
        header: 'London',
        paragraph: { __html: `<p>I relocated to London and joined <a href="https://citymapper.com/company" target="_blank">Citymapper</a>. A startup making transportation easier for all our app users in cities world wide. Especially working on the cities team where we use city knowledge, data analysis, and programing to understand, and improve how users navigate cities from Mexico City to NYC. Excited to continue my journey of making Citymapper better for users, and to join the tech that is changing transportation!!!</p>` },
        photo: ME,
        size: '30'
    },
    {
        header: 'NYC',
        paragraph: { __html: `<p>I jumped right back into NYC transportation by working for NYC Taxi and Limousine Commission on the External Affairs Team. I was able to be part of the political and industry side of the NYC Taxi industry, which had been experiencing extreme shifts because of emerging technologies and startups. Through this exposure, I deepened my knowledge of the relationships between government, technology, and communities.</p><p>Also, in my free time I am working on side projects that are more coding centered to create data collection systems and analysis of that data to better understanding technologies role within city design and policies.</p>`},
        photo: tlc,
        size: '30'
    },
    {
        header: 'Albania',
        paragraph: { __html: '<p>I joined Peace Corp to challenge myself by going to a place I had no knowledge of to do a job that I was passionate about, urban development. My experience far surpassed that challenge, and helped me define my thinking of a communities’ role in my own personal development.</p><p>I was able to be part of large scale project planning and designs within the small community of Erseke where I lived, and who despite me being an outsider welcomed me into the community. Working as an urban planner in the city government, taught me about the complexity of politics especially taking to count the cultural and community dimensions that were different from what I was used to back in the USA. Plus, the importance of building relationships to help a community improve and develop.</p>' },
        photo: albania,
        size: '20'
    }
]

export default function BioCarousel() {
    return (
        <div id="bio" className="h2-ghn" style={{ margin: "50px" }}>
            <h1>Bio</h1>
            <br />
            <Carousel animation="slide" navButtonsAlwaysVisible autoPlay={false} style={{ height: '200vh', padding: '100px' }}>
                {bio_sliders.map((slider, index) => (
                    <div key={index} elevation={10} style={{ backgroundImage: `url(${slider.photo})`, backgroundSize: 'cover', height: `${slider.size} %`, padding: '100px' }} className="HeightItem">
                        <div style={{ width: '45%', textAlign: 'left', backgroundColor: "white", borderRadius: '5px', padding: '1%' }}>
                            <h1 color='red'>{slider.header}</h1>
                            <div dangerouslySetInnerHTML={slider.paragraph} />
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}