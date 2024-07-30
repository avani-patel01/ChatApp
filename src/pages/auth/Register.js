import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm({
    mode: "onChange", // Ensures validation runs on each change
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value) => {
    const data = {
      name: value.name,
      email: value.email,
      password: value.password,
    };

    await axios
      .post("http://localhost:5000/api/v1/auth/register", data)
      .then(() => {
        reset();
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const apiErrors = error.response.data.errors; // Adjust according to your API response structure
          apiErrors.forEach((apiError) => {
            setError(apiError.path, { message: apiError.msg });
          });
        }
      });
  };

  return (
    <Grid item md={6}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper sx={{ height: "100%" }}>
          <Box p={5}>
            <Typography variant="h4" gutterBottom color="primary">
              REGISTER HERE
            </Typography>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3 }}
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                  {...field}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3 }}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3 }}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  {...field}
                />
              )}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={!isValid}
            >
              REGISTER
            </Button>
            <Box sx={{ textAlign: "center" }} mt={5}>
              <Typography>
                Already have an account?
                <Button variant="text" href="/">
                  LOGIN
                </Button>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </form>
    </Grid>
  );
};

export default Register;
