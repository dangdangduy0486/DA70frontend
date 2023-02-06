import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

import "./Login.css";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";

const Login = () => {
  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      localStorage.setItem("token", accessToken);
      toast.success("Login success");
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup.string()
  //       .required("Required")
  //       .matches(
  //         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //         "Please enter your email"
  //       ),
  //     password: Yup.string()
  //       .required("Required")
  //       .matches(
  //         /^[A-Za-z]\w{7,14}$/,
  //         "Input Password and Submit [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter "
  //       ),
  //   }),
  //   onSubmit,
  // });

  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    <>
      {/* <section className="vh-100% gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center">
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
                  <div className="card-body p-3 text-center">
                    <div className="mb-md-3 mt-md-4">
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your email and password!
                      </p>

                      <div className="form-outline form-white mb-4">
                        <label htmlFor="email" className="form-lable">
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
                        {formik.errors.email && (
                          <span className="error">{formik.errors.email}*</span>
                        )}
                      </div>

                      <div className="form-outline form-white mb-4">
                        <label htmlFor="password" className="form-lable">
                          Your password
                        </label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          className="form-control"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                        ></input>
                        {formik.errors.password && (
                          <span className="error">
                            {formik.errors.password}*
                          </span>
                        )}
                      </div>

                      <p className="small mb-2 pb-lg-2">
                        <Link className="text-white-50" to="/forgot">
                          Forgot password?
                        </Link>
                      </p>

                      <button
                        className="form-submit btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>

                      <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white">
                          <i className="fab fa-facebook-f fa-lg"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                        </a>
                        <a href="#!" className="text-white">
                          <i className="fab fa-google fa-lg"></i>
                        </a>
                      </div>
                    </div>

                    <div>
                      <p className="mb-0">
                        Don't have an account?
                        <Link to="/signup" className="text-white-50 fw-bold">
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className="public">
        <header>
          <h1>Employee Login</h1>
        </header>
        <main className="login">
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>

          <form className="form" onSubmit={onSubmit}>
            <label htmlFor="email">Username:</label>
            <input
              className="form__input"
              type="text"
              id="email"
              ref={userRef}
              value={email}
              onChange={handleEmailInput}
              autoComplete="off"
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              className="form__input"
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />
            <button className="form__submit-button">Sign In</button>
          </form>
        </main>
        <footer>
          <Link to="/">Back to Home</Link>
        </footer>
      </section> */}
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4">
                <Link to="/" className="text-white-50 fw-bold">
                  <i
                    className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                    style={{ color: "#709085" }}
                  ></i>
                </Link>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form style={{ width: "23rem" }} onSubmit={onSubmit}>
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Log in
                  </h3>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      ref={userRef}
                      value={email}
                      onChange={handleEmailInput}
                      autoComplete="off"
                      required
                    />
                    <label className="form-label" for="email">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      onChange={handlePwdInput}
                      value={password}
                      required
                    />
                    <label className="form-label" for="password">
                      Password
                    </label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-info btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <Link to="/forgot" className="text-white-50 fw-bold">
                      Forgot password
                    </Link>
                  </p>
                  <p>
                    Don't have an account?
                    <Link to="/signup" className="text-white-50 fw-bold">
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                alt="Loginimg"
                className="w-100 vh-100"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
