"use client";

import React, { useState, useMemo } from "react";
import {
  MapContainer,
  ImageOverlay,
  Rectangle,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import Link from "next/link";

const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

const houses = [
  {
    id: 1,
    name: "Двухэтажный дом с двумя спальнями",
    coords: [300, 250], // [Y, X]
    boxSize: [150, 100],
    price: "72 000 руб.",
  },
  {
    id: 2,
    name: "Двухэтажный дом с двумя спальнями",
    coords: [300, 420],
    boxSize: [150, 100],
    price: "72 000 руб.",
  },
  {
    id: 3,
    name: "Двухэтажный дом с двумя спальнями",
    coords: [260, 530],
    boxSize: [150, 100],
    price: "72 000 руб.",
  },
  {
    id: 4,
    name: "Двухэтажный дом с двумя спальнями",
    coords: [265, 710],
    boxSize: [150, 100],
    price: "72 000 руб.",
  },
  {
    id: 5,
    name: "Двухэтажный дом с двумя спальнями",
    coords: [300, 820],
    boxSize: [150, 100],
    price: "72 000 руб.",
  },
  // {
  //   id: 6,
  //   name: "Двухэтажное шале",
  //   coords: [300, 970],
  //   boxSize: [150, 100],
  //   price: "от 38 000 руб.",
  // },
];

function HousePopup({ position, name, onClose, price }) {
  return (
    <Popup position={position} onClose={onClose} autoClose>
      <strong>{name}</strong>
      <br />
      <strong>{price}</strong>
      <br />
      <button>
        <Link href="/#widget" style={{ color: "white" }}>
          Забронировать
        </Link>
      </button>
    </Popup>
  );
}

function FitImageBounds({ bounds }) {
  const map = useMap();

  React.useEffect(() => {
    map.fitBounds(bounds);
    setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(bounds);
    }, 100);
  }, [map, bounds]);

  return null;
}

export default function MapLeaf() {
  const [activePopup, setActivePopup] = useState(null);

  const IMAGE_WIDTH = 1239;
  const IMAGE_HEIGHT = 768;

  const { crs, mapBounds } = useMemo(() => {
    if (typeof window === "undefined") return {};

    const L = require("leaflet");

    return {
      crs: L.CRS.Simple,
      mapBounds: new L.LatLngBounds(
        [0, 0], // top-left
        [IMAGE_HEIGHT, IMAGE_WIDTH], // bottom-right
      ),
    };
  }, []);

  if (!crs || !mapBounds) return null;

  return (
    <div className="leaflet-map">
      <h2>РАСПОЛОЖЕНИЕ ДОМОВ</h2>
      <h3>Выберите и забронируйте</h3>

      <MapContainer
        crs={crs}
        maxBounds={mapBounds}
        maxBoundsViscosity={1}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        minZoom={isMobile ? -1 : 0} // 🔥 ВАЖНО
        maxZoom={1}
        className="map"
      >
        <FitImageBounds bounds={mapBounds} />
        <ImageOverlay url="/map.jpg" bounds={mapBounds} />

        {houses.map((house) => {
          const [h, w] = house.boxSize;

          const rectBounds = [
            [house.coords[0] - h / 2, house.coords[1] - w / 2],
            [house.coords[0] + h / 2, house.coords[1] + w / 2],
          ];

          return (
            <React.Fragment key={house.id}>
              <Rectangle
                bounds={rectBounds}
                pathOptions={{ color: "#70c3d6", weight: 1.5 }}
                eventHandlers={{
                  click: () => setActivePopup(house.id),
                }}
              />

              {activePopup === house.id && (
                <HousePopup
                  position={house.coords}
                  name={house.name}
                  price={house.price}
                  onClose={() => setActivePopup(null)}
                />
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
