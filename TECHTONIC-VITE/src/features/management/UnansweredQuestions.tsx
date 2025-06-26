import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import {
  useFetchUnansweredQuestionsQuery,
  useAnswerProductQuestionMutation,
} from "./managementApi";

export default function UnansweredQuestions() {
  const { data, isLoading, isError, refetch } =
    useFetchUnansweredQuestionsQuery();
  const [answering, setAnswering] = useState<{ [key: number]: string }>({});
  const [submitAnswer] = useAnswerProductQuestionMutation();

  const handleChange = (id: number, text: string) => {
    setAnswering((prev) => ({ ...prev, [id]: text }));
  };

  const handleSubmit = async (id: number) => {
    if (!answering[id]?.trim()) return;
    try {
      await submitAnswer({ questionId: id, answer: answering[id] });
      refetch(); // Refresh list after answering
    } catch (err) {
      console.error("Failed to answer question", err);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Failed to load questions.</Typography>;
  if (!data || data.length === 0)
    return <Typography>No unanswered questions.</Typography>;

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Unanswered Product Questions
      </Typography>

      {data.map((q) => (
        <Paper key={q.questionId} sx={{ p: 2, mb: 3 }}>
          <Box display="flex" alignItems="center" gap={2}>
            <img
              src={q.productImageUrl}
              alt={q.productName}
              width={80}
              height={80}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
            <Box>
              <Typography variant="subtitle1">{q.productName}</Typography>
              <Typography variant="caption" color="text.secondary">
                Asked at: {new Date(q.askedAt).toLocaleString()}
              </Typography>
              <Typography sx={{ mt: 1 }}>{q.question}</Typography>
            </Box>
          </Box>

          <Box mt={2} display="flex" gap={2}>
            <TextField
              fullWidth
              size="small"
              placeholder="Type your answer here..."
              value={answering[q.questionId] || ""}
              onChange={(e) => handleChange(q.questionId, e.target.value)}
            />
            <Button
              variant="contained"
              disabled={!answering[q.questionId]?.trim()}
              onClick={() => handleSubmit(q.questionId)}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
