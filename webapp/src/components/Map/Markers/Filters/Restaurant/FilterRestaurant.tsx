/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { readFromDataSet } from "../../../../Solid/ReadFromPod";
import { clearMarkers, ShowMarkersFromPromise } from "../../../OSMap";
import { filterByType } from "../Filter";
import "../FilterButton.css";

export function FilterRestaurant() {
  const [markers, setMarkers] = useState(readFromDataSet());
  return (
    <div id="div-restaurante">
      <button
        name="boton-restaurante"
        className="filter-button"
        onClick={async () => {
          clearMarkers();
          setMarkers(readFromDataSet());
          ShowMarkersFromPromise(filterByType(markers, "restaurant"));
        }}
      >
        <img
          className="filter-button-image"
          src="https://img.icons8.com/color/512/restaurant-.png"
        />
      </button>
    </div>
  );
}
