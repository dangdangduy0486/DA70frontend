import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment/moment";
import profile from "../../images/profile.svg";
import NavBar from "../../components/NavBar/NavBar";
import "./UserInfo.css";
import {
  useGetUserQuery,
  usePatchUserInfoMutation,
} from "../../features/user/userApiSlice";
import Loading from "../Loading/Loading";

const UserInfor = () => {
  const [fullname, setFullname] = useState();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const { data } = useGetUserQuery();

  const handleUploadAvatar = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "kk8ahgee");
    data.append("cloud_name", "dcf2owvja");
    axios
      .post("https://api.cloudinary.com/v1_1/dcf2owvja/image/upload", data)
      .then((response) => {
        setImageUrl(response.data.secure_url);
        toast.success("Upload success");
      })
      .catch((err) => {
        toast.error(err.response.data.error.message);
      });
  };

  const [patchUserInfo] = usePatchUserInfoMutation();

  const handleEditInfo = async (e) => {
    e.preventDefault();
    try {
      await patchUserInfo({
        fullname: fullname,
        image: imageUrl,
      }).unwrap();
      window.location.reload(false);
      toast.success("Successfully changed information");
    } catch (error) {
      if (error.status === 500) {
        return null;
      } else {
        toast.error(error.data.message);
      }
    }
  };

  if (!data) return <Loading />;
  let parser = new DOMParser();
  let doc = parser.parseFromString(data.QR, "text/html");
  document.getElementsByClassName("QRCode_container").innerHTML = doc;
  return (
    <>
      <NavBar />
      <section className="page_userinfo ">
        <div className="userinfo_container">
          <div className="card">
            <div className="card-header">
              <img
                src={
                  data.user.image
                    ? data.user.image
                    : process.env.PUBLIC_URL + profile
                }
                alt=""
              />
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <p>
                  <span className="me-1 ">You have been a member since</span>
                  {moment(data.user.createdAt).fromNow()}
                </p>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  data-bs-toggle="modal"
                  data-bs-target="#qrcodeModal"
                >
                  Generate QR code
                </button>
                {/* <!-- Modal --> */}
                <div
                  class="modal fade"
                  id="qrcodeModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-body">
                        <div className="QRCode_container d-flex justify-content-center">
                          <div dangerouslySetInnerHTML={{ __html: data.QR }} />
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-outline-success"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleEditInfo}>
                <div className="user-form">
                  <div class="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder={data.user.email}
                      value={data.user.email}
                      disabled
                    />
                    <label htmlFor="floatingEmail">Email</label>
                  </div>
                </div>
                <div className="user-form">
                  <div class="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingName"
                      onChange={(e) => setFullname(e.target.value)}
                    />
                    <label htmlFor="floatingName">
                      Full name: {data.user.fullname}
                    </label>
                  </div>
                </div>
                <div className="user-form">
                  <div className="button-wrap">
                    <label className="button" for="upload">
                      Upload File
                    </label>
                    <input
                      id="avatar"
                      type="file"
                      name="avatar"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={handleUploadAvatar}
                    >
                      Upload avatar
                    </button>
                  </div>
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
        </div>
      </section>
    </>
  );
};

export default UserInfor;
