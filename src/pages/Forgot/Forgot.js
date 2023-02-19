import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Forgot.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import NavBar from "../../components/NavBar/NavBar";
import { toast } from "react-toastify";

const Forgot = () => {
  const history = useNavigate();
  const url = "api/auth/forgot-password";
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
  const onSubmit = async (values) => {
    const { email } = values;
    try {
      await axios
        .post(url, { email }, opts)
        .then(() => {
          toast.warning("Please check your email!!");
          history("/login");
        })
        .catch((error) => {
          console.log(error);
          if (error && error.response) toast.error(error);
        });
    } catch (error) {
      toast.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please enter your email"
        ),
    }),
    onSubmit,
  });

  return (
    <>
      <NavBar />
      <section className="forgot">
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
                  <h3 className="heading text-center">Forgot password</h3>
                  <p className="infor">Welcome to DBcoin</p>
                  <div className="form-group">
                    <label htmlFor="email" className="form-lable text-white-50">
                      Your email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="form-control"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    ></input>
                  </div>
                  <button className="btn btn-login" type="submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Forgot;
