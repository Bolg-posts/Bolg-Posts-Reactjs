import axios from "axios";
import { Field, Form, Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Must be at least 3").required("Required"),
      image: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(8, "must be at least 8").required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(
          "http://localhost:3000/user/register",
          values
        );
        if (response.data.response.statusCode === 200) {
          navigate("/login");
        } else {
          console.log("failed");
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex border rounded-3xl w-3/5 h- mx-auto">
      <Formik
        onSubmit={formik.handleSubmit}
        initialValues={formik.initialValues}
        validationSchema={formik.validationSchema}
      >
        <Form className="w-1/2 flex flex-col  mx-auto  justify-center px-4 ">
          <h1 className="text-yellow-800 font-bold  text-center text-3xl">
            Sign Up
          </h1>
          <Field name="image">
            {({ field }) => (
              <label className="input my-3 mx-auto input-bordered flex items-center gap-2 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 opacity-70"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

                <input
                  {...field}
                  type="text"
                  className="grow"
                  placeholder="Image"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.image}
                />
              </label>
            )}
          </Field>
          {formik.touched.image && formik.errors.image ? (
            <div className="w-1/2 px-3 text-red-600">{formik.errors.image}</div>
          ) : null}
          <Field name="name">
            {({ field }) => (
              <label className="input my-3 mx-auto input-bordered flex items-center gap-2 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  {...field}
                  type="text"
                  className="grow"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </label>
            )}
          </Field>
          {formik.touched.name && formik.errors.name ? (
            <div className="w-1/2 px-3 text-red-600">{formik.errors.name}</div>
          ) : null}
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
            <div className="w-1/2 px-3 text-red-600">{formik.errors.email}</div>
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
              Sign Up
            </button>
            <div className=" w-3/4 flex justify-end py-2">
              <span className="text-xs text-yellow-800">
                Alreay have an account?
              </span>
              <span className="text-xs  text-yellow-800 font-bold">
                <Link to="/login"> Sign In</Link>
              </span>
            </div>
          </div>
        </Form>
      </Formik>
      <div className="relative align-top">
        <div className="">
          <img
            className="w-80"
            src="https://images.pexels.com/photos/2108813/pexels-photo-2108813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </div>
        <div className="absolute  border left-0 top-0 w-full h-full bg-black bg-opacity-25 "></div>
      </div>
    </div>
  );
}
