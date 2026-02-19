import { useEffect, useMemo, useState } from "react";

export function getMapsFunction(data) {
  let Coordinates = Object.values(data.data)
    .filter(({ station_lat, station_lon }) => station_lat != null && station_lon != null)
    .map(({ station_lat, station_lon }) => ({
      lat: parseFloat(station_lat),
      lon: parseFloat(station_lon),
    }));

  if (Coordinates.length === 0) {
    return { lat: 0, lon: 0 };
  }

  const CenterData = findCenter(Coordinates);
  const BoundBox = getBoundingBox(Coordinates);

  return {
    CenterData: CenterData,
    BoundBox: BoundBox,
  };
}

export function findCenter(Coordinates) {
  const avgLat =
    Coordinates.reduce((sum, coord) => sum + coord.lat, 0) / Coordinates.length;
  const avgLon =
    Coordinates.reduce((sum, coord) => sum + coord.lon, 0) / Coordinates.length;
  return { lat: avgLat, lon: avgLon };
}

export function getBoundingBox(Coordinates) {
  let minLat = Infinity,
    maxLat = -Infinity,
    minLng = Infinity,
    maxLng = -Infinity;

  Coordinates.forEach(({ lat, lon }) => {
    minLat = Math.min(minLat, parseFloat(lat));
    maxLat = Math.max(maxLat, parseFloat(lat));
    minLng = Math.min(minLng, parseFloat(lon));
    maxLng = Math.max(maxLng, parseFloat(lon));
  });

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}

export const getProportionalSize = (TableData, SliderYear, SliderMonth) => {
    const totals = TableData.map(d => {
      try {
        const starts = d.json_col[SliderYear]?.months[SliderMonth]?.month_starts || 0;
        const ends = d.json_col[SliderYear]?.months[SliderMonth]?.month_ends || 0;
        return starts + ends;
      } catch (e) {
        return 0;
      }
    });

    const minTotal = Math.min(...totals);
    const maxTotal = Math.max(...totals);
    const totalRange = maxTotal - minTotal || 1;
    const minRadius = 4;
    const maxRadius = 20;

    return (d: any) => {
      try {
        const starts = d.json_col[SliderYear]?.months[SliderMonth]?.month_starts || 0;
        const ends = d.json_col[SliderYear]?.months[SliderMonth]?.month_ends || 0;
        const totalTrips = starts + ends;
        return minRadius + ((totalTrips - minTotal) / totalRange) * (maxRadius - minRadius);
      } catch (e) {
        return minRadius;
      }
    };
  }