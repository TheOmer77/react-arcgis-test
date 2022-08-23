import Graphic from './components/Graphic';
import GraphicsLayer from './components/layers/GraphicsLayer';
import MapView from './components/views/MapView';

const GraphicLayerExample = () => (
  <GraphicsLayer>
    <Graphic
      key='testPoint'
      geometry={{
        type: 'point',
        longitude: -118.80657463861,
        latitude: 34.0005930608889,
      }}
      symbol={{
        type: 'simple-marker',
        color: [226, 119, 40], // Orange
        outline: {
          color: [255, 255, 255], // White
          width: 1,
        },
      }}
    />
    <Graphic
      key='testLine'
      geometry={{
        type: 'polyline',
        paths: [
          [-118.821527826096, 34.0139576938577], //Longitude, latitude
          [-118.814893761649, 34.0080602407843], //Longitude, latitude
          [-118.808878330345, 34.0016642996246], //Longitude, latitude
        ],
      }}
      symbol={{
        type: 'simple-line',
        color: [226, 119, 40], // Orange
        width: 2,
      }}
    />
    <Graphic
      key='testPolygon'
      geometry={{
        type: 'polygon',
        rings: [
          [-118.818984489994, 34.0137559967283], //Longitude, latitude
          [-118.806796597377, 34.0215816298725], //Longitude, latitude
          [-118.791432890735, 34.0163883241613], //Longitude, latitude
          [-118.79596686535, 34.008564864635], //Longitude, latitude
          [-118.808558110679, 34.0035027131376], //Longitude, latitude
        ],
      }}
      symbol={{
        type: 'simple-fill',
        color: [227, 139, 79, 0.8], // Orange, opacity 80%
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      }}
    />
  </GraphicsLayer>
);

const App = () => {
  return (
    <>
      <MapView
        mapProps={{ basemap: 'arcgis-topographic' }}
        mapViewProps={{ center: [-118.805, 34.027], zoom: 13 }}
      >
        <GraphicLayerExample />
      </MapView>
    </>
  );
};

export default App;
