export type EquipmentOverviewImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

/**
 * Overview photo for an equipment page. Add an entry to show one.
 * Put the file in public/images/equipment/ and set src and alt.
 * A page with no entry renders the Overview text without an image.
 * A parent photo is not used by its children.
 */
export const equipmentOverviewImages: Record<string, EquipmentOverviewImage> = {
  "/equipment-options/adhesives-sealants": {
    src: "/images/adhesive-bonding.jpg",
    alt: "Adhesive bonding on a manufactured assembly",
  },
  "/equipment-options/composites": {
    src: "/images/structural-panels.jpg",
    alt: "Structural composite panel manufacturing",
  },
  "/equipment-options/composites/pultrusion": {
    src: "/images/equipment/pulltrusion.png",
    alt: "",
  },

  "/equipment-options/composites/filament-winding": {
    src: "/images/equipment/filament-winding.webp",
    alt: "Filament winding equipment",
  },
  "/equipment-options/lubrication": {
    src: "/images/equipment/lubrication-overview.jpg",
    alt: "Grease application on industrial equipment",
  },
  "/equipment-options/paint-coatings": {
    src: "/images/automotive.jpg",
    alt: "Coated automotive manufacturing application",
  },
  "/equipment-options/process-control": {
    src: "/images/electronics.jpg",
    alt: "Process monitoring and control equipment",
  },
  "/equipment-options/process-control/integration-automation": {
    src: "/images/equipment/integration-automation.jpg",
    alt: "Automated grease dispensing valves and hoses mounted on a machine",
    width: 300,
    height: 375,
  },
  "/equipment-options/polyurethane-processing-equipment": {
    src: "/images/equipment/polyurethane-overview.png",
    alt: "Polyurethane batch processing equipment",
  },
};

export function overviewImageForEquipmentPage(
  href: string,
): EquipmentOverviewImage | undefined {
  return equipmentOverviewImages[href];
}
