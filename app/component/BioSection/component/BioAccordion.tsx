import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { BIO_INFO } from "./BioData";
import Image from "next/image";

export default function BioAccordion() {
    return (
        <Accordion type="single" collapsible className="items-center justify-center p-5">
            {Object.entries(BIO_INFO).map(([key, value]) => (
                <AccordionItem
                    key={key}
                    value={key}
                    className="relative overflow-hidden p-3 rounded-md"
                >
                    <div className="absolute inset-0 -z-10 ">
                        <Image
                            src={value.photo}
                            alt={`Background for ${value.header}`}
                            fill
                            priority={false}
                            className="object-cover object-center"
                        />
                    </div>
                    <AccordionTrigger
                        aria-controls="panel1-content"
                        id={key}
                        style={{ color: value.color }}
                        className="text-4xl font-semibold px-4 py-2 h-[10vh]"
                    >
                        {value.header}
                    </AccordionTrigger>
                    <AccordionContent className="bg-white/80 px-4 py-2 rounded-md text-base">
                        <div
                            dangerouslySetInnerHTML={{ __html: value.paragraph.__html }}
                        />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
