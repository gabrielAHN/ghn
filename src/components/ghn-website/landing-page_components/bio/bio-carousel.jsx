import { BIO_INFO } from './bio-data';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


export default function BioCarousel() {
    return (
        <div>
            {
                Object.entries(BIO_INFO).map(
                    ([key, value]) => {
                        return (
                            <Accordion
                                key={key}
                                style={{
                                    backgroundImage: `url(${value.photo})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ArrowDownwardIcon size='large' style={{ color: value.icon_color }} />}
                                    aria-controls="panel1-content"
                                    id={key}
                                    style={{ color: value.color }}
                                >
                                    <h1 sx={{ fontWeight: '900px' }}>{value.header}</h1>
                                </AccordionSummary>
                                <AccordionDetails style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                                    <div dangerouslySetInnerHTML={value.paragraph} />
                                </AccordionDetails>
                            </Accordion>
                        );
                    })
            }
        </div>
    );
}