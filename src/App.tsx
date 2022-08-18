import MapView from './components/MapView';

const App = () => {
  return (
    <>
      <MapView
        mapProps={{ basemap: 'arcgis-topographic' }}
        mapViewProps={{ center: [-118.805, 34.027], zoom: 13 }}
      />
    </>
  );
};

export default App;
