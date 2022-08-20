import { useContext } from 'react';
import MapViewContext from '../contexts/MapViewContext';

const useMap = () => useContext(MapViewContext);

export default useMap;
