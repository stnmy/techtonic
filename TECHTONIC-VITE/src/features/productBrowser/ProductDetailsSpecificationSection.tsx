import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Attribute, ProductDetailsType } from "../../app/models/product";

type Props = {
  product: ProductDetailsType;
};

export default function ProductDetailsSpecificationSection({ product }: Props) {
  if (!product || !product.attributes || product.attributes.length === 0) {
    return <Typography>No Specifications found for this product</Typography>;
  }

  const groupedAttributes: Record<string, Attribute[]> =
    product.attributes.reduce((acc, attribute) => {
      const category = attribute.specificationCategory;
      if (category !== "Key Feature") {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(attribute);
      }
      return acc;
    }, {} as Record<string, Attribute[]>);

  const sortedCategoryNames: string[] = Object.keys(groupedAttributes).sort(
    (a, b) => a.localeCompare(b)
  );

  return (
    <Box
      sx={{
        my: 4,
        border:'1px solid #e0e0e0',
        // boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.15)",
        p:2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        component="h2"
        sx={{ fontWeight: "900" }}
      >
        Specification
      </Typography>
      <Divider sx={{mt:2}}/>
      {sortedCategoryNames.map((category, index) => {
        const attributesInCategory = groupedAttributes[category].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        return (
          <Box key={category} sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              component="h3"
              sx={{
                color: "primary.main",
                fontWeight: "300",
                pt: 2,
              }}
            >
              {category}
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "none",
                border: "none",
              }}
            >
              <Table size="small">
                <TableBody>
                  {attributesInCategory.map((attr, attrIndex) => (
                    <TableRow
                      key={`${category}-${attr.name}-${attrIndex}`}

                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "medium", width: "30%" }}
                      >
                        {attr.name}
                      </TableCell>
                      <TableCell>{attr.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* {index <sortedCategoryNames.length -1 && <Divider sx={{ my:3}}/>} */}
          </Box>
        );
      })}
    </Box>
  );
}
