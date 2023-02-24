import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { usePatchNewPasswordMutation } from "../../features/user/userApiSlice";
const NewPassword = () => {
  const history = useNavigate();
  const { email } = useParams();

  const [patchNewPassword] = usePatchNewPasswordMutation();

  const onSubmit = async (values) => {
    const { newpassword } = values;
    try {
      await patchNewPassword({ email, newpassword }).unwrap();
      toast.success("Change password completed!!");
      history("/login");
    } catch (error) {
      if (error.status === 500) {
        return null;
      } else {
        toast.error(error.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      newpassword: "",
      newpassword_confi: "",
    },
    validationSchema: Yup.object({
      newpassword: Yup.string()
        .required("Required")
        .matches(
          /^[A-Za-z]\w{7,14}$/,
          "Input Password and Submit [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter "
        ),
      newpassword_confi: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("newpassword"), null], "Password must be matched"),
    }),
    onSubmit,
  });
  return (
    <section className="vh-100% gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <form
                className="form bg-dark text-center "
                id="form_signup"
                onSubmit={formik.handleSubmit}
              >
                <h3 className="heading text-center">New Password</h3>
                <p className="infor">Welcome to DBcoin</p>
                <div className="form-group">
                  <label htmlFor="newpassword" className="form-lable">
                    Your new password
                  </label>
                  <input
                    id="newpassword"
                    name="newpassword"
                    type="password"
                    placeholder="Enter your new password"
                    className="form-control"
                    value={formik.values.newpassword}
                    onChange={formik.handleChange}
                  ></input>
                  {formik.errors.newpassword && (
                    <span className="error">{formik.errors.newpassword}*</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="newpassword_confi" className="form-lable">
                    Renter your new password
                  </label>
                  <input
                    id="newpassword_confi"
                    name="newpassword_confi"
                    type="password"
                    placeholder="Re-enter your new password"
                    className="form-control"
                    value={formik.values.newpassword_confi}
                    onChange={formik.handleChange}
                  ></input>
                  {formik.errors.newpassword_confi && (
                    <span className="error">
                      {formik.errors.newpassword_confi}*
                    </span>
                  )}
                </div>
                <button
                  className="form-submit btn btn-outline-light btn-lg px-5"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewPassword;
