import L from "leaflet";
import { getMarkerIcon } from "./icon";

describe("getMarkerIcon", () => {
  const restaurantIcon = L.icon({
    iconUrl: "https://img.icons8.com/color/512/restaurant-.png",
    iconSize: [30, 30],
  });
  const monumentIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1321/1321018.png",
    iconSize: [30, 30],
  });
  const landscapeIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2795/2795602.png",
    iconSize: [30, 30],
  });

  it("returns the restaurant icon if the type is restaurant", () => {
    const icon = getMarkerIcon("restaurant");
    expect(icon).toEqual(restaurantIcon);
  });

  it("returns the monument icon if the type is monument", () => {
    const icon = getMarkerIcon("monument");
    expect(icon).toEqual(monumentIcon);
  });

  it("returns the landscape icon if the type is landscape", () => {
    const icon = getMarkerIcon("landscape");
    expect(icon).toEqual(landscapeIcon);
  });
});
