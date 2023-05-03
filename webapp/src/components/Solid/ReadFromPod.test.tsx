import { readFromFriendDataSet } from "./ReadFromPod";

jest.mock("@inrupt/solid-client", () => ({
	getSolidDataset: (datasetUrl: any, fetch: any) => ({
		dbMarkers
	}),
  getThingAll: (dataset: any) => ([{
    dbMarkers
  }]),
  getStringNoLocale: (thing: any, field: string) => {
    if (field === "name") {
      return "Marker 1";
    }
  },
}));

jest.mock("@inrupt/solid-client-authn-browser", () => ({
	getDefaultSession: () => ({
        info: {
            webId: "https://Saulserra.inrupt.net/profile/card#me",
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

describe('readFromFriendDataSet', () => {
    it('no hay marcadores en el pod', async () => {
      // Aquí ejecutas la función y compruebas que devuelve lo que esperas
      const markers = await readFromFriendDataSet('https://campa.inrupt.net/public/');
      expect(markers).toEqual([]);
    });

  });