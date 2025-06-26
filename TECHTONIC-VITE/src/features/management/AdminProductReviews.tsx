import {
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from "@mui/material";
import { useAppSelector } from "../../app/store/store";
import {
  useFetchProductReviewsQuery,
  useDeleteReviewMutation,
} from "./managementApi";
import { AdminProductReview } from "../../app/models/product";
import AdminProductReviewTopFilters from "./AdminProductReviewTopFilters";

export default function AdminProductReviews() {
  const reviewParams = useAppSelector(
    (state) => state.adminProductReviewBrowserSlice
  );

  const {
    data: reviewsResponse,
    isLoading,
    isError,
    error,
  } = useFetchProductReviewsQuery(reviewParams);

  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const handleDeleteClick = async (reviewId: number) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(reviewId).unwrap();
        // Optionally: show success toast
      } catch (err) {
        console.error("Failed to delete review:", err);
        alert("Failed to delete review.");
      }
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <CircularProgress size={60} />
        </Box>
      );
    }

    if (isError) {
      return (
        <Typography
          variant="h6"
          color="error"
          sx={{ textAlign: "center", mt: 4 }}
        >
          Error loading reviews:{" "}
          {(error as any)?.data?.message ||
            (error as any)?.error ||
            "Unknown error"}
        </Typography>
      );
    }

    const reviews = Array.isArray(reviewsResponse)
      ? reviewsResponse
      : reviewsResponse?.data;

    if (!reviews || reviews.length === 0) {
      return (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No product reviews found matching your criteria.
        </Typography>
      );
    }

    return (
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table stickyHeader aria-label="product reviews table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Product ID</strong>
              </TableCell>
              <TableCell>
                <strong>Reviewer Name</strong>
              </TableCell>
              <TableCell>
                <strong>Comment</strong>
              </TableCell>
              <TableCell>
                <strong>Rating</strong>
              </TableCell>
              <TableCell>
                <strong>Created At</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review: AdminProductReview) => (
              <TableRow key={review.id} hover>
                <TableCell>{review.id}</TableCell>
                <TableCell>{review.productId}</TableCell>
                <TableCell>{review.reviewerName}</TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>{review.rating} / 5</TableCell>
                <TableCell>
                  {new Date(review.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(review.id)}
                    disabled={isDeleting}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ paddingRight: 2, marginTop: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Product Reviews
      </Typography>

      <Box sx={{ mb: 2 }}>
        <AdminProductReviewTopFilters />
      </Box>

      {renderContent()}
    </Box>
  );
}
