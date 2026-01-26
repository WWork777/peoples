"use client";

import dynamic from "next/dynamic";

// Загружаем MapLeaf без SSR
const MapLeafNoSSR = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => <p>Загрузка карты...</p>, // опционально
});

const Map = () => {
  return <MapLeafNoSSR />;
};

export default Map;
