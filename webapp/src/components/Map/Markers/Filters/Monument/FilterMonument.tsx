/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { readFromDataSetUrl} from "../../../../Solid/ReadFromPod";
import { clearMarkers, ShowMarkersFromPromise } from "../../../OSMap";
import { filterByType } from "../Filter";
import "../FilterButton.css"
import { getSessionWebID } from "../../../../Solid/Session";

export function FilterMonument(props: any) {
    const [markers,] = useState(readFromDataSetUrl(getSessionWebID().webId));

    const loadMonuments = async () => {
      props.changeLoading();
      clearMarkers();
      ShowMarkersFromPromise(filterByType(markers, "monument"), props.changeMarkerInfo, props.changeLoading);
      props.changeLoading();
    };

    return (
      <div>
        <button className="filter-button"
          onClick={async () => {
            props.changeLoading();
            await loadMonuments();
          }}
        >
        <img className = "filter-button-image" src="https://cdn-icons-png.flaticon.com/512/1321/1321018.png" />
        </button>
      </div>
    );
  }