import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { usePostSignUpMutation } from "../../features/user/userApiSlice";

const Signup = () => {
  const history = useNavigate();

  const [postSignUp] = usePostSignUpMutation();

  const onSubmit = async (values) => {
    const { fullname, email, password } = values;
    try {
      await postSignUp({ fullname, email, password }).unwrap();
      toast.success("Sign up success");
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
      fullname: "",
      email: "",
      password: "",
      password_confi: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .required("Required")
        .min(4, "Your name must more than 4 characters"),
      email: Yup.string()
        .required("Required")
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please enter your email"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^[A-Za-z]\w{7,14}$/,
          "Input Password and Submit [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter "
        ),
      password_confi: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must be matched"),
    }),
    onSubmit,
  });
  return (
    <>
      <section className="main">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 p-1">
              <form
                className="form bg-dark text-center "
                id="form_signup"
                onSubmit={formik.handleSubmit}
              >
                <h3 className="heading text-center">Sign up</h3>
                <p className="infor">Welcome to DBcoin</p>
                <div className="spacer"></div>
                <div className="form-group">
                  <label
                    htmlFor="fullname"
                    className="form-lable text-white-50"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    name="fullname"
                    type="text"
                    placeholder="Enter your fullname"
                    className="form-control"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                  ></input>
                  {formik.errors.fullname && (
                    <span className="error">{formik.errors.fullname}*</span>
                  )}
                </div>
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
                  {formik.errors.email && (
                    <span className="error">{formik.errors.email}*</span>
                  )}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="password"
                    className="form-lable text-white-50"
                  >
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
                    <span className="error">{formik.errors.password}*</span>
                  )}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="password_confi"
                    className="form-lable text-white-50"
                  >
                    Re-enter your password
                  </label>
                  <input
                    id="password_confi"
                    name="password_confi"
                    type="password"
                    placeholder="Re-enter your password"
                    className="form-control"
                    value={formik.values.password_confi}
                    onChange={formik.handleChange}
                  ></input>
                  {formik.errors.password_confi && (
                    <span className="error">
                      {formik.errors.password_confi}*
                    </span>
                  )}
                </div>
                <button className=" btn btn-login" type="submit">
                  Sign up
                </button>
                <div className="text-center mt-2">
                  <span className="text-white-50">
                    Already have an account?
                  </span>
                  <span className="space"> </span>
                  <Link className="text-white" to="/login">
                    Login
                  </Link>
                </div>
                <div className="text-center mt-2">
                  <span className="text-white-50">Back to home?</span>
                  <Link className="text-white" to="/" style={{ marginLeft: 2 }}>
                    Home
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
