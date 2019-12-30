import React from 'react';
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import './App.css';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const ADD_USER = gql`
  mutation AddUser(
    $name: String
    $email: String
    $phone: Int
    $address: String
    $zip: Int
    $file: String
  ) {
    addUser(
      name: $name
      email: $email
      phone: $phone
      address: $address
      zip: $zip
      file: $file
    ) {
      name
      email
      phone
      address
      zip
      file
    }
  }
`;
const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

function App() {
  const [addUser, { data }] = useMutation(ADD_USER);
  
    return (
      <div className="container">
        {/* <SignupForm /> */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            address: "",
            zip: "",
            file: null
          }}
          onSubmit={(values, { setSubmitting }) => {
            addUser({
              variables: {
                name: values.name,
                email: values.email,
                phone: values.phone,
                address: values.address,
                zip: values.zip,
                file: values.file
              }
            });
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            phone: Yup.string()
              .test(
                "len",
                "Must be exactly 10 characters",
                val => val && val.length && val.length <= 10
              )
              .required("Required"),
            zip: Yup.string()
              .test(
                "len",
                "Must be exactly 10 characters",
                val => val && val.length && val.length <= 10
              )
              .required("Required"),
            address: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email addresss`")
              .required("Required")
          })}
        >
          <Form>
            <MyTextInput
              label="Name"
              name="name"
              type="text"
              placeholder="Jane"
            />
            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />
            <MyTextInput
              label="Phone"
              name="phone"
              type="number"
              placeholder="1234567890"
            />
            <MyTextInput
              label="Address"
              name="address"
              type="text"
              placeholder="1234567890"
            />
            <MyTextInput
              label="Zip Code"
              name="zip"
              type="number"
              placeholder="1223456"
            />
            <MyTextInput
              label="file"
              name="file"
              type="file"
              placeholder="1223456"
            />
            {/* <div className="form-group">
                  <label htmlFor="file">File upload</label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={event => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                    className="form-control"
                  />
                  <Thumb file={values.file} />
                </div> */}
            <button type="submit" className="btn btn-primary mt-2">
              submit
            </button>
          </Form>
        </Formik>
      </div>
    );
 
};

export default App;
