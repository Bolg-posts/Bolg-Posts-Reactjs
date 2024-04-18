import { Field, Form, Formik, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../interceptor/interceptor";
import { data } from "autoprefixer";

export default function UpdatePostForm(props) {
  const { handleUpdatePost } = props;
  const navigate = useNavigate();
  const [initialvalues, setInitialvalues] = useState({
    image: "",
    title: "",
    description: "",
  });

  const { id } = useParams();
  //   console.log(id);

  useEffect(() => {
    async function getPostData() {
      const { data } = await axiosInstance.get(
        `http://localhost:3000/posts/${id}`
      );
      setInitialvalues({
        image: data.image,
        title: data.title,
        description: data.description,
      });
    }
    getPostData();
  }, []);

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      image: Yup.string().required("Required"),
      title: Yup.string().min(3, "Must be at least 3").required("Required"),
      description: Yup.string()
        .min(3, "Must be at leat 3")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      handleUpdatePost(values);
      try {
        const response = await axiosInstance.put(
          `http://localhost:3000/posts/${id}`,
          values
        );
        if (response.data.response.statusCode === 200) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
    enableReinitialize: true,
  });
  return (
    <Formik
      onSubmit={formik.handleSubmit}
      initialValues={formik.initialValues}
      validationSchema={formik.validationSchema}
    >
      <Form className="w-3/5 m-auto mt-3.5 py-12 flex flex-col">
        <div className="border w-1/2 mx-auto">
          <img src={initialvalues.image} alt="image" />
        </div>
        <Field
          name="image"
          type="text"
          className="input mx-auto my-4 input-bordered grow flex items-center w-1/2"
          placeholder="Image"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.image}
        />
        {formik.touched.image && formik.errors.image ? (
          <div className="mx-auto w-1/2 px-3 text-red-600">
            {formik.errors.image}
          </div>
        ) : null}
        <Field
          name="title"
          type="text"
          className="input mx-auto  my-4 input-bordered grow flex items-center w-1/2"
          placeholder="Title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="mx-auto w-1/2 px-3 text-red-600">
            {formik.errors.title}
          </div>
        ) : null}
        <Field
          name="description"
          as="textarea"
          className="textarea mx-auto  my-4 textarea-bordered textarea-sm w-1/2 "
          placeholder="Description..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="mx-auto w-1/2 px-3 text-red-600">
            {formik.errors.description}
          </div>
        ) : null}
        <button
          type="submit"
          className=" btn border bg-yellow-800 text-white mx-auto  mt-10 rounded-2xl px-2 py-2 w-48  hover:border-yellow-800 hover:text-yellow-800 hover:bg-white  "
          disabled={!formik.isValid}
        >
          Update
        </button>
      </Form>
    </Formik>
  );
}
