import { useEffect, useRef, useState } from 'react';
import _FeatureLayer from '@arcgis/core/layers/FeatureLayer';

import useMap from '../../hooks/useMap';

export interface FeatureLayerProps extends __esri.FeatureLayerProperties {
  index?: number;
}

const FeatureLayer = ({ index, ...props }: FeatureLayerProps) => {
  const initialProps = useRef(props);
  const [layer, setLayer] = useState<_FeatureLayer>();
  const { map } = useMap();

  useEffect(() => {
    const layer = new _FeatureLayer(initialProps.current);
    map?.add(layer, index);
    setLayer(layer);

    return () => {
      map?.remove(layer);
    };
  }, [index, map]);

  useEffect(() => {
    Object.keys(props).forEach(key =>
      layer?.set?.(key, props[key as keyof __esri.FeatureLayerProperties])
    );
  }, [layer, props]);

  return null;
};

export default FeatureLayer;
