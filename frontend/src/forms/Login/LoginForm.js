import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginUser } from "reduxConf/apiRequest.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = "Bạn chưa nhập username";
        }
        if (!values.password) {
          errors.password = "Bạn chưa nhập password";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const newUser = {
          username: values.username,
          password: values.password,
        };
        setSubmitting(true);
        loginUser(newUser, dispatch, navigate);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col w-full md:w-1/2 px-12 pt-4 pb-6 rounded-md bg-white max-w-[500px]">
          <h1 className="text-2xl w-full text-center mb-4">Đăng nhập</h1>
          <label name="username" className="text-left mt-4">
            Username*
          </label>
          <Field
            type="username"
            name="username"
            className="rounded-md p-2 border-2"
          />
          <ErrorMessage
            name="username"
            component="div"
            className="text-red-600 text-right w-full"
          />
          <label name="password" className="text-left mt-4">
            Password*
          </label>
          <Field
            type="password"
            name="password"
            className="rounded-md p-2 border-2"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-600 text-right w-full"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 bg-green-400 p-2 rounded-md"
          >
            Sign in
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
