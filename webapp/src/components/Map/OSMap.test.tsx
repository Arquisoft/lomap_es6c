import { render, screen } from "@testing-library/react";
import { OSMap } from "./OSMap";
import MapIdentifier from "./MapIdentifier";

jest.mock("@inrupt/solid-client-authn-browser", () => ({
	getDefaultSession: () => ({
			info: {
				webId: "https://campa.inrupt.net/profile/card#me",
			},
	}),
}));

const dbMarkers = [
  {
    "lat": 51.51720349730429,
    "lng": -0.07054728708620896,
    "comment": "comentario 1",
    "title": "Marcador",
    "type": "landscape",
    "score": 4
  }
];

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

describe('OSMap', () => {
    it('can see all buttons correctly', () =>{
        const { getByRole, getAllByRole } = render(<OSMap/>);

        const ckbx = getByRole('checkbox');
        expect(ckbx).toBeInTheDocument();

        const buttons = getAllByRole('button');
        expect(buttons.length).toBe(7);
        const bt_markers = buttons[0];
        const bt_rest = buttons[1];
        const bt_filter1 = buttons[2];
        const bt_filter2 = buttons[3];
        const bt_filter3 = buttons[4];
        const bt_zoom_in = buttons[5];
        const bt_zoom_out = buttons[6];

        expect(bt_markers).toBeInTheDocument();
        expect(bt_rest).toBeInTheDocument();
        expect(bt_filter1).toBeInTheDocument();
        expect(bt_filter2).toBeInTheDocument();
        expect(bt_filter3).toBeInTheDocument();
        expect(bt_zoom_in).toBeInTheDocument();
        expect(bt_zoom_out).toBeInTheDocument();
    });

    it('can see all images correctly including buttons images', () => {
        const { getAllByRole } = render(<OSMap/>);
        const images = getAllByRole('img');

        const marker_img = images[0];
        expect(marker_img.getAttribute('src')).toBe('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fpaomedia%2Fsmall-n-flat%2F1024%2Fmap-marker-icon.png&f=1&nofb=1&ipt=f6f46ecb3bdc3be332acbfd7055c767c5f48fd2a8c3c4970dd2ec5026971348d&ipo=images');
        const rest_img = images[1];
        expect(rest_img.getAttribute('src')).toBe('https://img.icons8.com/color/512/restaurant-.png');
        const monuments_img = images[2];
        expect(monuments_img.getAttribute('src')).toBe('https://cdn-icons-png.flaticon.com/512/1321/1321018.png');
        const landscape_img = images[3];
        expect(landscape_img.getAttribute('src')).toBe('https://cdn-icons-png.flaticon.com/512/2795/2795602.png');
        const friends_img = images[4];
        expect(friends_img.getAttribute('src')).toBe('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.6X-2CYe7KZsGvf5Jv_sKJwHaHa%26pid%3DApi&f=1&ipt=a69740707746ebf75d6caf51588fe7bd2bb713b9c9a51b3f16cceb4dbcdcf81d&ipo=images');

        expect(marker_img).toBeInTheDocument();
        expect(rest_img).toBeInTheDocument();
        expect(monuments_img).toBeInTheDocument();
        expect(landscape_img).toBeInTheDocument();
        expect(friends_img).toBeInTheDocument();
    });

});

describe('MapIdentifier',()=>{
    it('renders without crash', () => {
        render(<MapIdentifier/>);
    });
});
