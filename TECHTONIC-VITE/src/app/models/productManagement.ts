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

export interface UnansweredQuestionDto {
    questionId: number;
    productId: number;
    productName: string;
    productImageUrl: string;
    question: string;
    askedAt: string; // ISO string from backend (e.g., "2025-06-21T16:48:32.66")
}