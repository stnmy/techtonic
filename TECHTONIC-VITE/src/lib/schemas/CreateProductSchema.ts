import { z } from "zod";

const productImageSchema = z.object({
    file: z.instanceof(File),
});

const productAttributeValueSchema = z.object({
    filterAttributeValueId: z.number().int().nullable().optional(),
    name: z.string().min(1),
    value: z.string().min(1),
    specificationCategory: z.string().min(1),
});

// Used for CreateProduct only (no discountPrice)
export const createProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().nonnegative(),
    stockQuantity: z.number().int().nonnegative(),
    isFeatured: z.boolean().optional(),
    isDealOfTheDay: z.boolean().optional(),
    brandId: z.number().int(),
    categoryId: z.number().int(),
    subCategoryId: z.number().int().nullable().optional(),
    productImages: z
        .array(productImageSchema)
        .min(1, "Upload at least one image")
        .max(5, "You can upload up to 5 images only"),
    attributeValues: z.array(productAttributeValueSchema).optional(),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
    id: z.number().int(),
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().nonnegative(),
    discountPrice: z.number().nonnegative().nullable().optional(),
    stockQuantity: z.number().int().nonnegative(),
    isFeatured: z.boolean().optional(),
    isDealOfTheDay: z.boolean().optional(),
    productImages: z
        .array(productImageSchema)
        .min(1, "Upload at least one image")
        .max(5, "You can upload up to 5 images only"),
    attributeValues: z.array(productAttributeValueSchema).optional(),
});
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;

export const updateProductViewSchema = z.object({
    id: z.number().int(),
    discountPrice: z.number().nonnegative().nullable().optional(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    stockQuantity: z.number().int(),
    isFeatured: z.boolean(),
    isDealOfTheDay: z.boolean(),
    productImageUrls: z.array(z.string().url()),
    attributeValues: z.array(productAttributeValueSchema),
});
export type UpdateProductViewSchema = z.infer<typeof updateProductViewSchema>;


