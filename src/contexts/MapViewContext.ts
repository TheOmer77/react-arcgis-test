import { createContext } from 'react';
import { IMapViewContext } from '../types/MapView';

const MapViewContext = createContext<IMapViewContext>({});

export default MapViewContext;
