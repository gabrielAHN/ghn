from citylover.scrapers.newsletter_scrapers import (
    rss_parser, apple_parser, allthingsurban,
    govtech, transitcenter, streetsblog, parking_mobility,
    axios, spur, micromobilitypodcast,
    zag, transloc, commutifi
)
from citylover.scrapers.jobs_scrapers import (
    planetizen_jobs, allthingsurban_jobs,
    apany_jobs, govlove_jobs, beta_nyc_jobs,
    nyc_planning_jobs, carto_jobs
)


website_info = [
    {
        'id': 'citymapper',
        'name': 'Citymapper',
        'type': ['job'],
        'image_size':   '60px',
        'image': 'https://logovectorseek.com/wp-content/uploads/2020/11/citymapper-logo-vector.png',
        'feature_post': True
    },
    {
        'id': 'planetizen',
        'name': 'Planetizen',
        'type': ['news'],
        'image_size':   '60px',
        'image': 'https://simplycareer.com/wp-content/uploads/2015/05/planetizen-425x215.png',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://www.planetizen.com/frontpage/feed',
        },
        'jobs': {
            'scrape_function': planetizen_jobs,
            'website': 'https://www.planetizen.com/jobs',
        }
    },
    {
        'id': 'thecityfix',
        'name': 'TheCityFix',
        'type': ['article'],
        'image_size':   '35px',
        'image': 'https://thecityfixlearn.org/sites/default/files/18_Logo_TheCityFix_Learn.png',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://feeds.feedburner.com/thecityfix/posts'
        }
    },
    {
        'id': 'allthingsurban',
        'name': 'All Things Urban',
        'type': ['blog'],
        'image_size':   '35px',
        'image': 'https://all-things-urban.storage.googleapis.com/static/images/social.jpg',
        'newsletter': {
            'scrape_function': allthingsurban,
            'website': 'https://www.allthingsurban.net/blog'
        },
        'jobs': {
            'scrape_function': allthingsurban_jobs,
            'website': 'https://www.allthingsurban.net/career'
        }
    },
    {
        'id': 'monocle',
        'name': 'Monocle',
        'type': ['podcast'],
        'image_size': '70px',
        'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmKMTL7s8pHWi3lGcPnbXw5_bP4VXZIP2PgdXV5wr-u7tlTtgf',
        'newsletter': {
                'scrape_function': rss_parser,
                'website': 'https://www.omnycontent.com/d/playlist/e6127ab7-b81e-456b-893c-a8d600215365/7903d81a-7481-40dd-85ff'
                           '-a8db009e611f/ff59014c-a954-4271-8920-a8db009e612d/podcast.rss '
        }
    },
    {
        'id': 'smartcities',
        'name': 'Smartcities',
        'type': ['news'],
        'image': 'https://leadingcities2014.files.wordpress.com/2019/09/smartcities_logo_black.png',
        'image_size':   '18px',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://www.smartcitiesdive.com/feeds/news/'
        }
    },
    {
        'id': 'datasmart',
        'name': 'Datasmart',
        'type': ['article'],
        'image': 'https://pbs.twimg.com/profile_images/877596367555874817/EsB6Sxl4.jpg',
        'image_size':   '70px',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://datasmart.ash.harvard.edu/feeds'
        }
    },
    {
        'id': 'strongtowns',
        'name': 'Strongtowns',
        'type': ['podcast'],
        'image': 'https://pbcdn1.podbean.com/imglogo/image-logo/2312128/Blue_Stripe_Square_edit.png',
        'image_size':   '70px',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://feed.podbean.com/podcast.strongtowns.org/feed.xml'
        }
    },
    {
        'id': 'itetalk',
        'name': 'Itetalk',
        'type': ['podcast'],
        'image': 'https://d3wo5wojvuv7l.cloudfront.net/t_square_limited_320/images.spreaker.com/original/d933ad68df9d533175abe3a002d22ede.jpg',
        'image_size':   '70px',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://www.spreaker.com/show/1744465/episodes/feed'
        }
    },
    {
        'id': 'metromag',
        'name': 'Metro Mag',
        'type': ['news'],
        'image': 'https://fleetimages.bobitstudios.com/upload/metro-magazine/met-og-__-1200x630-s.png',
        'image_size':   '55px',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://www.metro-magazine.com/rss'
        }
    },
    {
        'id': 'talkingheadways',
        'name': 'Talking Headways',
        'type': ['podcast'],
        'image': 'https://ssl-static.libsyn.com/p/assets/3/3/e/8/33e8d0ffe911533c/talking_headways_v7.png',
        'image_size':   '60px',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://streetsblog.libsyn.com/rss'
        }
    },
    {
        'id': 'secondave',
        'name': 'Second Ave Sagas',
        'type': ['blog'],
        'image': 'http://bkabak.wpengine.com/wp-content/uploads/2019/10/saslogo960x200.jpg',
        'image_size':   '20px',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'http://feeds.feedburner.com/SecondAveSagas'
        }
    },
    {
        'id': 'cityjournal',
        'name': 'City Journal',
        'type': ['news'],
        'image': 'https://upload.wikimedia.org/wikipedia/commons/4/48/City_Journal_logo.png',
        'image_size':   '70px',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'http://feeds.feedburner.com/city-journal'
        }
    },
    {
        'id': 'bikeleague',
        'name': 'Bike League',
        'type': ['blog'],
        'image': 'https://www.bikeleague.org/sites/all/themes/lab/images/league-logo.png',
        'image_size':   '60px',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://www.bikeleague.org/blog/feed'
        }
    },
    {
        'id': 'govlove',
        'name': 'GovLove',
        'type': ['podcast'],
        'image': 'https://storage.googleapis.com/proudcity/elglor/uploads/2018/02/cropped-elgl-icon-blue.png',
        'image_size':   '40px',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://govlove.libsyn.com/rss'
        },
        'jobs': {
            'scrape_function': govlove_jobs,
            'website': 'https://elgljobs.com/jobs/?categories[]=Data%20%26%20Analysis&categories[]=Innovation&categories[]=Planning'
        }
    },
    {
        'id': 'nextcity',
        'name': 'Next City',
        'type': ['news'],
        'image': 'https://nextcity.org/images/events/Next_City_Orange_Logo.png',
        'image_size':   '60px',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://nextcity.org/feeds/daily'
        }
        # Bad Job results
        # ,
        # 'jobs': {
        #     'scrape_function': nextcity_jobs,
        #     'website': 'https://jobs.nextcity.org/'
        # }
    },
    {
        'id': 'apany',
        'name': 'NY APA',
        'type': ['jobs'],
        'image': 'https://planning-org-uploaded-media.s3.amazonaws.com/uploads/PROFILE_PHOTOS/7816568a-17ef-47c6-8291-2cda62b13910.png',
        'image_size':   '40px',
        'jobs': {
            'scrape_function': apany_jobs,
            'website': 'https://www.nyplanning.org/career-development/jobs/'
        }
    },
    {
        'id': 'govtech',
        'name': 'Govtech',
        'type': ['news'],
        'image': 'https://assets.website-files.com/59dfccba14d0c50001317351/5a625dd96f429200014442c3_gt.jpg',
        'image_size':   '70px',
        'newsletter': {
            'scrape_function': govtech,
            'website': 'https://www.govtech.com/transportation/'
        }
    },
    {
        'id': 'transitcenter',
        'name': 'Transitcenter',
        'type': ['blog'],
        'image': 'https://d3n8a8pro7vhmx.cloudfront.net/circulatesd/pages/1101/attachments/original/1553274530/transit-center-logo.png?1553274530',
        'image_size':   '30px',
        'newsletter': {
            'scrape_function': transitcenter,
            'website': 'https://transitcenter.org/blog/'
        }
    },
    {
        'id': 'streetsblog',
        'name': 'Streetsblog',
        'type': ['blog'],
        'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm06X4'
        '-kgmtexgJpGSv8RLLBu86D7KkMISeaSVNP1vNtn7nggAIg&s',
        'image_size':   '70px',
        'newsletter': {
            'scrape_function': streetsblog,
            'website': 'https://nyc.streetsblog.org/category/issues-campaigns/transit/'
        }
    },
    {
        'id': 'intelligenttransport',
        'name': 'Intelligent Transport',
        'type': ['news'],
        'image': 'https://www.intelligenttransport.com/wp-content/themes/it19/images/IT-Logo@2x.png',
        'image_size':   '40px',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://feeds.feedburner.com/IntelligentTransport'
        }
    },
    {
        'id': 'parkingmobility',
        'name': 'Parking Mobility',
        'type': ['article'],
        'image': 'https://www.parking-mobility.org/wp-content/themes/ipi/images/IPMI_LOGO-R_RGB_220x96.png',
        'image_size':   '30px',
        "newsletter": {
            'scrape_function': parking_mobility,
            'website': 'https://www.parking-mobility.org/news-publications/ipmi-blog/'
        }
    },
    {
        'id': 'humantransit',
        'name': 'Human Transit',
        'type': ['blog'],
        'image': 'https://humantransit.org/wp-content/uploads/HT-favicon@16x.png',
        'image_size':  '40px',
        "newsletter": {
            'scrape_function': rss_parser,
            'website': 'https://feeds.feedburner.com/humantransit/TCwW'
        }
    },
    {
        'id': 'metrospectives',
        'name': 'METROspectives',
        'type': ['podcast'],
        'image': 'https://fleetimages.bobitstudios.com/upload/podcasts/metrospectives'
                '/metrospectives-cover-__-315x315-r.png',
        'image_size':  '40px',
        "newsletter": {
            'scrape_function': rss_parser,
            'website': 'https://anchor.fm/s/18836658/podcast/rss'
        }
    },
    {
        'id': 'Axios',
        'name': 'Axios',
        'type': ['news'],
        'image': 'https://assets.axios.com/203e9f932cc97836ac2ff4c6c982676c.png',
        'image_size':   '50px',
        "newsletter": {
            'scrape_function': axios,
            'website': 'https://www.axios.com/economy-business/transportation/?page=1'
        }
    },
    {
        'id': 'spur',
        'name': 'Spur',
        'type': ['article'],
        'image': 'https://www.aaonetwork.org/sites/default/files/orgs_images/SPUR-only-Logo_black.gif',
        'image_size':   '60px',
        "newsletter": {
            'scrape_function': spur,
            'website': 'https://www.spur.org/news'
        }
    },
    {
        'id': 'thetransitauthority',
        'name': 'The Transit Authority',
        'type': ['podcast'],
        'image': 'https://media.glassdoor.com/sqll/264289/american-public-transportation-association-squarelogo.png',
        'image_size':   '40px',
        "newsletter": {
            'scrape_function': apple_parser,
            'website': 'https://podcasts.apple.com/us/podcast/the-transit-authority/id1512818062'
        }
    },
    {
        'id': 'themobilitypodcast',
        'name': 'The Mobility Podcast',
        'type': ['podcast'],
        'image': 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/74/07/46/7407463c-0bef-b30a-edb7-68915c5ade7c'
                 '/mza_6209235826687352097.jpg/1200x1200bb.jpg',
        'image_size':   '40px',
        "newsletter": {
            'scrape_function': apple_parser,
            'website': 'https://podcasts.apple.com/us/podcast/the-mobility-podcast/id1301517009'
        }
    },
    {
        'id': 'micromobilitynewsletter',
        'name': 'The Micromobility Newsletter',
        'type': ['blog'],
        'image': 'https://cdn.substack.com/image/fetch/w_96,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2'
                 'Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fb50394d7-f3de-45b5-'
                 '9087-542005d1cef0_256x256.png',
        'image_size':   '40px',
        "newsletter": {
            'scrape_function': rss_parser,
            'website': 'https://micromobility.substack.com/feed'
        }
    },
    {
        'id': 'micromobilitypodcast',
        'name': 'The Micromobility Podcast',
        'type': ['podcast'],
        'image': 'https://cdn.substack.com/image/fetch/w_96,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2'
                 'Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fb50394d7-f3de-45b5-'
                 '9087-542005d1cef0_256x256.png',
        'image_size':   '40px',
        "newsletter": {
            'scrape_function': micromobilitypodcast,
            'website': 'https://micromobility.io/podcast'
        }
    },
    {
        'id': 'zag',
        'name': 'Zag',
        'type': ['news'],
        'image': 'https://zagdaily.com/wp-content/uploads/2021/10/Zag-Daily.jpg',
        'image_size':   '40px',
        "newsletter": {
            'scrape_function': zag,
            'website': 'https://zagdaily.com/category/trends/'
        }
    },
    {
        'id': 'nyc_plannning',
        'name': 'NYC Planning',
        'type': ['jobs'],
        'image': 'https://planning-org-uploaded-media.s3.amazonaws.com/uploads/PROFILE_PHOTOS/95ba7dce-738f-465b-917a-e457760cb7b1.png',
        'image_size':   '40px',
        'jobs': {
            'scrape_function': nyc_planning_jobs,
            'website': 'https://www.nyc.gov/assets/planning/libs/JSON/Careers/careers.json'
        }
    },
    {
        'id': 'transloc',
        'name': 'transloc',
        'type': ['podcast'],
        'image': 'https://biz.prlog.org/transloc/logo.png',
        'image_size':   '40px',
        "newsletter": {
            'scrape_function': transloc,
            'website': 'https://transloc.com/the-movement-podcast/'
        }
    },
    {
        'id': 'commutifi',
        'name': 'Commutifi',
        'type': ['podcast'],
        'image': 'https://uploads-ssl.webflow.com/6006f47f5b6ed87abfdb7d41/6006f67241d3345f61b36142_logo-teal%402x.png',
        'image_size':   '20px',
        "newsletter": {
            'scrape_function': commutifi,
            'website': 'https://www.commutifi.com/category/podcast'
        }
    },
    {
        'id': 'carto',
        'name': 'Carto',
        'type': ['jobs'],
        'image': 'https://mma.prnewswire.com/media/695160/CARTO_Logo.jpg',
        'image_size':   '40px',
        'jobs': {
            'scrape_function': carto_jobs,
            'website': 'https://carto.com/careers/'
        }
    },
    {
        'id': 'beta_nyc',
        'name': 'Beta NYC',
        'type': ['jobs'],
        'image': 'https://beta.nyc/wp-content/uploads/BetaNYC-site-logo-33.png',
        'image_size':   '40px',
        'jobs': {
            'scrape_function': beta_nyc_jobs,
            'website': 'https://beta.nyc/category/newsletter/'
        }
    }
]
