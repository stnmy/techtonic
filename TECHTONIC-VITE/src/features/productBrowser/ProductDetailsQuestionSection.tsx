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
  TextField,
  Typography,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { format } from "date-fns";
import SendIcon from "@mui/icons-material/Send";
type Props = {
  product: ProductDetailsType;
};
export default function ProductDetailsQuestionSection({ product }: Props) {
  const [newQuestion, setNewQuestion] = useState("");

  const handleAskQuestionSubmit = () => {
    if (newQuestion.trim()) {

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
          //   mb: 2,
          //   ml: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          Questions
        </Typography>
        <Button variant="contained" startIcon={<ChatBubbleOutlineIcon />} sx={{backgroundColor:'primary.main'}}>
          Ask Question
        </Button>
      </Box>
      <Divider sx={{ mt: 2 }} />
      {product.questions.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 3,
            color: "text-secondary",
          }}
        >
          <ChatBubbleOutlineIcon sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="body2">
            Be the first to ask a question
          </Typography>
        </Box>
      ) : (
        <List sx={{ ml: -2 }}>
          {product.questions.map((question, index) => (
            <Box key={index}>
              <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                      Question: {question.questionText}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Answer:
                      </Typography>{" "}
                      {question.answer || "No Answer Yet"}
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", mt: 0.5 }}
                      >
                        Asked on:{" "}
                        {format(
                          new Date(question.createdAt),
                          "MMM dd, yyyy 'at' HH:mm"
                        )}
                      </Typography>
                    </>
                  }
                ></ListItemText>
              </ListItem>
            </Box>
          ))}
        </List>
      )}
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Ask a question"
          variant="outlined"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          InputProps={{
            // Using InputProps with endAdornment (still common)
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={handleAskQuestionSubmit}
                  endIcon={<SendIcon />}
                  variant="contained"
                  disabled={!newQuestion.trim()}
                >
                  Ask
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
