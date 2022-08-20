import {
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import _GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

import useMap from '../../hooks/useMap';

interface GraphicsLayerProps extends __esri.GraphicsLayerProperties {
  children?: ReactNode;
}

const GraphicsLayer = ({
  children: _children,
  ...props
}: GraphicsLayerProps) => {
  // const ref = useRef<_GraphicsLayer>();
  const [layer, setLayer] = useState<_GraphicsLayer>();
  const { map } = useMap();

  const children: ReactNode[] = Array.isArray(_children)
    ? _children
    : [_children];

  useEffect(() => {
    const layer = new _GraphicsLayer();
    map?.add(layer);
    setLayer(layer);

    return () => {
      map?.remove(layer);
    };
  }, [map]);

  useEffect(() => {
    Object.keys(props).forEach(key =>
      layer?.set?.(key, props[key as keyof __esri.GraphicsLayerProperties])
    );
  }, [layer, props]);

  return (
    <>
      {children.map(child =>
        isValidElement(child)
          ? cloneElement(child, { graphicsLayer: layer })
          : null
      )}
    </>
  );

  return null;
};

export default GraphicsLayer;
