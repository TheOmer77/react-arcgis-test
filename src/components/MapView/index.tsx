import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import View from '@arcgis/core/views/MapView';
import esriConfig from '@arcgis/core/config';

import '@arcgis/core/assets/esri/themes/light/main.css';

esriConfig.apiKey = import.meta.env.VITE_ESRI_API_KEY;

interface MapViewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  mapProps: __esri.MapProperties;
  mapViewProps: __esri.MapViewProperties;
}

const MapView = ({
  mapProps,
  mapViewProps,
  children,
  className = 'mapView',
  ...props
}: MapViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null),
    mapRef = useRef<Map>(),
    mapViewRef = useRef<View>();

  useEffect(() => {
    if (!containerRef.current) return;

    mapRef.current = new Map();
    mapViewRef.current = new View({
      map: mapRef.current,
      container: containerRef.current,
    });

    return () => mapViewRef.current?.destroy();
  }, []);

  useEffect(() => {
    Object.keys(mapProps).forEach(key =>
      mapRef.current?.set?.(key, mapProps[key as keyof __esri.MapProperties])
    );
  }, [mapProps]);

  useEffect(() => {
    Object.keys(mapViewProps).forEach(key =>
      mapViewRef.current?.set?.(
        key,
        mapViewProps[key as keyof __esri.MapViewProperties]
      )
    );
  }, [mapViewProps]);

  return (
    <div ref={containerRef} className={className} {...props}>
      {children}
    </div>
  );
};

export default MapView;
