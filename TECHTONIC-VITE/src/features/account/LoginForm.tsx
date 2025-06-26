import { LockOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyUserInfoQuery, useLoginMutation } from "./accountApi";

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const [fetchUserInfo] = useLazyUserInfoQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchema>({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const location = useLocation();
  const navigate = useNavigate();

  const onFormSubmit = async (data: loginSchema) => {
    await login(data);
    await fetchUserInfo();
    navigate(location.state?.from || "/productBrowser");
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
        <Typography variant="h4">Sign in</Typography>
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
            autoComplete="new-password" // Use "new-password" for password fields
          />
          <Button disabled={isLoading} variant="contained" type="submit">
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Dont have an account?
            <Typography component={Link} to="/register" sx={{ marginLeft: 1 }}>
              Register
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
