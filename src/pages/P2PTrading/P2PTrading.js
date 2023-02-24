import React from "react";
import { Tabs } from "antd";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import P2PBuy from "./P2PBuy";
import P2PSell from "./P2PSell";
import P2PRequest from "./P2PRequest";
import "./P2PTrading.css";
import P2PPost from "./P2PPost";

const P2PTrading = () => {
  const callback = () => {};
  return (
    <>
      <NavBar currencyFr={callback} />
      <section className="tradingtopeople bg-light p-2">
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Create" key="1" className="tabs_create">
            <P2PPost />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Buy" key="2">
            <P2PBuy />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Sell" key="3">
            <P2PSell />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Check your request" key="4">
            <P2PRequest />
          </Tabs.TabPane>
        </Tabs>
      </section>
      <Footer />
    </>
  );
};

export default P2PTrading;
