import axios from "axios";
import { Field, Form, Formik, useFormik } from "formik";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { IsAuthContext } from "../context/IsAuthContext";

export default function Login(props) {
  const { close } = props;
  const { login } = useContext(IsAuthContext);
  const handleClose = () => {
    close();
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email must be xxxx@example.com")
        .required("Required"),
      password: Yup.string().min(8, "must be at least 8").required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(
          "http://localhost:3000/user/login",
          values
        );
        if (response.data.response.statusCode === 401) {
          console.log("failed");
        } else {
          login();
          const { token, user } = response.data;
          localStorage.setItem("token", token);
          //localStorage.setItem("userposts", user.posts);
          console.log(user.posts);
          close();
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex border rounded-3xl w-3/5 bg-white  h- mx-auto">
      <div className="relative align-top">
        <div className="border  border-red-400">
          <img
            className="w-80"
            src="https://images.pexels.com/photos/586687/pexels-photo-586687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </div>
        <div className="absolute   left-0 top-0 w-full h-full bg-black bg-opacity-25 "></div>
      </div>
      <div className=" w-1/2 mx-auto d flex flex-col items-center pt-5 gap-10 ">
        <div className=" w-full flex justify-end">
          <button onClick={() => handleClose()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="brown"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <Formik
          onSubmit={formik.handleSubmit}
          initialValues={formik.initialValues}
          validationSchema={formik.validationSchema}
        >
          <Form className="w-full flex flex-col  justify-center px-4 ">
            <h1 className="text-yellow-800 font-bold  text-center text-3xl">
              Log In
            </h1>
            <Field name="email">
              {({ field }) => (
                <label className="input my-3 mx-auto input-bordered flex items-center gap-2 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    {...field}
                    className="grow"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </label>
              )}
            </Field>
            {formik.touched.email && formik.errors.email ? (
              <div className="w-1/2 px-3 text-red-600">
                {formik.errors.email}
              </div>
            ) : null}
            <Field name="password">
              {({ field }) => (
                <label className="input my-3 mx-auto input-bordered flex items-center gap-2 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    {...field}
                    type="password"
                    className="grow"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </label>
              )}
            </Field>
            {formik.touched.password && formik.errors.password ? (
              <div className="w-1/2 px-3 text-red-600">
                {formik.errors.password}
              </div>
            ) : null}
            <div className="flex flex-col items-center justify-center ">
              <button
                type="submit"
                className=" btn rounded-2xl bg-yellow-800 text-white mx-auto  mt-5  px-2 py-2 w-3/4  hover:border-yellow-800 hover:text-yellow-800 hover:bg-white  "
                disabled={!formik.isValid}
              >
                Sign In
              </button>
              <div className=" w-3/4 flex justify-end py-2">
                <span className="text-xs text-yellow-800">
                  Don't have an account?{" "}
                </span>
                <span className="text-xs  text-yellow-800 font-bold">
                  <Link to="/register"> Sign Up</Link>
                </span>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
