import BioAccordion from "./component/BioAccordion";
import BioMap from "./component/BioMap";


export default function Bio() {
    return (
        <>
            <a
                className="text-base hover:[text-shadow:_0.5vh_0.4vh_0_rgb(255_220_44_/_100%)]"
                target='_blank'
                href="https://ghn-public-data.s3.amazonaws.com/website/website_resume.pdf"
                rel="noreferrer"
            >
                For the longer version📜 aka resume
            </a>
            <div className="sm:hidden">
                <BioAccordion />
            </div>
            <div className="hidden sm:block">
                <BioMap />
            </div>
        </>
    );

}