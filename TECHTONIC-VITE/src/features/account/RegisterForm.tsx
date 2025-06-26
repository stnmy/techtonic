import { useForm } from "react-hook-form";
import { useRegisterMutation } from "./accountApi";
import { registerSchema } from "../../lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isLoading },
  } = useForm<registerSchema>({
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  const onFormSubmit = async (data: registerSchema) => {
    try {
      await registerUser(data).unwrap();
    } catch (error) {
      const apiError = error as { message: string };
      if (apiError.message && typeof apiError.message === "string") {
        const errorArray = apiError.message.split(",");
        errorArray.forEach((e) => {
          if (e.includes("password")) {
            setError("password", { message: e });
          } else if (e.includes("Email")) {
            setError("email", { message: e });
          }
        });
      }
    }
  };

  return (
    <Container
      component={Paper}
      sx={{
        borderRadius: 3,
        width: 400,
        marginTop: 20,
        border: "1px solid #acc",
        boxShadow: "none",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="2"
      >
        <LockOutlined sx={{ mt: 1, color: "secondary.main", fontSize: 20 }} />
        <Typography variant="h4">Register</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onFormSubmit)}
          width="100%"
          display="flex"
          flexDirection="column"
          gap={3}
          marginY={3}
          autoComplete="off" // Add autocomplete="off" here
        >
          <TextField
            fullWidth
            label="Email"
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            autoComplete="off" // Add autocomplete="off" to email field
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            autoFocus
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="new-password" // Use "new-password" for password field
          />
          <Button
            disabled={isLoading || !isValid}
            variant="contained"
            type="submit"
          >
            Register
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?
            <Typography component={Link} to="/login" sx={{ marginLeft: 1 }}>
              Login
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
