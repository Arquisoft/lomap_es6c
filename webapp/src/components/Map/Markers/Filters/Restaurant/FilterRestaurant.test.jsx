// Test if the component renders correctly

import { render, screen } from "@testing-library/react";
import { FilterRestaurant } from "./FilterRestaurant";

jest.mock("@inrupt/solid-client-authn-browser", () => ({
	getDefaultSession: () => ({
        info: {
            webId: "https://campa.inrupt.net/profile/card#me",
        },
	}),
}));

const dbMarkers = [
  {
    id: 1,
    name: "Marker 1",
    latitude: 42.7128,
    longitude: -74.006,
    type: "shop",
  },
];

jest.mock("@inrupt/solid-client", () => ({
	getSolidDataset: (datasetUrl, fetch) => ({
		dbMarkers
	}),
  getThingAll: (dataset) => ([{
    dbMarkers
  }]),
  getStringNoLocale: (thing, field) => {
    if (field === "name") {
      return "Marker 1";
    }
  },
}));

describe("FilterRestaurant component", () => {
  it("should render the button with the correct image", () => {
    const { getByRole } = render(<FilterRestaurant />);
    const button = getByRole("button");
    const image = getByRole("img");
    expect(button).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://img.icons8.com/color/512/restaurant-.png"
    );
  });

});