import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProductSchema,
  createProductSchema,
} from "../../lib/schemas/CreateProductSchema";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  CircularProgress,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import {
  useFetchBrandsQuery,
  useFetchFiltersQuery,
  useCreateProductMutation,
} from "../../features/management/managementApi";
import { SPECIFICATION_CATEGORIES } from "../../app/models/productManagement";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      productImages: [],
      attributeValues: Array(4).fill({
        name: "",
        value: "",
        specificationCategory: "",
        filterAttributeValueId: null,
      }),
    },
  });

  const { data: brands = [], isLoading: isBrandsLoading } =
    useFetchBrandsQuery();
  const { data: filters = [], isLoading: isFiltersLoading } =
    useFetchFiltersQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const navigate = useNavigate();

  const {
    fields: attrFields,
    append: appendAttr,
    remove,
  } = useFieldArray({
    control,
    name: "attributeValues",
  });

  const [imageFiles, setImageFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const imagePreviews = imageFiles.map((file) =>
    file ? URL.createObjectURL(file) : null
  );

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [imageFiles]);

  const handleSingleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const updated = [...imageFiles];
      updated[index] = file;
      setImageFiles(updated);
      const validFiles = updated.filter((f): f is File => f !== null);
      setValue(
        "productImages",
        validFiles.map((f) => ({ file: f }))
      );
    }
  };

  const handleBatchImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = [...imageFiles];
    let filled = 0;
    for (let i = 0; i < newFiles.length && filled < files.length; i++) {
      if (!newFiles[i]) {
        newFiles[i] = files[filled];
        filled++;
      }
    }
    setImageFiles(newFiles);
    const validFiles = newFiles.filter((f): f is File => f !== null);
    setValue(
      "productImages",
      validFiles.map((f) => ({ file: f }))
    );
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = [...imageFiles];
    newFiles[index] = null;
    setImageFiles(newFiles);
    const validFiles = newFiles.filter((f): f is File => f !== null);
    setValue(
      "productImages",
      validFiles.map((f) => ({ file: f }))
    );
  };

  const onSubmit = async (data: CreateProductSchema) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("stockQuantity", data.stockQuantity.toString());
      formData.append("isFeatured", String(data.isFeatured || false));
      formData.append("isDealOfTheDay", String(data.isDealOfTheDay || false));
      formData.append("brandId", data.brandId.toString());
      formData.append("categoryId", data.categoryId.toString());
      if (data.subCategoryId != null)
        formData.append("subCategoryId", data.subCategoryId.toString());

      data.productImages.forEach(({ file }) => {
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

      await createProduct(formData).unwrap();
      navigate("/admin/products");
    } catch (err) {
      console.error("Product creation failed", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <Typography variant="h3" mb={2} sx={{ fontWeight: 600 }}>
        Create Product
      </Typography>

      <Grid container spacing={2}>
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
            <TextField
              fullWidth
              label="Stock Quantity"
              type="number"
              {...register("stockQuantity", { valueAsNumber: true })}
              error={!!errors.stockQuantity}
              helperText={errors.stockQuantity?.message}
            />
          </Grid>

          <Grid size={2}>
            <FormControl fullWidth error={!!errors.brandId}>
              <InputLabel>Brand</InputLabel>
              <Select
                defaultValue=""
                label="Brand"
                {...register("brandId", { valueAsNumber: true })}
              >
                {isBrandsLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : (
                  brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                defaultValue=""
                label="Category"
                {...register("categoryId")}
              >
                <MenuItem value={1}>Laptop</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth>
              <InputLabel>SubCategory</InputLabel>
              <Select
                defaultValue=""
                label="Subcategory"
                {...register("subCategoryId")}
              >
                {" "}
                <MenuItem value={1}>Ultrabook</MenuItem>
                <MenuItem value={2}>Gaming</MenuItem>
                <MenuItem value={3}>Consumer</MenuItem>
                <MenuItem value={4}>Office</MenuItem>
              </Select>
            </FormControl>
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
        <Grid size={2}>
          <Typography variant="h5" gutterBottom>
            Images (Max 5)
          </Typography>
          <Button variant="outlined" component="label" sx={{ marginTop: 1 }}>
            Upload Images (Auto Fill)
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
                <Select
                  label="Spec. Category"
                  defaultValue=""
                  {...register(
                    `attributeValues.${index}.specificationCategory`
                  )}
                >
                  {SPECIFICATION_CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
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
                onChange={(_, value) => {
                  if (value)
                    setValue(
                      `attributeValues.${index}.filterAttributeValueId`,
                      value.id
                    );
                }}
                renderGroup={(params) => (
                  <li key={params.key}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "1.5rem",
                        padding: "4px 0 2px 12px",
                        backgroundColor: "#f7f7f7",
                      }}
                    >
                      {params.group}
                    </div>
                    <ul
                      style={{ marginTop: 0, marginBottom: 4, paddingLeft: 0 }}
                    >
                      {params.children}
                    </ul>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter Value"
                    fullWidth
                    placeholder="Search filter value"
                  />
                )}
              />
            </Grid>
            <Grid size={1}>
              <Box height="100%" display="flex" alignItems="stretch">
                <Button
                  color="error"
                  variant="outlined"
                  fullWidth
                  sx={{ height: "100%" }}
                  onClick={() => attrFields.length > 1 && remove(index)}
                >
                  Delete
                </Button>
              </Box>
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
          disabled={isCreating}
        >
          Create Product
        </Button>
      </Box>
    </Box>
  );
}
