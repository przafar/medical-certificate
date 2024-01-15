"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const ClientPage = ({ params }: { params: { uuid: string } }) => {
  const [loading, setLoading] = useState(false);
  const [htmlResponse, setHtmlResponse] = useState("");

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          `${process.env.apiURL}/forms/check/${params?.uuid}`,
          {
            code: values.code,
          },
        );
        setLoading(true);

        if (response.status === 200) {
          setLoading(false);
          setHtmlResponse(response.data);
          resetForm();
        }
      } catch ({ response }: any) {
        toast.error(response?.data?.message);
      }
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required("Необходимо заполнить")
        .min(4, "Пароль должен быть не менее 4 символов")
        .max(4, "Должно быть не более 4 символов."),
    }),
  });

  useEffect(() => {
    if (htmlResponse) {
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }, [htmlResponse]);

  return (
    <>
      <title>{params?.uuid}</title>
      {htmlResponse ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: htmlResponse }} id="pdf" />
        </>
      ) : (
        <div className="flex items-center justify-center h-screen flex-col">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
            <form
              className="flex justify-center flex-col"
              onSubmit={formik.handleSubmit}
            >
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Код подтверждения
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Введите код"
                id="code"
                maxLength={4}
                name="code"
                onChange={formik.handleChange}
                value={formik.values.code}
                onBlur={formik.handleBlur}
              />

              {formik.touched.code && formik.errors.code ? (
                <div className="text-red-500 text-sm">{formik.errors.code}</div>
              ) : null}

              <button
                disabled={loading}
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? "Загрузка..." : "Подвердить"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientPage;
