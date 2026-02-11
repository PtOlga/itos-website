import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
	projects: [
	  {
	    // New Plasmic project you just created
	    id: "iddF84WskUGnwku9fPcTNt",
	    token:
	      "5AXeSgREZcHwe22memWa8RKmnMNOdp73OkSGlc39m0dlnPoo9Q2nBnIEhgUR1CABOxG8ozqwCvuvls3EW965yg",
	  },
	],

	// Fetches the latest revisions, whether or not they were unpublished!
	// Disable for production to ensure you render only published changes.
	preview: true,
});

