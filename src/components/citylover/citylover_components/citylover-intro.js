

export default function CityloverIntro() {

    return (
        <div>
            <h1>Features Intro 👋</h1>
            <p>Citylover is made up of two ✌️ features for <b>work</b> and <b>news</b>, plus more to come.🔮</p>
            <h3>Work For Cities 💼</h3>
            <p>Work for cities allows you to search for the job of your dream by allowing you to filter by different profiles related to cities.</p>
            <div style={{display: 'flex', justifyContent:'flex-end'}}>

                <p>Transport Enthusiast 🚲 - These are for those Transit fans who like trains, alternative travel like bikes or scooters, or a good bus.</p>
                <p>Gov Lovers ❤️ - For all those that want to love cities from within all types of jobs within governments and municiplities.</p>
                <p>Urbanist Techies 🤖 - This is for the coders or tech Enthusiast who want to work in startups or anything in tech for cities(My favorite).</p>
                <p>City Builders 👷 - These are for the archectis or urban planners helping to plan and build our physical cities.</p>
            </div>
            <a className="link-style" href={'city_work'} style={{'color': 'black', 'textDecoration': 'none',}}>If you want to go directly to this page you can bookmark this url to go there directly.</a> 
            <h3>News about Cities 📰</h3>
            <p>News about cities has all the articles, podcasts, blogs, or news happening in all cities across the world 🌎.</p>
            <p>For easy of navigation we have ordered them by type of item or from the original source to make it easier to search through your favorite:</p>
            {/* <img src={}/> */}
            <a className="link-style" href={'city_news'} style={{'color': 'black', 'textDecoration': 'none',}}>If you want to go directly to this page you can bookmark this url to go there directly.</a> 

        </div>
    )
}