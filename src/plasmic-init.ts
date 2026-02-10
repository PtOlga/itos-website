"use client";

import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "72gc4LrFpVVHVdH6iUBSQo",
      token: "ECSoAYF7KU6XzLq3rBiHxARN1PIJAOZdvLr8YpyKPT5KO8Pddy1kHpllY2iqt8sm60v39GwCTh2YVjQzgOQ",
    },
  ],

  // By default Plasmic will use the latest published version of your project.
  // For development you can set preview: true to see changes in real-time.
  preview: true,
});

