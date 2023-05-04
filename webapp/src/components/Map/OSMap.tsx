import "./OSMap.css";
import "leaflet/dist/leaflet.css";
import L, { LeafletMouseEvent } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import CommentsPage from "../CommentsPage/CommentsPage";
import { useState } from "react";
import FilterHamburger from "./Markers/Filters/Hamburger/FilterHamburger";
import FriendsPage from "./Markers/Filters/Friend/FriendsPage";
import { getMarkerIcon } from "./icon";
import MarkerInfo from "./Markers/Information/MarkerInfo";
import ReactLoading from "react-loading";
var map: L.Map;

export interface Marker {
  lat: number;
  lng: number;
  comment: string;
  title: string;
  type: string;
  score: number;
}

export function ShowMarkersFromPromise(promise: any, changeMarkerInfo: () => void, changeLoading: () => void) {
  promise.then((array: any) => {
    ShowMarkersFulfilledPromise(array, changeMarkerInfo, changeLoading);
  });
}

export function ShowMarkersFulfilledPromise(array: any[] | null, changeMarkerInfo: () => void, changeLoading: () => void) {
  if (array === null) return;
  array.forEach((element: any) => {
    let marker = L.marker([element.lat, element.lng], {
      icon: getMarkerIcon(element.type),
      draggable: false,
      title: element.title,
    });
    marker.addTo(map);
    marker.on('click', changeMarkerInfo);
  });
  changeLoading();
}

export function clearMarkers() {
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
}

export function OSMap() {
  const [markerForm, setMarkerForm] = useState(false);
  const [friendsFilter, setFriendsFilter] = useState(false);
  const [cords, setCords] = useState<number[]>([0, 0]);
  const [markerInfo, setMarkerInfo] = useState(false);
  const [marker, setMarker] = useState<Marker>();
  const [isLoading, setIsLoading] = useState(false);


  function cancelMarker() {
    setMarkerForm(false);
  }

  function changeFriendFilter() {
    setFriendsFilter(!friendsFilter);
  }
  
  function invertMarkerInfo(){
    setMarkerInfo(!markerInfo);
  }

  function changeMarkerInfo(event: LeafletMouseEvent) {
    setMarker(event.target);
    invertMarkerInfo();
  }

  function changeLoading(){
    setIsLoading((prevIsLoading) => {
      const newIsLoading = !prevIsLoading;
      return newIsLoading;
    });
  }

  function MyComponent() {
    map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setCords([lat, lng]);

        setMarkerForm(true);
      },
    });
    return null;
  }

  function submit(type: string) {
    let marker = L.marker([cords[0], cords[1]], {
      icon: getMarkerIcon(type),
      draggable: false,
    });

    marker.addTo(map);
    marker.on('click', changeMarkerInfo);

    setMarkerForm(false);
  }

  return (
    <div className="map" style={{ position: "relative", height: "65vh" }}>
    {isLoading && (
      <div className="loading">
        <ReactLoading type="spin" color="#000" height={50} width={50} />
      </div>
    )}
    <div>
        <div className="filters">
         <FilterHamburger changeLoading={changeLoading} changeFriendFilter={changeFriendFilter} changeMarkerInfo={changeMarkerInfo}/>
        </div>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "65vh", borderRadius: "inherit" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!markerForm && !friendsFilter && !markerInfo && <MyComponent />}
        </MapContainer>
        {markerForm && (
          <div className="comment">
            <CommentsPage
              key={markerForm}
              lat={cords}
              onSubmit={submit}
              onChange={cancelMarker}
            />
          </div>
        )}
        {markerInfo && (
          <div className="comment">
            <MarkerInfo
              marker={marker}
              onSubmit={submit}
              onChange={invertMarkerInfo}
            />
          </div>
        )}
        {friendsFilter && (
          <div className="comment">
            <FriendsPage changeLoading={changeLoading} changeMarkerInfo={changeMarkerInfo} onChange={changeFriendFilter}/>
          </div>
        )}
      </div>
    </div>
  );
}


