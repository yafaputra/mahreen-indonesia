'use client';

import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapPin, ZoomIn, ZoomOut, Compass } from 'lucide-react';

// Bounding box strictly locked to the territory of the Republic of Indonesia
// (Sabang to Merauke, Miangas to Rote)
const INDONESIA_BOUNDS = [
  [6.5, 94.5],   // North-West (Aceh / Sabang)
  [-11.5, 141.5], // South-East (Rote / Merauke)
];

// Pure, crisp OpenStreetMap tile configuration
const OSM_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

export default function LeafletIndonesiaMap({ hubs = [], activeHub, onSelectHub }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  // Initialize Leaflet Map on mount
  useEffect(() => {
    let isMounted = true;

    // Dynamically load leaflet on the client only to avoid SSR window errors
    import('leaflet').then((L) => {
      if (!isMounted || !mapContainerRef.current) return;
      if (mapInstanceRef.current) return;

      // Create Leaflet Map Instance strictly bounded to Indonesia
      const map = L.map(mapContainerRef.current, {
        center: [-2.5, 118.0], // Center of Indonesian Archipelago
        zoom: 5,
        minZoom: 4.5,
        maxZoom: 12,
        maxBounds: INDONESIA_BOUNDS,
        maxBoundsViscosity: 1.0, // Bounce back if dragged outside Indonesia
        zoomControl: false,
        scrollWheelZoom: false,
      });

      // Add ONLY OpenStreetMap Tile Layer
      L.tileLayer(OSM_URL, {
        attribution: OSM_ATTRIBUTION,
        subdomains: 'abc',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Render custom pins for all hubs
      hubs.forEach((hub) => {
        const customIcon = L.divIcon({
          className: 'custom-mahreen-marker',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer group">
              <span class="absolute w-7 h-7 rounded-full bg-orange-500/25 animate-ping"></span>
              <div class="w-5 h-5 rounded-full bg-orange-700 border-2 border-white shadow-md flex items-center justify-center text-white transition-transform duration-200 hover:scale-125">
                <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
              <div class="absolute -top-7 px-2 py-0.5 rounded bg-zinc-900 text-white text-[9px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                ${hub.name.split(',')[0]}
              </div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker([hub.lat, hub.lng], { icon: customIcon }).addTo(map);

        marker.on('click', () => {
          if (onSelectHub) {
            onSelectHub(hub);
          }
        });

        markersRef.current[hub.id] = marker;
      });
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update active hub position and highlight
  useEffect(() => {
    if (!mapInstanceRef.current || !activeHub) return;

    mapInstanceRef.current.flyTo([activeHub.lat, activeHub.lng], 7, {
      duration: 1.2,
      easeLinearity: 0.25,
    });
  }, [activeHub]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleResetBounds = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([-2.5, 118.0], 5, { duration: 1.0 });
    }
  };

  return (
    <div className="relative w-full h-[370px] sm:h-[430px] rounded-2xl overflow-hidden border border-zinc-200/90 shadow-inner bg-zinc-100">
      {/* 1. LEAFLET MAP DOM MOUNT POINT */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* 2. CUSTOM ZOOM & NAVIGATION CONTROLS */}
      <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1.5">
        <button
          onClick={handleResetBounds}
          className="p-2 rounded-xl bg-white/95 hover:bg-white text-zinc-700 hover:text-terracotta-700 border border-zinc-200 shadow-sm transition-colors cursor-pointer"
          title="Reset Tampilan Seluruh Indonesia"
        >
          <Compass className="w-4 h-4 text-terracotta-700" />
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-xl bg-white/95 hover:bg-white text-zinc-700 hover:text-terracotta-700 border border-zinc-200 shadow-sm transition-colors cursor-pointer"
          title="Perbesar Peta"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-xl bg-white/95 hover:bg-white text-zinc-700 hover:text-terracotta-700 border border-zinc-200 shadow-sm transition-colors cursor-pointer"
          title="Perkecil Peta"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* 3. ACTIVE HUB COORDINATE TAG (BOTTOM LEFT) */}
      {activeHub && (
        <div className="absolute bottom-3 left-3 z-10 bg-white/95 px-3 py-1.5 rounded-xl border border-zinc-200 text-[11px] text-zinc-700 font-medium shadow-sm flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-terracotta-600 shrink-0" />
          <span>
            Sentra Terpilih: <strong>{activeHub.name}</strong> ({activeHub.province})
          </span>
          <span className="font-mono text-[10px] text-zinc-400 border-l border-zinc-200 pl-2">
            {activeHub.lat.toFixed(2)}°, {activeHub.lng.toFixed(2)}°
          </span>
        </div>
      )}
    </div>
  );
}
