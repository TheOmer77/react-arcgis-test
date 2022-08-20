import { useEffect, useRef } from 'react';
import _Graphic from '@arcgis/core/Graphic';

interface GraphicProps extends __esri.GraphicProperties {
  geometry: __esri.GeometryProperties;
  graphicsLayer?: __esri.GraphicsLayer;
}

const Graphic = ({ graphicsLayer, ...props }: GraphicProps) => {
  const ref = useRef<_Graphic>();

  useEffect(() => {
    ref.current = new _Graphic();
    graphicsLayer?.add(ref.current);

    return () => {
      if (!ref.current) return;
      graphicsLayer?.remove(ref.current);
    };
  }, [graphicsLayer]);

  useEffect(() => {
    Object.keys(props).forEach(key =>
      ref.current?.set?.(key, props[key as keyof __esri.GraphicProperties])
    );
  }, [props]);

  return null;
};

export default Graphic;
