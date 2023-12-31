import {
  Button,
  Box,
  FormControl,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Select,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  MenuItem,
  TablePagination
} from '@mui/material';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import React, { useState } from 'react';


const columns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'actions', label: 'Actions' }
];

const data = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Alice', age: 30 },
  // Add more data here...
];

const rowsPerPageOptions = [5, 10, 25];

const CategoryPage = () => {
  const [categories, setCategories] = React.useState([]);

   const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={12}>
        <MainCard>
          <Grid>
            <Formik
              initialValues={{
                email: '',
                username: '',
                address: '',
                gender: '',
                submit: null
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                username: Yup.string().max(255).required('Username is required'),
                gender: Yup.string().required('Gender is required'),
                address: Yup.string().required('Address is required')
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  setStatus({ success: false });
                  setSubmitting(false);
                } catch (err) {
                  setStatus({ success: false });
                  setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {/* Username */}
                    <Grid item xs={12} lg={4} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">Username </InputLabel>
                        <OutlinedInput
                          id="username-login"
                          type="text"
                          value={values.username}
                          name="username"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter username"
                          fullWidth
                          error={Boolean(touched.username && errors.username)}
                        />
                        {touched.username && errors.username && (
                          <FormHelperText error id="standard-weight-helper-text-username-login">
                            {errors.username}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* End Username */}
                    {/* Email */}
                    <Grid item xs={12} lg={4} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">Email </InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="email"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter email address"
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id="standard-weight-helper-text-email-login">
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* End Email */}

                    {/* Gender */}
                    <Grid item xs={12} lg={4} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="gender">Gender </InputLabel>
                        <Select labelId="label" id="gender" name="gender" value={values.gender} onChange={handleChange}>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                        {touched.gender && errors.gender && (
                          <FormHelperText error id="standard-weight-helper-text-gender-login">
                            {errors.gender}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* End Gender */}

                    {/* Address */}
                    <Grid item xs={12} lg={8} md={8}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">Address </InputLabel>
                        <OutlinedInput
                          id="address"
                          type="text"
                          value={values.address}
                          name="adddress"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter  address"
                          fullWidth
                          error={Boolean(touched.address && errors.address)}
                        />
                        {touched.address && errors.address && (
                          <FormHelperText error id="standard-weight-helper-text-address-login">
                            {errors.address}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    {/* End Address */}
                    <Grid item xs={0} md={4} lg={4}></Grid>

                    <Grid item xs={3} sx={{ mt: 2 }}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Login
                        </Button>
                      </AnimateButton>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </MainCard>
      </Grid>

      {/* Item list */}
      <Grid item xs={12}>
        <MainCard>
         <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleAction(row.id)}>
                  Action
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default CategoryPage;
