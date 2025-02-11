"use client";

import { useState, useEffect } from "react";

import Me from "@/assets/Home/me.png";
import Wulfz from "@/assets/Home/wulfz.gif";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Work from "./component/WorkSection";
import Bio from "./component/BioSection";

export default function Home() {
  const [count, setCount] = useState(0);
  const [photo, setPhoto] = useState(Me);

  useEffect(() => {
    if (count === 3) {
      setPhoto(Wulfz);
    } else if (count > 3) {
      setPhoto(Me);
      setCount(0);
    }
  }, [count]);

  const SectionData = [
    {
      id: "work",
      label: "Work",
      component: <Work />,
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
          <Link
            href={"https://github.com/gabrielAHN"}
            rel="noopener noreferrer"
            target="_blank"
            className="h-[20vh] w-20 mb-[10vh]"
          >
            <Button variant="icon" className="h-10">
              <FaGithub className="h-[20vh] w-[20vh]" />
            </Button>
          </Link>
          <Link
            href={"https://linkedin.com/in/gabriel-hidalgo-41742867"}
            rel="noopener noreferrer"
            target="_blank"
            className="h-[20vh] w-20 mb-[10vh]"
          >
            <Button variant="icon" className="h-10">
              <FaLinkedin className="h-[20vh] w-[20vh]" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="p-5 flex flex-col items-center justify-center">
        <Image
          priority
          src={photo}
          alt="Cities Lover icon"
          onClick={() => setCount(count + 1)}
          className="h-[42vh] w-[42vh] object-cover rounded-full"
        />
      </div>

      <div className="items-center justify-center w-full h-full text-center">
        <h1 className="font-extrabold text-4xl">Gabriel Hidalgo ~ Naranjo</h1>
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
  );
}
