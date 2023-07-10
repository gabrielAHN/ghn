from citylover.scrapers.newsletter_scrapers import (
    rss_parser, apple_parser, allthingsurban,
    govtech, transitcenter, streetsblog, parking_mobility,
    axios, spur, micromobilitypodcast,
    zag, transloc, commutifi, electronomous
)
from citylover.scrapers.jobs_scrapers import (
    planetizen_jobs, allthingsurban_jobs,
    apany_jobs, govlove_jobs, beta_nyc_jobs,
    nyc_planning_jobs, carto_jobs, transitcenter_job,
    uber_jobs, mobilitydata_jobs, citymapper_jobs, 
    lever_jobs, smartgrowamerica_jobs,
    greenhouse_jobs, lever_jobs, optibus_jobs,
    ito_jobs, voi_jobs
)


website_info = [
    {
        'id': 'citymapper',
        'name': 'Citymapper',
        'type': ['job'],
        'image_size':   '60px',
        'image': 'https://logovectorseek.com/wp-content/uploads/2020/11/citymapper-logo-vector.png',
        'jobs': {
            'scrape_function': citymapper_jobs,
            'website': 'https://apply.workable.com/api/v3/accounts/citymapper/jobs',
        }
    },
    {
        'id': 'planetizen',
        'name': 'Planetizen',
        'type': ['news', 'job'],
        'image_size':   '120px',
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
        'image_size':   '115px',
        'image': 'https://thecityfixlearn.org/sites/default/files/18_Logo_TheCityFix_Learn.png',
        'newsletter': {
            'scrape_function': rss_parser,
            'website': 'https://feeds.feedburner.com/thecityfix/posts'
        }
    },
    {
        'id': 'allthingsurban',
        'name': 'All Things Urban',
        'type': ['blog', 'job'],
        'image_size':   '115px',
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
                'scrape_function': apple_parser,
                'website': 'https://podcasts.apple.com/us/podcast/the-urbanist/id474763572'
        }
    },
    {
        'id': 'smartcities',
        'name': 'Smartcities',
        'type': ['news'],
        'image': 'https://leadingcities2014.files.wordpress.com/2019/09/smartcities_logo_black.png',
        'image_size':   '130px',
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
        'image_size':   '135px',
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
        'image_size':   '130px',
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
        'type': ['podcast', 'job'],
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
        'type': ['job'],
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
        'image_size':   '130px',
        'newsletter': {
            'scrape_function': govtech,
            'website': 'https://www.govtech.com/transportation/'
        }
    },
    {
        'id': 'transitcenter',
        'name': 'Transitcenter',
        'type': ['blog', 'job'],
        'image': 'https://d3n8a8pro7vhmx.cloudfront.net/circulatesd/pages/1101/attachments/original/1553274530/transit-center-logo.png?1553274530',
        'image_size':   '130px',
        'newsletter': {
            'scrape_function': transitcenter,
            'website': 'https://transitcenter.org/blog/'
        },
        'jobs': {
            'scrape_function': transitcenter_job,
            'website': 'https://transitcenter.org/careersattransitcenter/'
        }
    },
    {
        'id': 'streetsblog',
        'name': 'Streetsblog',
        'type': ['blog'],
        'image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm06X4'
        '-kgmtexgJpGSv8RLLBu86D7KkMISeaSVNP1vNtn7nggAIg&s',
        'image_size':   '120px',
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
        'image_size':   '120px',
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
        'image_size':   '120px',
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
        'image_size':  '90px',
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
        'image_size':   '70px',
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
        'type': ['job'],
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
        'image_size':   '130px',
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
        'image_size':   '130px',
        "newsletter": {
            'scrape_function': commutifi,
            'website': 'https://www.commutifi.com/category/podcast'
        }
    },
    {
        'id': 'carto',
        'name': 'Carto',
        'type': ['job'],
        'image': 'https://mma.prnewswire.com/media/695160/CARTO_Logo.jpg',
        'image_size':   '40px',
        'jobs': {
            'scrape_function': carto_jobs,
            'website': 'https://carto.com/careers/'
        }
    },
    {
        'id': 'cityage_podcast',
        'name': 'The CityAge Podcast',
        'type': ['podcast'],
        'image': 'https://m.media-amazon.com/images/I/51-1+SKPvCL._SL500_.jpg',
        'image_size':   '90px',
        'newsletter': {
            'scrape_function': apple_parser,
            'website': 'https://podcasts.apple.com/ca/podcast/the-cityage-podcast/id1621156635'
        }
    },
    {
        'id': 'uber',
        'name': 'Uber',
        'type': ['job'],
        'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/640px-Uber_logo_2018.png',
        'image_size':   '90px',
        'jobs': {
            'scrape_function': uber_jobs,
            'website': 'https://www.uber.com/api/loadSearchJobsResults?localeCode=en'
        }
    },
    {
        'id': 'via',
        'name': 'Via',
        'type': ['job', 'podcast'],
        'image': 'https://assets-global.website-files.com/609196881a69bf7486cbfd01/60919d5d15b7324b8aa8d9d8_via-logo.svg',
        'image_size':   '90px',
        'newsletter': {
            'scrape_function': apple_parser,
            'website': 'https://podcasts.apple.com/us/podcast/modeshift/id1644748349'
        },
        'jobs': {
            'scrape_function': greenhouse_jobs,
            'website': 'https://boards.greenhouse.io/via'
        }
    },
    {
        'id': 'modernmobility',
        'name': 'Modern Mobility Podcast',
        'type': ['podcast'],
        'image': 'https://deow9bq0xqvbj.cloudfront.net/image-logo/11422003/ModMob_Podcast_Cover_Art-headphones-resized.jpg',
        'image_size':   '90px',
        'newsletter': {
            'scrape_function': apple_parser,
            'website': 'https://podcasts.apple.com/us/podcast/the-modern-mobility-podcast/id1559679341'
        }
    },
    {
        'id': 'mobilitydata',
        'name': 'Mobility Data',
        'type': ['job'],
        'image': 'https://mobilitydata.org/app/uploads/2021/04/cropped-flaticon_logo-18.png',
        'image_size':   '90px',
        'jobs': {
            'scrape_function': mobilitydata_jobs,
            'website': 'https://careers.mobilitydata.org/?_gl=1*stwnoe*_ga*MTk2MDgxODQ5MS4xNjgwODg5NzYw*_ga_55GPMF0W9Z*MTY4MjczNzU3MC4xMC4xLjE2ODI3Mzc1NzAuMC4wLjA.'
        }
    },
    {
        'id': 'goswift',
        'name': 'Swiftly',
        'type': ['job'],
        'image': 'https://store.lmknowledgehub.com/storage/swift/G1lc1nfABW8ZhO2Kdu0WP2o0TqbqN8CVnjoquQn8.png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': lever_jobs,
            'website': 'https://jobs.lever.co/goswift'
        }
    },
    {
        'id': 'smartgrowthamerica',
        'name': 'Smart Growth America',
        'type': ['job'],
        'image': 'https://smartgrowthamerica.org/wp-content/uploads/2021/08/SGA_logo_card.png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': smartgrowamerica_jobs,
            'website': 'https://smartgrowthamerica.org/about-us/careers/'
        }
    },
    {
        'id': 'nlc',
        'name': 'National League of Cities',
        'type': ['podcast'],
        'image': 'https://upload.wikimedia.org/wikipedia/en/0/00/National_League_of_Cities_logo.png',
        'image_size': '90px',
        'newsletter': {
            'scrape_function': apple_parser,
            'website': 'https://podcasts.apple.com/us/podcast/citiesspeak-with-clarence-anthony/id1635203625'
        }
    },
    {
        'id': 'electronomous',
        'name': 'Electronomous',
        'type': ['news'],
        'image': 'https://www.showsbee.com/newmaker/www/u/2022/20225/com_img/Electronomous-logo.png',
        'image_size': '90px',
        'newsletter': {
            'scrape_function': electronomous,
            'website': 'https://www.electronomous.com/news/'
        }
    },
    {
        'id': 'betanyc',
        'name': 'Beta NYC',
        'type': ['job'],
        'image': 'https://beta.nyc/wp-content/uploads/BetaNYC-site-logo-33.png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': beta_nyc_jobs,
            'website': 'https://beta.nyc/blog/'
        }
    },
    {
        'id': 'revel',
        'name': 'Revel',
        'type': ['job'],
        'image': 'https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/075/500/resized/revel_greenhouse.png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': greenhouse_jobs,
            'website': 'https://boards.greenhouse.io/revel'
        }
    },
    {
        'id': 'streetlightdata',
        'name': 'Street Light Data',
        'type': ['job'],
        'image': 'https://lever-client-logos.s3.amazonaws.com/0046318a-573c-41a8-8de0-52fda3259340-1546914822777.png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': lever_jobs,
            'website': 'https://jobs.lever.co/streetlightdata'
        }
    },
    {
        'id': 'lime',
        'name': 'Lime',
        'type': ['job'],
        'image': 'https://lever-client-logos.s3.amazonaws.com/04d69456-1062-431c-bf70-177b55749515-1571247003987.png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': lever_jobs,
            'website': 'https://jobs.lever.co/lime'
        }
    },
    {
        'id': 'urbanfootprint',
        'name': 'Urban Footprint',
        'type': ['job'],
        'image': 'https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/646/400/resized/UF_Logo_-_1200x628_(1).png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': greenhouse_jobs,
            'website': 'https://boards.greenhouse.io/urbanfootprint'
        }
    },
    {
        'id': 'mbta',
        'name': 'MBTA',
        'type': ['job'],
        'image': 'https://lever-client-logos.s3-us-west-2.amazonaws.com/753da791-a783-4cb5-b37d-ce85a22dc7bd-1596468426966.png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': lever_jobs,
            'website': 'https://jobs.lever.co/mbta/'
        }
    },
    {
        'id': 'optibus',
        'name': 'Optibus',
        'type': ['job'],
        'image': 'https://www.optibus.com/wp-content/uploads/2021/12/optibus-dark-logo.svg',
        'image_size': '90px',
        'jobs': {
            'scrape_function': optibus_jobs,
            'website': 'https://www.optibus.com/company/careers/jobs/'
        }
    },
    {
        'id': 'itoworld',
        'name': 'Ito World',
        'type': ['job'],
        'image': 'https://www.itoworld.com/wp-content/uploads/2019/09/logo-2019-01-e1624962387164.png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': ito_jobs,
            'website': 'https://itoworld.bamboohr.com/careers/list'
        }
    },
    {
        'id': 'voi',
        'name': 'Voi',
        'type': ['job'],
        'image': 'https://www.voi.com/wp-content/uploads/2019/07/voi_logo_coral.png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': voi_jobs,
            'website': 'https://careers.voi.com/jobs?department=Research+%26+Development&query='
        }
    },
    {
        'id': 'tier',
        'name': 'Tier',
        'type': ['job'],
        'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/TIER_Mobility_Logo_%28blau%2C_2021%29.svg/1200px-TIER_Mobility_Logo_%28blau%2C_2021%29.svg.png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': greenhouse_jobs,
            'website': 'https://boards.greenhouse.io/tiermobility'
        }
    },
    {
        'id': 'veo',
        'name': 'Veo',
        'type': ['job'],
        'image': 'https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/297/800/resized/veo_logo_black.png?1622840779',
        'image_size': '90px',
        'jobs': {
            'scrape_function': greenhouse_jobs,
            'website': 'https://boards.greenhouse.io/veocorporatecareers'
        }
    },
    {
        'id': 'populus',
        'name': 'Populus',
        'type': ['job'],
        'image': 'https://images.squarespace-cdn.com/content/v1/5fc6dab681da8a590dace76d/1608170071061-NYJKZQQBQHK4IHASGYNR/Populus_SecondaryLogo_Dark.png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': greenhouse_jobs,
            'website': 'https://boards.greenhouse.io/populus'
        }
    },
    {
        'id': 'blablacar',
        'name': 'Blablacar',
        'type': ['job'],
        'image': 'https://lever-client-logos.s3.us-west-2.amazonaws.com/e3520345-0a28-449b-8485-23082ade0c1f-1623869719522.png',
        'image_size': '90px',
        'jobs': {
            'scrape_function': lever_jobs,
            'website': 'https://jobs.lever.co/blablacar'
        }
    }
]
