import React, { useState, useEffect } from "react";
import { Link, useNavigation } from "react-router-dom";
import axios from "axios";
import "./MenuProfile.css";
import profile from "../../images/profile.svg";
import info from "../../images/infor.svg";
import { useGetUserQuery } from "../../features/user/userApiSlice";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import useAuth from "../../hooks/useAuth";

const MenuProfile = ({ email }) => {
  const { data, isLoading, isError } = useGetUserQuery(email);
  const [sendLogout] = useSendLogoutMutation();

  const { role } = useAuth();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("app/token");
    await sendLogout;
    window.location.reload(false);
  };

  if (!data || isLoading || isError) return null;

  return (
    <>
      <div className="dropstart menu-profile">
        <img
          className="btn dropdown-toggle img_user"
          type="button"
          id="dropdownMenuProfile"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          src={profile}
          alt=""
        ></img>
        <ul
          className="dropdown-menu dropdown-menu-profile"
          aria-labelledby="dropdownMenuProfile"
        >
          <li>
            <Link to="/user-info" state={{ data }} className="sub-menu-link">
              <img src={info} alt="" />
              <p>{data.user.fullname}</p>
              <span></span>
            </Link>
          </li>
          <li>
            <Link to="/userbudget" className="sub-menu-link">
              <img src={info} alt="" />
              <p>Wallet</p>
              <span></span>
            </Link>
          </li>
          {role === "admin" ? (
            <>
              <li>
                <Link to="/usermanagement" className="sub-menu-link">
                  <img src={info} alt="" />
                  <p>User Management</p>
                  <span></span>
                </Link>
              </li>
              <li>
                <Link to="/request" className="sub-menu-link">
                  <img src={info} alt="" />
                  <p>Request</p>
                  <span></span>
                </Link>
              </li>
            </>
          ) : null}
          <li>
            <Link style={{ textDecoration: "none" }} to="/">
              <p className="text-danger" onClick={handleLogout}>
                Logout
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuProfile;
