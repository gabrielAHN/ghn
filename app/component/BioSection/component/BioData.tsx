import Uk from '@/assets/Home/uk.png';
import Albania from '@/assets/Home/albania.png';
import Tlc from '@/assets/Home/nyc-tlc.png';
import Hk from '@/assets/Home/hong-kong.jpg';


export const BIO_INFO = {
    "now": {
        header: 'Hong Kong 🇭🇰',
        view: {
            latitude: 22.3193, longitude: 114.0574, zoom: 10,
            transitionDuration: 6000,
        },
        paragraph: {
            __html: `
        <p>Now working in Hong Kong 🇭🇰 in <a class="underline hover:no-underline hover:[text-shadow:_0.25vh_0.24vh_0_rgb(255_220_44_/_110%)]" href="https://carto.com/" >CARTO</a> helping users build spatial solutions.</p>
        <p>Specifically helping expand across Asia 🌏, using cloud ☁️ services to build applications, or analysis spatial data via SQL</p>
        <p>Check out my<a class="underline hover:no-underline hover:[text-shadow:_0.25vh_0.24vh_0_rgb(255_220_44_/_110%)]" href="https://datastackshow.com/podcast/a-primer-on-spatial-data-with-gabriel-hidalgo-of-carto/"> CARTO journey</a> 🥾, or if you around HK feel free to reach out.</p>
        ` },
        color: 'black',
        photo: Hk

    },
    "london": {
        header: 'London 🇬🇧',
        view: {
            latitude: 51.509865, longitude: -0.178092, zoom: 11,
            transitionDuration: 6000,
        },
        paragraph: {
            __html: `
        <p>Relocated to London 🇬🇧 and joined <a class="underline hover:no-underline hover:[text-shadow:_0.25vh_0.24vh_0_rgb(255_220_44_/_110%)]" href="https://citymapper.com/company" target="_blank">Citymapper</a> to make transport better for all.</p>
        <p>Worked within the cities team as the USA Region led 🧑‍💻 taking care many of the major cities in the US like NYC, SF, and LA.</p>
        <p>At the same time coding and improving the technical systems in Citymapper to improve our data infrastructure for all possible datasets we encounter across the world 🌎.</p>
        `},
        photo: Uk,
        color: 'black'
    },
    "nyc": {
        header: 'NYC 🗽',
        view: {
            latitude: 40.7128, longitude: -74.1060, zoom: 10,
            transitionDuration: 6000,
        },
        paragraph: {
            __html: `
        <p>Lived in NYC🗽 working for the NYC Taxi and Limousine Commission in the External Affairs Team.</p>
        <p>Joined because of the extreme shifts in the industry caused by Uber 🚕 where my interest in tech, gov, transportation started.</p>
        <p>This is where I started to code so I could understand the change in transportation 🔬, and real time effect of tech 🤖.</p>`
        },
        photo: Tlc,
        color: 'white'
    },
    "albania": {
        header: 'Albania 🇦🇱',
        view: {
            latitude: 41.1533,
            longitude: 18.0683,
            zoom: 6,
            bearing: 0,
            pitch: 0,
            transitionDuration: 6000,
        },
        paragraph: {
            __html: `
        <p>Joined Peace Corp right after college as an Urban planner stationed in the Albania 🇦🇱 town of Ersëke</p>
        <p> I was able to be part of large scale planning projects for Erseke where I lived 🏠. Working as an urban planner in another country and another language taught me how important building relationships 🤝 is to help a community improve and develop 👷‍♂️.</p>` },
        photo: Albania,
        color: 'white'
    }
}