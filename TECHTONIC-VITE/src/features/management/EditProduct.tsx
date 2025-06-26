import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateProductSchema,
  updateProductSchema,
  UpdateProductViewSchema,
} from "../../lib/schemas/CreateProductSchema";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import {
  useFetchFiltersQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "./managementApi";
import { SPECIFICATION_CATEGORIES } from "../../app/models/productManagement";

// Helper function to create mock File objects from URLs
// This helper is primarily for display purposes now, less for submission
const createImageFileFromUrl = async (
  url: string,
  name: string
): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], name, { type: blob.type });
};

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: filters = [], isLoading: isFiltersLoading } =
    useFetchFiltersQuery();
  const { data: product, isLoading: isProductLoading } = useGetProductByIdQuery(
    Number(id)
  );
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
  });

  const {
    fields: attrFields,
    append: appendAttr,
    remove,
  } = useFieldArray({
    control,
    name: "attributeValues",
  });

  // imagePreviews will store URLs for displaying
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([]);
  // imageFormValues will directly store what goes into the form's productImages field
  // It will contain either { file: File } or { url: string }
  const [imageFormValues, setImageFormValues] = useState<
    ({ file: File } | { url: string } | null)[]
  >(Array(5).fill(null)); // Initialize with 5 nulls

  const [attributeFilterOptions, setAttributeFilterOptions] = useState<
    ({ id: number; value: string; group: string } | null)[]
  >([]);

  useEffect(() => {
    if (!product || !filters.length) return;

    let enrichedAttributes;
    let initialImageFormValues: ({ file: File } | { url: string } | null)[] =
      [];

    // Process attributes first
    enrichedAttributes = product.attributeValues.map((attr) => {
      const updatedAttr = { ...attr };
      if (attr.filterAttributeValueId != null) {
        for (const filter of filters) {
          const matchedValue = filter.values.find(
            (v) => v.id === attr.filterAttributeValueId
          );
          if (matchedValue) {
            updatedAttr.name = filter.filterName;
            updatedAttr.value = matchedValue.value;
            updatedAttr.specificationCategory =
              SPECIFICATION_CATEGORIES.find((cat) =>
                filter.filterName.toLowerCase().includes(cat.toLowerCase())
              ) ?? attr.specificationCategory;
            break;
          }
        }
      }
      return updatedAttr;
    });

    const selectedAutocompleteOptions = enrichedAttributes.map((attr) => {
      if (attr.filterAttributeValueId != null) {
        const matchingFilter = filters.find((filter) =>
          filter.values.some((v) => v.id === attr.filterAttributeValueId)
        );
        const matchingValue = matchingFilter?.values.find(
          (v) => v.id === attr.filterAttributeValueId
        );
        if (matchingFilter && matchingValue) {
          return { ...matchingValue, group: matchingFilter.filterName };
        }
      }
      return null;
    });

    setAttributeFilterOptions(selectedAutocompleteOptions);

    // Initialize image previews and form values
    const loadExistingImages = async () => {
      try {
        const existingPreviews: string[] = [];
        const existingFormValues: ({ file: File } | { url: string })[] = [];

        for (const url of product.productImageUrls) {
          // Attempt to create a mock file for display
          try {
            const file = await createImageFileFromUrl(
              url,
              url.substring(url.lastIndexOf("/") + 1)
            );
            existingPreviews.push(URL.createObjectURL(file));
            existingFormValues.push({ file }); // Store as a file object in form values
          } catch (fileError) {
            console.warn(`Could not create mock file for ${url}:`, fileError);
            existingPreviews.push(url); // Fallback to raw URL for preview
            existingFormValues.push({ url }); // Store as URL object in form values
          }
        }

        // Pad to 5 slots
        const paddedPreviews = [
          ...existingPreviews,
          ...Array(5 - existingPreviews.length).fill(null),
        ];
        const paddedFormValues = [
          ...existingFormValues,
          ...Array(5 - existingFormValues.length).fill(null),
        ];

        setImagePreviews(paddedPreviews);
        setImageFormValues(paddedFormValues);

        reset({
          ...product,
          attributeValues: enrichedAttributes,
          productImages: paddedFormValues.filter(Boolean) as (
            | {
                file: File;
              }
            | {
                url: string;
              }
          )[],
        });
      } catch (error) {
        console.error("Error loading existing images:", error);
        // Fallback: Use original URLs directly for form and display if any part of mock file creation fails
        const paddedPreviews = [
          ...product.productImageUrls,
          ...Array(5 - product.productImageUrls.length).fill(null),
        ];
        const paddedFormValues = [
          ...product.productImageUrls.map((url) => ({ url })),
          ...Array(5 - product.productImageUrls.length).fill(null),
        ];

        setImagePreviews(paddedPreviews);
        setImageFormValues(paddedFormValues);

        reset({
          ...product,
          attributeValues: enrichedAttributes,
          productImages: product.productImageUrls.map((url) => ({ url })),
        });
      }
    };

    loadExistingImages();
  }, [product, filters, reset, setValue]);

  const handleSingleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const updatedPreviews = [...imagePreviews];
      const updatedFormValues = [...imageFormValues];

      updatedPreviews[index] = url;
      updatedFormValues[index] = { file }; // Store as file object

      setImagePreviews(updatedPreviews);
      setImageFormValues(updatedFormValues);

      // Update react-hook-form state
      setValue(
        "productImages",
        updatedFormValues.filter(Boolean) as (
          | { file: File }
          | { url: string }
        )[],
        { shouldValidate: true }
      );
    }
  };

  const handleBatchImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews = [...imagePreviews];
    const newFormValues = [...imageFormValues];
    let filled = 0;

    for (let i = 0; i < newPreviews.length && filled < files.length; i++) {
      if (!newFormValues[i]) {
        const file = files[filled];
        const url = URL.createObjectURL(file);
        newPreviews[i] = url;
        newFormValues[i] = { file }; // Store as file object
        filled++;
      }
    }
    setImagePreviews(newPreviews);
    setImageFormValues(newFormValues);

    // Update react-hook-form state
    setValue(
      "productImages",
      newFormValues.filter(Boolean) as ({ file: File } | { url: string })[],
      { shouldValidate: true }
    );
  };

  const handleRemoveImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    const newFormValues = [...imageFormValues];

    if (newPreviews[index]) URL.revokeObjectURL(newPreviews[index] as string); // Clean up old object URL

    newPreviews[index] = null;
    newFormValues[index] = null;

    setImagePreviews(newPreviews);
    setImageFormValues(newFormValues);

    // Update react-hook-form state
    setValue(
      "productImages",
      newFormValues.filter(Boolean) as ({ file: File } | { url: string })[],
      { shouldValidate: true }
    );
  };

  const onSubmit = async (data: UpdateProductSchema) => {
    try {
      const formData = new FormData();
      formData.append("Id", data.id.toString());
      formData.append("Name", data.name);
      formData.append("Description", data.description);
      formData.append("Price", data.price.toString());
      formData.append("StockQuantity", data.stockQuantity.toString());
      formData.append("IsFeatured", String(data.isFeatured || false));
      formData.append("IsDealOfTheDay", String(data.isDealOfTheDay || false));
      if (data.discountPrice != null)
        formData.append("DiscountPrice", data.discountPrice.toString());

      const existingImageUrls: string[] = [];
      const newImageFiles: File[] = [];

      // Iterate through the `productImages` array directly from the form data
      data.productImages.forEach((image) => {
        if ("file" in image && image.file instanceof File) {
          newImageFiles.push(image.file);
        } else if ("url" in image) {
          existingImageUrls.push(image.url);
        }
      });

      // Append existing URLs to FormData
      if (existingImageUrls.length > 0) {
        formData.append("ExistingImageUrls", JSON.stringify(existingImageUrls));
      } else {
        // If no existing URLs are left, send an empty array to signal deletion
        formData.append("ExistingImageUrls", JSON.stringify([]));
      }

      // Append new files to FormData
      newImageFiles.forEach((file) => {
        formData.append("ProductImages", file); // Name this 'ProductImages' for your backend's file array
      });

      // Add attributes
      data.attributeValues?.forEach((attr, index) => {
        formData.append(`AttributeValues[${index}].Name`, attr.name);
        formData.append(`AttributeValues[${index}].Value`, attr.value);
        formData.append(
          `AttributeValues[${index}].SpecificationCategory`,
          attr.specificationCategory
        );
        if (attr.filterAttributeValueId != null) {
          formData.append(
            `AttributeValues[${index}].FilterAttributeValueId`,
            attr.filterAttributeValueId.toString()
          );
        }
      });

      await updateProduct(formData).unwrap();
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Failed to update product:", err);
      alert("Failed to update product. Please check the console for details.");
    }
  };

  if (isProductLoading || isFiltersLoading)
    return <Typography>Loading...</Typography>;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <Typography variant="h3" mb={2} sx={{ fontWeight: 600 }}>
        Update Product
      </Typography>

      <Grid container spacing={2}>
        <Grid size={12}>
          {" "}
          {/* Changed size to item xs */}
          <TextField
            fullWidth
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            InputLabelProps={{ shrink: true }} // Add this line
          />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Description"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            InputLabelProps={{ shrink: true }} // Add this line
          />
        </Grid>
        <Grid size={2}>
          <TextField
            fullWidth
            label="Price"
            type="number"
            {...register("price", { valueAsNumber: true })}
            error={!!errors.price}
            helperText={errors.price?.message}
            InputLabelProps={{ shrink: true }} // Add this line
          />
        </Grid>
        <Grid size={2}>
          <Controller
            name="discountPrice"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Discount Price"
                type="number"
                value={field.value ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "" ? null : parseFloat(value));
                }}
                error={!!errors.discountPrice}
                helperText={errors.discountPrice?.message}
                InputLabelProps={{ shrink: true }} // Add this line
              />
            )}
          />
        </Grid>
        <Grid size={2}>
          <TextField
            fullWidth
            label="Stock Quantity"
            type="number"
            {...register("stockQuantity", { valueAsNumber: true })}
            error={!!errors.stockQuantity}
            helperText={errors.stockQuantity?.message}
            InputLabelProps={{ shrink: true }} // Add this line
          />
        </Grid>
        <Grid container spacing={2} mt={3}>
          <Grid>
            {" "}
            {/* Changed size to item */}
            <FormControlLabel
              control={<Checkbox {...register("isFeatured")} />}
              label="Featured Product"
            />
          </Grid>
          <Grid>
            {" "}
            {/* Changed size to item */}
            <FormControlLabel
              control={<Checkbox {...register("isDealOfTheDay")} />}
              label="Deal of the Day"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container sx={{ marginTop: 3 }}>
        <Grid size={2}>
          <Typography variant="h5" gutterBottom>
            Images (Max 5)
          </Typography>
          <Button variant="outlined" component="label" sx={{ marginTop: 1 }}>
            Upload Images
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleBatchImageUpload}
            />
          </Button>
        </Grid>
        <Grid size={10}>
          <Box display="flex" gap={2} flexWrap="wrap">
            {imagePreviews.map((preview, idx) => (
              <Box
                key={idx}
                sx={{
                  width: 100,
                  height: 100,
                  border: "2px dashed #ccc",
                  borderRadius: 2,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#fafafa",
                }}
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt={`uploaded-${idx}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveImage(idx)}
                      sx={{
                        position: "absolute",
                        top: 2,
                        right: 2,
                        bgcolor: "white",
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    component="label"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      color: "#aaa",
                    }}
                  >
                    <AddPhotoAlternateIcon fontSize="large" />
                    <Typography variant="caption">Add</Typography>
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleSingleImageUpload(e, idx)}
                    />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
          {errors.productImages && (
            <Typography
              color="error"
              variant="caption"
              sx={{ mt: 1, display: "block" }}
            >
              {errors.productImages.message}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Attributes
        </Typography>
        {attrFields.map((field, index) => (
          <Grid container spacing={2} key={field.id} mb={1}>
            <Grid size={4}>
              <TextField
                label="Name"
                fullWidth
                {...register(`attributeValues.${index}.name`)}
              />
            </Grid>
            <Grid size={3}>
              <FormControl fullWidth>
                <InputLabel>Spec. Category</InputLabel>
                <Controller
                  name={`attributeValues.${index}.specificationCategory`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Spec. Category"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {SPECIFICATION_CATEGORIES.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid size={2}>
              <TextField
                label="Value"
                fullWidth
                {...register(`attributeValues.${index}.value`)}
              />
            </Grid>
            <Grid size={2}>
              <Autocomplete
                options={filters.flatMap((filter) =>
                  filter.values.map((value) => ({
                    ...value,
                    group: filter.filterName,
                  }))
                )}
                groupBy={(option) => option.group}
                getOptionLabel={(option) => option.value}
                isOptionEqualToValue={(opt, val) => opt.id === val.id}
                loading={isFiltersLoading}
                value={attributeFilterOptions[index] ?? null}
                onChange={(_, value) => {
                  const updated = [...attributeFilterOptions];
                  updated[index] = value
                    ? { ...value, group: value.group }
                    : null;
                  setAttributeFilterOptions(updated);
                  if (value) {
                    setValue(
                      `attributeValues.${index}.filterAttributeValueId`,
                      value.id
                    );
                    setValue(`attributeValues.${index}.value`, value.value);
                    setValue(`attributeValues.${index}.name`, value.group);
                    const matchedCategory = SPECIFICATION_CATEGORIES.find(
                      (cat) =>
                        value.group.toLowerCase().includes(cat.toLowerCase())
                    );
                    setValue(
                      `attributeValues.${index}.specificationCategory`,
                      matchedCategory ?? ""
                    );
                  } else {
                    setValue(
                      `attributeValues.${index}.filterAttributeValueId`,
                      null
                    );
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Filter Value" fullWidth />
                )}
              />
            </Grid>
            <Grid size={1}>
              <Button
                color="error"
                variant="outlined"
                fullWidth
                onClick={() => attrFields.length > 1 && remove(index)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        ))}
        <Button
          variant="contained"
          onClick={() =>
            appendAttr({
              name: "",
              value: "",
              specificationCategory: "",
              filterAttributeValueId: null,
            })
          }
        >
          Add Attribute
        </Button>
      </Box>

      <Box mt={5}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isUpdating}
        >
          Update Product
        </Button>
      </Box>
    </Box>
  );
}
