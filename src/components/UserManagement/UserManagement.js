import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../NavBar/NavBar";
import Loading from "../../pages/Loading/Loading";
import useAuth from "../../hooks/useAuth";
import {
  useGetAllUserQuery,
  usePatchUserByAdminMutation,
  useDeleteUserByAdminMutation,
} from "../../features/user/userApiSlice";
import { toast } from "react-toastify";
import moment from "moment/moment";
import Footer from "../Footer/Footer";
import "./UserManagement.css";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [userFullname, setUserFullname] = useState();

  const { email, role } = useAuth();
  const { data } = useGetAllUserQuery(email);

  const [patchUserByAdmin] = usePatchUserByAdminMutation();
  const [deleteUserByAdmin] = useDeleteUserByAdminMutation();

  const handleEditUserName = (e) => {
    setUserFullname(e.target.value);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();

    try {
      await patchUserByAdmin({
        email: selectedUser.email,
        fullname: userFullname,
      }).unwrap();
      toast.success("Edit user success!!");
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      if (error.status === 500) {
        return null;
      } else {
        toast.error(error.data.message);
      }
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();

    try {
      await deleteUserByAdmin({
        email: selectedUser.email,
      }).unwrap();
      toast.success("Delete user success!!");
      setTimeout(() => {
        window.location.reload(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      if (error.status === 500) {
        return null;
      } else {
        toast.error(error.data.message);
      }
    }
  };

  if (!email || role !== "admin") {
    return <ErrorPage />;
  }
  if (!data) return <Loading />;
  return (
    <>
      <NavBar />
      <div className="shadow-lg p-3 bg-body ">
        <div>
          <div className="col-8 text-center">
            <h2>User List</h2>
          </div>
        </div>
        <div>
          <div className="user-management-table-container">
            <table className="table table-striped table-hover table-bordered user-management-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name </th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.members.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.fullname}</td>
                      <td>
                        <span className="me-2">{user.email}</span>
                        <span
                          className={`${
                            user.role === "member"
                              ? "text-success"
                              : "text-danger"
                          } `}
                        >
                          ({user.role})
                        </span>
                      </td>
                      <td>{moment(user.createdAt).fromNow()}</td>
                      <td>
                        <span className="me-4">
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            data-bs-toggle="modal"
                            data-bs-target="#editUserModal"
                            onClick={() => {
                              const selectedUser = user;
                              setSelectedUser(selectedUser);
                            }}
                          ></FontAwesomeIcon>
                        </span>
                        <span>
                          <FontAwesomeIcon
                            icon={faTrash}
                            data-bs-toggle="modal"
                            data-bs-target="#deleteUserModal"
                            onClick={() => {
                              const selectedUser = user;
                              setSelectedUser(selectedUser);
                            }}
                          ></FontAwesomeIcon>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* <!-- Edit Modal --> */}
        <div
          className="modal fade"
          id="editUserModal"
          tabindex="-1"
          aria-labelledby="editUserModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editUserModalLabel">
                  Edit User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleEditUser}>
                <div className="modal-body">
                  <p>Email: {selectedUser ? selectedUser.email : ""}</p>
                  <label htmlFor="editFullName" className="form-label me-2">
                    Fullname:
                  </label>
                  <input
                    name="editFullName"
                    id="editFullName"
                    placeholder={selectedUser ? selectedUser.fullname : ""}
                    onChange={handleEditUserName}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <!-- delte Modal --> */}
        <div
          className="modal fade"
          id="deleteUserModal"
          tabindex="-1"
          aria-labelledby="deleteUserModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteUserModalLabel">
                  Do you want to delete this user?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleDeleteUser}>
                <div className="modal-body">
                  <p>Email: {selectedUser ? selectedUser.email : ""}</p>
                  <p>Fullname: {selectedUser ? selectedUser.fullname : ""}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <!--- Model Box ---> */}
      </div>
      <Footer />
    </>
  );
};

export default UserManagement;
