import Image from "next/image";

import GtfsViz from "@/assets/Work/gtfs-viz.png";
import GtfsVizGif from "@/assets/Work/gtfs-viz.gif";
import CitiesLover from "@/assets/Work/citieslover.png";
import CitiesLoverGif from "@/assets/Work/citieslover-hover.gif";

const WorkData = [
  {
    id: "GTFSViz",
    label: "GTFS Viz",
    photo: GtfsViz,
    gif: GtfsVizGif,
    url: "https://gtfs-viz-production-f1a4.up.railway.app/",
  },
  {
    id: "CitiesLover",
    label: "CitiesLover 💚",
    photo: CitiesLover,
    gif: CitiesLoverGif,
    url: "https://citieslover.com/intro",
  },
];

function Work() {
  return (
    <div className="mt-4 flex flex-wrap gap-1 items-center justify-center">
      {WorkData.map((work) => (
        <div
          key={work.id}
          onClick={() =>
            window.open(work.url, "_blank", "noopener,noreferrer")
          }
          className="
            group
            
            mb-5
            relative
            w-[50vh] 
            h-[25vh]
            overflow-hidden 
            rounded-md 
            shadow-md 
            transition-transform 
            duration-300 
            hover:scale-110
            z-0 hover:z-10
            cursor-pointer
          "
        >
          <Image
            src={work.photo}
            alt={work.label}
            className="
              w-full
              h-full 
              object-cover 
              transition-opacity 
              duration-300
              group-hover:opacity-0
            "
          />
          <div
            className="
              absolute 
              inset-0 
              flex 
              items-center 
              justify-center
              transition-opacity
              duration-300
              group-hover:opacity-0
              bg-black/50
              text-white
              text-3xl
              font-bold
            "
          >
            <span className=" px-4 py-2 ">{work.label}</span>
          </div>
          <Image
            src={work.gif}
            alt={work.label}
            className="
              absolute 
              inset-0 
              object-cover 
              transition-opacity 
              duration-300 
              opacity-0 
              group-hover:opacity-100
            "
          />
        </div>
      ))}
    </div>
  );
}

export default Work;
