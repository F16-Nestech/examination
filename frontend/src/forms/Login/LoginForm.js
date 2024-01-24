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
        setTimeout(() => setSubmitting(false), 3000);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex w-full max-w-[500px] flex-col rounded-md bg-white px-12 pb-6 pt-4 md:w-1/2">
          <h1 className="mb-4 w-full text-center text-2xl">Đăng nhập</h1>
          <label name="username" className="mt-4 text-left">
            Username*
          </label>
          <Field
            type="username"
            name="username"
            className="rounded-md border-2 p-2"
          />
          <ErrorMessage
            name="username"
            component="div"
            className="w-full text-right text-red-600"
          />
          <label name="password" className="mt-4 text-left">
            Password*
          </label>
          <Field
            type="password"
            name="password"
            className="rounded-md border-2 p-2"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="w-full text-right text-red-600"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 rounded-md bg-green-400 p-2 text-white"
          >
            Sign in
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
