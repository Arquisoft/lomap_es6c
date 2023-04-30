/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { readFromDataSet } from "../../../../Solid/ReadFromPod";
import { clearMarkers, ShowMarkersFromPromise } from "../../../OSMap";
import { filterByType } from "../Filter";
import "../FilterButton.css"

export function FilterMonument() {
    const [markers, setMarkers] = useState(readFromDataSet());
    return (
      <div>
        <button className="filter-button"
          onClick={async () => {
            clearMarkers();
            setMarkers(readFromDataSet());
            ShowMarkersFromPromise(filterByType(markers, "monument"));
          }}
        >
        <img className = "filter-button-image" src="https://cdn-icons-png.flaticon.com/512/1321/1321018.png" />
        </button>
      </div>
    );
  }