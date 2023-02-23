import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoinSign } from "@fortawesome/free-solid-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./NavBar.css";
import MenuProfile from "../MenuProfile/MenuProfile";
import useAuth from "../../hooks/useAuth";
import CurrencyDetails from "../CurrencyDetails/CurrencyDetails";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = (props) => {
  const [vsCurrency, setVsCurrency] = useState("usd");
  // useEffect(() => {
  //   currencyCallback();
  // }, [vsCurrency]);

  const currencyCallback = async (childData) => {
    if (childData) {
      await setVsCurrency(childData);
      await props.currencyFr(childData);
      console.log(childData);
    } else {
      // setVsCurrency("usd")
      await props.currencyFr(vsCurrency);
    }
  };

  const { email } = useAuth();
  console.log(email);

  /*********************/

  /*********************/

  return (
    <>
      <Navbar expand="lg" className="bg-light navbar">
        <Container fluid>
          <Link style={{ textDecoration: "none" }} to="/">
            <Navbar.Brand>
              <FontAwesomeIcon className="text-warning" icon={faBitcoinSign} />
              DBcoin
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto meune_collapse1">
              <Link style={{ textDecoration: "none" }} to="/markets">
                <Nav.Link href="/market">Markets</Nav.Link>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/p2p-trading">
                <Nav.Link href="/p2p-trading">P2P</Nav.Link>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/all-coins">
                <Nav.Link href="/all-coins">All coins</Nav.Link>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/transactions">
                <Nav.Link href="/transactions">Transactions</Nav.Link>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/aboutus">
                <Nav.Link href="/transactions">About us</Nav.Link>
              </Link>
              <Nav.Item>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Exchanges
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        style={{ textDecoration: "none" }}
                        to="/exchanges"
                      >
                        Crypto Exchanges
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        style={{ textDecoration: "none" }}
                        to="/exchanges/derivatives"
                      >
                        Derivatives
                      </Link>
                    </li>
                  </ul>
                </li>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <Nav className="bao111">
            <SearchBar />
            <CurrencyDetails
              currencyFr={currencyCallback}
              vsCurrency={vsCurrency}
            />
          </Nav>
          {email ? (
            <>
              <Nav className="me-0 menu-right">
                {/* <Link style={{ textDecoration: "none" }} to="/">
                  <Button
                    className="btn"
                    variant="outline-warning"
                    onClick={sendLogout}
                  >
                    Logout
                  </Button>
                </Link> */}
                {/* <span className="money">money</span> */}
                <MenuProfile className="menu-profile" email={email} />
                <Link
                  style={{ textDecoration: "none", alignSelf: "center" }}
                  to="/funding"
                >
                  <FontAwesomeIcon
                    icon={faSackDollar}
                    className="btn ms-2 btn-cart"
                    variant="outline-warning"
                    type="button"
                  />
                </Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="me-0 menu-right">
                <Link style={{ textDecoration: "none" }} to="/login">
                  <Nav.Link href="/Login">Login</Nav.Link>
                </Link>
                <Link
                  style={{ textDecoration: "none", marginLeft: "1rem" }}
                  to="/signup"
                >
                  <Button variant="outline-warning">Signup</Button>
                </Link>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
