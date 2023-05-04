
import GetFriendMarkers from "../../../../Solid/Friends/ShowFriendMarkers";
import Markers from "../../MarkersButton/MarkersButton";
import { FilterLandscape } from "../Landscape/FilterLandscape";
import { FilterMonument } from "../Monument/FilterMonument";
import { FilterRestaurant } from "../Restaurant/FilterRestaurant";
import "./FilterHamburger.css"

export default function FilterHamburger(props: any){

  const changeFriendFilter = () => {
    props.changeFriendFilter();
  };

  return (
    <div>

  <input type="checkbox" className="menu-open" name="menu-open" id="menu-open"/>
  <label className="menu-open-button" htmlFor="menu-open">
    <span className="hamburger hamburger-1"></span>
    <span className="hamburger hamburger-2"></span>
    <span className="hamburger hamburger-3"></span>
  </label>

  
  <div className="menu-item-hamburger"> <Markers changeLoading={props.changeLoading} changeMarkerInfo={props.changeMarkerInfo}/> </div>
  <div className="menu-item-hamburger"> <FilterRestaurant changeLoading={props.changeLoading} changeMarkerInfo={props.changeMarkerInfo}/> </div> 
  <div className="menu-item-hamburger"> <FilterMonument changeLoading={props.changeLoading} changeMarkerInfo={props.changeMarkerInfo}/> </div>
  <div className="menu-item-hamburger"> <FilterLandscape changeLoading={props.changeLoading} changeMarkerInfo={props.changeMarkerInfo}/> </div>
  <div className="menu-item-hamburger"> <GetFriendMarkers changeLoading={props.changeLoading} changeFriendFilter={changeFriendFilter}/> </div>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <filter id="shadowed-goo">
          
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
          <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow" />
          <feOffset in="shadow" dx="1" dy="1" result="shadow" />
          <feBlend in2="shadow" in="goo" result="goo" />
          <feBlend in2="goo" in="SourceGraphic" result="mix" />
      </filter>
      <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in2="goo" in="SourceGraphic" result="mix" />
      </filter>
    </defs>
</svg>
    </div>
  );
}