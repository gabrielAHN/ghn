import Link from "next/link";
import { useState } from "react";
import { ExternalLink, ArrowRight, ChevronsDownUp, ChevronsUpDown } from "lucide-react";

function SmallProjects() {
  const [isListOpen, setIsListOpen] = useState(false);
  
  const works = [
    {
      id: "CitibikeDeepDive",
      label: "Citibike Deep Dive",
      url: "/citibike-deep-dive",
      external: false,
    },
    {
      id: "dogo-cam",
      label: "Dogo Cam 📹",
      url: "https://github.com/gabrielAHN/dogo-cam-project",
      external: true,
    },
  ];

  return (
    <div className="mt-4 border-2 rounded-md p-3 shadow-lg w-[45vh] mx-auto">
      <div 
        className="cursor-pointer hover:text-primary transition-colors text-2xl"
        onClick={() => setIsListOpen(!isListOpen)}
      >
        <div className="flex items-center justify-between">
          <span>Small Projects</span>
          {isListOpen ? (
            <ChevronsDownUp className="h-5 w-5" />
          ) : (
            <ChevronsUpDown className="h-5 w-5" />
          )}
        </div>
      </div>
      {isListOpen && (
        <div className="w-full p-2">
          <ul className="space-y-2">
            {works.map((work) => (
              <li key={work.id}>
                <Link
                  href={work.url}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 transition-colors"
                  {...(work.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <h1 className="text-xl">{work.label}</h1>
                  {work.external ? (
                    <ExternalLink className="h-4 w-4" />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SmallProjects;