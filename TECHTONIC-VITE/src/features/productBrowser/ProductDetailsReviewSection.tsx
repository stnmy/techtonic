import { useState } from "react";
import { ProductDetailsType } from "../../app/models/product";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { format } from "date-fns";
import SendIcon from "@mui/icons-material/Send";
type Props = {
  product: ProductDetailsType;
};
export default function ProductDetailsReviewSection({ product }: Props) {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleNewReviewSubmit = () => {
    if (!newReview.trim()) {
    }
  };
  return (
    <Box
      sx={{
        mt: 5,
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Reviews
        </Typography>
        <Button variant="contained" startIcon={<CommentIcon />} sx={{backgroundColor:'primary.main'}}>
          Post Review
        </Button>
      </Box>
      <Divider sx={{ mt: 2 }} />
      {product.reviews.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 3,
            color: "text-secondary",
          }}
        >
          <CommentIcon sx={{ fontSize: 40, mb: 1 }} />
          <Typography>Be the first to post a Review.</Typography>
        </Box>
      ) : (
        <List>
          {product.reviews.map((review, index) => (
            <Box key={index}>
              <ListItem alignItems="flex-start" sx={{ py: 1.5, ml: -2 }}>
                <ListItemText sx={{ display: "flex", flexDirection: "column" }}>
                  <Rating value={review.rating} precision={0.5} readOnly />
                  <Typography variant="body1" sx={{ fontWeight: 900 }}>
                    {review.comment}
                  </Typography>
                  <Typography variant="caption">
                    By{" "}
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 900, color: "error.main" }}
                    >
                      {review.reviewerName}
                    </Typography>{" "}
                    At{" "}
                    {format(
                      new Date(review.createdAt),
                      "MMM dd, yyyy 'at' HH:mm"
                    )}
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider sx={{ py: 1 }} />
            </Box>
          ))}
        </List>
      )}
      <Box
        sx={{
          mt: 1,
          border: "1px solid #e0e0e0e",
          borderRadius: 1,
          boxShadow: "none",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 400 }}>
          Add Review
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <Rating
          precision={0.5}
          name="simple-controlled"
          value={newRating}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              setNewRating(newValue);
            }
          }}
          sx={{
            mb: 2,
            mt:2,
            fontSize:60,
          }}
        />
        <TextField
          fullWidth
          label="Add Review"
          variant="outlined"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          InputProps={{
            // Using InputProps with endAdornment (still common)
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={handleNewReviewSubmit}
                  endIcon={<SendIcon />}
                  variant="contained"
                  disabled={!newReview.trim()}
                >
                  Post
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
