"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { instance, setBaseUrl } from "@/src/axios";

const ClientPage = ({ params }: { params: { uuid: string; slug: string } }) => {
    const [loading, setLoading] = useState(false);
    const [htmlResponse, setHtmlResponse] = useState("");

    // https://test-api.ssv.uz/v2/MedicalCertificate/forms/check/{id} -> 083
    // https://test-api.ssv.uz/v2/SickLeave/forms/check/{id} -> Больничный лист

    // https://test-api.ssv.uz/v2/MedicalCertificate/forms/083/{id}
    // https://test-api.ssv.uz/v2/MedicalCertificate/forms/SickLeave/{id}

    useEffect(() => {
        const { slug } = params;

        if (slug === "form083") {
            setBaseUrl(process.env.NEXT_PUBLIC_FORM083_API_URL as string);
        } else if (slug === "sick-leave") {
            setBaseUrl(process.env.NEXT_PUBLIC_SICKLEAVE_API_URL as string);
        }
    }, [params]);

    const formik = useFormik({
        initialValues: {
            code: "",
        },

        onSubmit: async (values, { resetForm, setErrors }) => {
            try {
                const response = await instance.post(`/${params?.uuid}`, {
                    code: values.code,
                });
                setLoading(true);

                if (response.status === 200) {
                    setLoading(false);
                    setHtmlResponse(response.data);
                    resetForm();
                }
            } catch ({ response }: any) {
                console.log(response);
                setErrors({ code: "Неверный код" });
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
                    <div
                        dangerouslySetInnerHTML={{ __html: htmlResponse }}
                        id="pdf"
                    />
                </>
            ) : (
                <div className="flex items-center justify-center h-screen flex-col">
                    <div className="flex items-center mb-16">
                        <img src="/logo.png" alt="logo" className="mr-4" />
                        <p>
                            Министерство здравоохранения
                            <br />
                            Республики Узбекистан
                        </p>
                    </div>

                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                        <form
                            className="flex justify-center flex-col"
                            onSubmit={formik.handleSubmit}
                        >
                            <label className="block text-gray-700 text-md font-medium mb-4 relative">
                                <span className="mb-2 flex">
                                    Код подтверждения
                                </span>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-2xl text-center"
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
                                    <div className="text-red-500 text-sm absolute -bottom-6 font-normal">
                                        {formik.errors.code}
                                    </div>
                                ) : null}
                            </label>
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
