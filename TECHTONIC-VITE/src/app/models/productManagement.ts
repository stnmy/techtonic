export interface Brand {
    id: number;
    name: string;
    slug: string;
}

export const SPECIFICATION_CATEGORIES = [
    "Brand",
    "subcategory",
    "Processor",
    "Display",
    "Memory",
    "Storage",
    "Graphics",
    "Software",
    "Key Feature",
    "Connectivity",
    "Features",
    "Power",
    "Physical",
    "Keyboard",
    "Security"
] as const;

export type SpecificationCategory = typeof SPECIFICATION_CATEGORIES[number];
