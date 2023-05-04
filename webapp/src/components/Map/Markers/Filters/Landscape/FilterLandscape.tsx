/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { readFromDataSetUrl} from "../../../../Solid/ReadFromPod";
import { clearMarkers, ShowMarkersFromPromise} from "../../../OSMap";
import { filterByType } from "../Filter";
import "../FilterButton.css"
import { getSessionWebID } from "../../../../Solid/Session";

export function FilterLandscape(props: any) {
    const [markers,] = useState(readFromDataSetUrl(getSessionWebID().webId));

    const loadLandscape = async () => {
      clearMarkers();
      ShowMarkersFromPromise(filterByType(markers, "landscape"), props.changeMarkerInfo, props.changeLoading);
    };

    return (
      <div>
        <button className="filter-button"
          onClick={ () => {     
            props.changeLoading();
            loadLandscape();
          }}
        >
        <img className = "filter-button-image" src="https://cdn-icons-png.flaticon.com/512/2795/2795602.png" />
        </button>
      </div>
    );
  }