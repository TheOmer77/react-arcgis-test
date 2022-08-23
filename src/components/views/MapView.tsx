import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import Map from '@arcgis/core/Map';
import View from '@arcgis/core/views/MapView';
import esriConfig from '@arcgis/core/config';

import '@arcgis/core/assets/esri/themes/light/main.css';
import MapViewContext from '../../contexts/MapViewContext';

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
  const initialMapProps = useRef(mapProps),
    initialMapViewProps = useRef(mapViewProps);
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>(),
    [mapView, setMapView] = useState<View>();

  useEffect(() => {
    if (!containerRef.current) return;

    const newMap = new Map(initialMapProps.current);
    const newMapView = new View({
      ...initialMapViewProps.current,
      map: newMap,
      container: containerRef.current,
    });

    setMap(newMap);
    setMapView(newMapView);

    return () => newMapView.destroy();
  }, []);

  useEffect(() => {
    Object.keys(mapProps).forEach(key =>
      map?.set?.(key, mapProps[key as keyof __esri.MapProperties])
    );
  }, [map, mapProps]);

  useEffect(() => {
    Object.keys(mapViewProps).forEach(key =>
      mapView?.set?.(key, mapViewProps[key as keyof __esri.MapViewProperties])
    );
  }, [mapView, mapViewProps]);

  return (
    <div ref={containerRef} className={className} {...props}>
      <MapViewContext.Provider value={{ map, mapView }}>
        {children}
      </MapViewContext.Provider>
    </div>
  );
};

export default MapView;
