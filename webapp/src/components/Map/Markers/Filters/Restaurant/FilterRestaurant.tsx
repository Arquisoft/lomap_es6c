/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { readFromDataSetUrl } from "../../../../Solid/ReadFromPod";
import { clearMarkers, ShowMarkersFulfilledPromise } from "../../../OSMap";
import { filterByType } from "../Filter";
import "../FilterButton.css";
import { getSessionWebID } from "../../../../Solid/Session";

export function FilterRestaurant(props: any) {
  const [markers,] = useState(readFromDataSetUrl(getSessionWebID().webId));

  const loadRestaurants = async () => {
    clearMarkers();
    ShowMarkersFulfilledPromise(await filterByType(markers, "restaurant"), props.changeMarkerInfo, props.changeLoading);
  };
  
  return (
    <div>
      <button
        name="boton-restaurante"
        className="filter-button"
        onClick={() => {
          props.changeLoading();
          loadRestaurants();
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
