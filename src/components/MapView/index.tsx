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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new Map(mapProps);
    const mapView = new View({
      ...mapViewProps,
      map,
      container: containerRef.current,
    });

    return () => mapView.destroy();
  }, [mapProps, mapViewProps]);

  return (
    <div ref={containerRef} className={className} {...props}>
      {children}
    </div>
  );
};

export default MapView;
