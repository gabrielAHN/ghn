import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Image } from "@unpic/react"
import { OptimizedVideo } from "@/components/OptimizedVideo"
import Bio from "@/sections/BioSection"
import SmallProjects from "@/sections/SmallProjects"
import Work from "@/sections/WorkSection"

import MeImg from "@/assets/me.webp"
import WulfzVideo from "@/assets/wulfz.webm"

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [count, setCount] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if (count === 3) {
      setShowVideo(true)
    } else if (count > 3) {
      setShowVideo(false)
      setCount(0)
    }
  }, [count])

  const SectionData = [
    {
      id: "work",
      label: "Work",
      component: <Work />,
    },
    {
      id: "small-projects",
      component: <SmallProjects />,
    },
    {
      id: "bio",
      label: "Bio",
      component: <Bio />,
    },
    {
      id: "contact",
      label: "Contact",
      component: (
        <div>
          <a
            href="https://github.com/gabrielAHN"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button variant="icon">
              <FaGithub className="h-20 w-20" />
            </Button>
          </a>
          <a
            href="https://linkedin.com/in/gabriel-hidalgo-41742867"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button variant="icon">
              <FaLinkedin className="h-20 w-20" />
            </Button>
          </a>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full h-full">
      <div className="p-5 flex flex-col items-center justify-center">
        <div
          onClick={() => setCount(count + 1)}
          className="max-w-[45vh] max-h-[45vh] min-h-[23em] min-w-[23em] cursor-pointer"
        >
          {showVideo ? (
            <OptimizedVideo
              src={WulfzVideo}
              alt="Cities Lover icon"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Image
              src={MeImg}
              alt="Cities Lover icon"
              className="w-full h-full object-cover rounded-full"
              loading="eager"
              layout="fullWidth"
            />
          )}
        </div>
      </div>
      <div className="items-center justify-center w-full h-full text-center">
        <h1 className="font-extrabold text-4xl">Gabriel Hidalgo</h1>
        <h4 className="text-xl">Art 🧑‍🎨, Cities 🌇, and Tech 🦾</h4>
        <div className="mt-5 mb-5">
          {SectionData.map((section) => (
            <a
              key={section.id}
              className="mx-2 text-3xl font-semibold hover:[text-shadow:_0.5vh_0.4vh_0_rgb(255_220_44_/_100%)]"
              href={`#${section.id}`}
            >
              {section.label}
            </a>
          ))}
        </div>
        <div>
          {SectionData.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="text-3xl font-semibold mb-5"
            >
              <h1>{section.label}</h1>
              {section.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
