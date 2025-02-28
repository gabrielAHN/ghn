"use client";

import { useCallback, useMemo } from "react";
import { FlyToInterpolator } from "@deck.gl/core";

import { MoveLeft, MoveRight } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { BIO_INFO } from "../BioData";

function MapInfo({ state, setState }) {
    const CountryList = useMemo(() => Object.keys(BIO_INFO), []);
    const MapClick = useCallback(
        (increment) => {
            setState((prevState) => {
                const newButtonState =
                    (prevState.buttonState + increment + CountryList.length) %
                    CountryList.length;
                return {
                    ...prevState,
                    buttonState: newButtonState,
                    viewState: {
                        ...BIO_INFO[CountryList[newButtonState]].view,
                        pitch: 0,
                        bearing: 0,
                        transitionDuration: 5000,
                        transitionInterpolator: new FlyToInterpolator(),
                    },
                };
            });
        },
        [CountryList, setState]
    );

    const CountryInfo = BIO_INFO[CountryList[state.buttonState]];

    return (
        <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-white h-full" />
            <div
                className="
                    absolute z-10 top-5 left-5
                    flex flex-col
                    h-[11em]
                    w-[40%]
                    rounded-lg p-4 text-center
                    bg-white bg-opacity-50
                    "
            >
                <h2 className="mb-4 font-bold">{CountryInfo.header}</h2>
                <div
                    className="
                        flex-1 
                        mb-4 
                        max-w-3xl 
                        leading-relaxed 
                        text-sm 
                        overflow-y-auto
                    "
                    dangerouslySetInnerHTML={CountryInfo.paragraph}
                />
                <div className="mt-auto flex justify-center gap-2">
                    <Button
                        variant="icon"
                        disabled={state.buttonState === 0}
                        onClick={() => MapClick(-1)}
                    >
                        <MoveLeft />
                    </Button>
                    <Button
                        variant="icon"
                        disabled={state.buttonState === CountryList.length - 1}
                        onClick={() => MapClick(1)}
                    >
                        <MoveRight />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MapInfo;
