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

  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [attributeFilterOptions, setAttributeFilterOptions] = useState<
    ({ id: number; value: string; group: string } | null)[]
  >([]);

  useEffect(() => {
    if (!product || !filters.length) return;

    const enrichedAttributes = product.attributeValues.map((attr) => {
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

    reset({
      ...product,
      attributeValues: enrichedAttributes,
      productImages: [], // images will be selected manually via UI
    });

    const previews = product.productImageUrls;
    const padded = [...previews, ...Array(5 - previews.length).fill(null)];
    setImagePreviews(padded);
  }, [product, filters, reset]);

  const handleSingleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const updatedPreviews = [...imagePreviews];
      const updatedFiles = [...imageFiles];
      updatedPreviews[index] = url;
      updatedFiles[index] = file;
      setImagePreviews(updatedPreviews);
      setImageFiles(updatedFiles);

      const validFiles = updatedFiles.filter((f): f is File => f !== null);
      setValue(
        "productImages",
        validFiles.map((f) => ({ file: f })),
        { shouldValidate: true }
      );
    }
  };

  const handleBatchImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPreviews = [...imagePreviews];
    const newFiles = [...imageFiles];
    let filled = 0;
    for (let i = 0; i < newPreviews.length && filled < files.length; i++) {
      if (!newFiles[i]) {
        const url = URL.createObjectURL(files[filled]);
        newPreviews[i] = url;
        newFiles[i] = files[filled];
        filled++;
      }
    }
    setImagePreviews(newPreviews);
    setImageFiles(newFiles);

    const validFiles = newFiles.filter((f): f is File => f !== null);
    setValue(
      "productImages",
      validFiles.map((f) => ({ file: f })),
      { shouldValidate: true }
    );
  };

  const handleRemoveImage = (index: number) => {
    const newPreviews = [...imagePreviews];
    const newFiles = [...imageFiles];
    newPreviews[index] = null;
    newFiles[index] = null;
    setImagePreviews(newPreviews);
    setImageFiles(newFiles);
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

      imageFiles
        .filter((file): file is File => file !== null)
        .forEach((file) => {
          formData.append("ProductImages", file);
        });

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
    }
  };

  if (isProductLoading || isFiltersLoading)
    return <Typography>Loading...</Typography>;

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit, (errors) => {
          console.error("❌ Zod validation errors:", errors);
          alert("Validation failed! Check the console for more info.");
        })(e);
      }}
      sx={{ p: 4 }}
    >
      <Typography variant="h3" mb={2} sx={{ fontWeight: 600 }}>
        Update Product
      </Typography>

      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
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
          />
        </Grid>
        <Grid container spacing={2} mt={3}>
          <Grid>
            <FormControlLabel
              control={<Checkbox {...register("isFeatured")} />}
              label="Featured Product"
            />
          </Grid>
          <Grid>
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
