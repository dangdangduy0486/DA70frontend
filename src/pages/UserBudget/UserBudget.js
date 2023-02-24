import React from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import { Tabs } from "antd";

import "./UserBudget.css";
import Fiat from "../../components/Fiat/Fiat";
import Overview from "../../components/Overview/Overview";
const UserBudget = () => {
  return (
    <>
      <NavBar />
      <section className="userBudget">
        <Tabs defaultActiveKey="1" tabPosition="left" className="userBudget">
          <Tabs.TabPane tab="Overview" key="1">
            <Overview />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Fiat and Crypto Currencies" key="2" id="fiatspot">
            <Fiat />
          </Tabs.TabPane>
        </Tabs>
      </section>
      <Footer />
    </>
  );
};

export default UserBudget;
