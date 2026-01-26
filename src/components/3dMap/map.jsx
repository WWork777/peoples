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
    coords: [300, 250],
    boxSize: [150, 100],
    price: "от 14 000 руб.",
  },
  {
    id: 2,
    name: "Двухэтажный дом с двумя спальнями",
    coords: [300, 420],
    boxSize: [150, 100],
    price: "от 14 000 руб.",
  },
  {
    id: 3,
    name: "Двухэтажный дом с двумя спальнями",
    coords: [260, 530],
    boxSize: [150, 100],
    price: "от 14 000 руб.",
  },
  {
    id: 4,
    name: "Двухэтажный дом с двумя спальнями",
    coords: [265, 710],
    boxSize: [150, 100],
    price: "от 14 000 руб.",
  },
  {
    id: 5,
    name: "Двухэтажный дом с двумя спальнями",
    coords: [300, 820],
    boxSize: [150, 100],
    price: "от 14 000 руб.",
  },
];

function HousePopup({ position, name, price, onClose }) {
  return (
    <Popup position={position} onClose={onClose} autoClose>
      <strong style={{ fontFamily: "montserrat" }}>{name}</strong>
      <br />
      <strong style={{ fontFamily: "montserrat" }}>{price}</strong>
      <br />
      <button>
        <Link
          href="/#widget"
          style={{ color: "white", fontFamily: "montserrat" }}
        >
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
      mapBounds: new L.LatLngBounds([0, 0], [IMAGE_HEIGHT, IMAGE_WIDTH]),
    };
  }, []);

  if (!crs || !mapBounds) return null;

  return (
    <div className="leaflet-map">
      <div className="map-wrapper">
        {/* 🔥 Заголовок поверх карты */}

        <MapContainer
          crs={crs}
          maxBounds={mapBounds}
          maxBoundsViscosity={1}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          minZoom={isMobile ? -1 : 0}
          maxZoom={1}
          className="map"
        >
          <div className="map-title">
            <h2>РАСПОЛОЖЕНИЕ ДОМОВ</h2>
            <h3>Выберите и забронируйте</h3>
          </div>
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
    </div>
  );
}
