import { Tabs } from "antd";
import NavBar from "../../components/NavBar/NavBar";
import "./Request.css";
import FundingRequest from "./FundingRequest";
import SpotRequest from "./SpotRequest";
import Footer from "../../components/Footer/Footer";
import useAuth from "../../hooks/useAuth";
import ErrorPage from "../ErrorPage/ErrorPage";

const Request = () => {
  const {email, role} = useAuth();
  if(!email || role !== "admin"){
    return <ErrorPage />
  }
  return (
    <>
      <NavBar className="mb-4" />
      <div className="container request-title">
        <Tabs defaultActiveKey="1" className="request">
          <Tabs.TabPane tab="Funding" key="1">
            <FundingRequest />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Spot" key="2">
            <SpotRequest />
          </Tabs.TabPane>
        </Tabs>
        <Footer />
      </div>
    </>
  );
};

export default Request;
