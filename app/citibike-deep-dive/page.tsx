"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

const CitibikeDeepDive = dynamic(() => import("./Components/index"), {
    ssr: true,
});

export default function Page() {
  return (
    <div className="p-5">
        <h1 className="text-2xl font-semibold text-center">Citibike 🚲 Deep Dive</h1>
        <div className="flex justify-center m-2">
          <Link
            href="/"
            className="text-base hover:[text-shadow:_0.5vh_0.4vh_0_rgb(255_220_44_/_100%)]"
          >
            Created by gabrielhn
          </Link>
        </div>
        <div className="flex justify-center mt-2">
          <Link href="https://github.com/gabrielAHN/Citibike-Deepdive" rel="noopener noreferrer" target="_blank">
            <Button variant="icon" className="flex items-center justify-center">
              <FaGithub className="h-16 w-16" />
            </Button>
          </Link>
        </div>
        <Suspense>
            <CitibikeDeepDive />
        </Suspense>
    </div>
  );
}