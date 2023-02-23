import React from "react";
import moment from "moment/moment";
import UserManagement from "../../components/UserManagement/UserManagement";
import profile from "../../images/profile.svg";
import NavBar from "../../components/NavBar/NavBar";
import "./UserInfo.css";

import useAuth from "../../hooks/useAuth";
import { useGetUserQuery } from "../../features/user/userApiSlice";
import Loading from "../Loading/Loading";
import axios from "axios";

const UserInfor = () => {
  const { email, role } = useAuth();
  const { data } = useGetUserQuery();

  if (!data) return <Loading />;
  console.log(data);
  let parser = new DOMParser();
  let doc = parser.parseFromString(data.QR, "text/html");
  document.getElementsByClassName("QRCode_container").innerHTML = doc;
  const token = localStorage.getItem("token");
  const opts = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  console.log(token);
  const handleUploadAvatar = (e) => {
    e.preventDefault();

    axios
      .post("/api/user/user-info/upload", opts)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <NavBar />
      <section className="page_userinfo ">
        {role === "admin" ? (
          <>
            <UserManagement />
          </>
        ) : (
          <>
            <div className="userinfo_container">
              <div className="card">
                <div className="card-header">
                  <img src={process.env.PUBLIC_URL + profile} alt="" />
                </div>
                <div>
                  <form
                    onSubmit={handleUploadAvatar}
                    method="post"
                    enctype="multipart/form-data"
                  >
                    <input type="file" name="avatar" />
                    <button type="submit">Upload avatar</button>
                  </form>
                </div>
                <div className="card-body">
                  <p>
                    <span className="me-1">You have been a member since</span>
                    {moment(data.user.createdAt).fromNow()}
                  </p>
                  <form
                  // onSubmit={}
                  >
                    <div className="user-form">
                      <p className="m-1">Your email</p>
                      <input
                        className="w-100"
                        type="email"
                        value={data.user.email}
                        disabled
                      />
                    </div>
                    <div className="user-form">
                      <p className="m-1">Full name</p>
                      <input
                        className="w-100"
                        type="text"
                        placeholder={data.user.fullname}
                      />
                    </div>
                    <button
                      className="form-submit btn btn-outline-dark mt-2"
                      type="submit"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
              <div className="QRCode_container">
                <div dangerouslySetInnerHTML={{ __html: data.QR }} />
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default UserInfor;
