import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import View from '@arcgis/core/views/MapView';
import esriConfig from '@arcgis/core/config';

import '@arcgis/core/assets/esri/themes/light/main.css';

esriConfig.apiKey = import.meta.env.VITE_ESRI_API_KEY;

const MapView = ({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new Map({
      basemap: 'arcgis-topographic',
    });
    const mapView = new View({
      map,
      center: [-118.805, 34.027],
      zoom: 13,
      container: containerRef.current,
    });

    return () => mapView.destroy();
  }, []);

  return (
    <div ref={containerRef} className={className || 'mapView'} {...props}>
      {children}
    </div>
  );
};

export default MapView;
