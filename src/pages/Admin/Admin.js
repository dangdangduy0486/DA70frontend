import "./Admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profile from "../../images/profile.svg";
import recharge from "../../images/recharge.svg";
import coins from "../../images/coin.svg";
import trading from "../../images/trading.svg";
import users from "../../images/users.svg";
import { faBitcoinSign } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
const AdminPage = () => {
  return (
    <>
      <section className="container_admin">
        <div className="side-menu">
          <div className="brand">
            <div>
              <FontAwesomeIcon className="text-warning" icon={faBitcoinSign} />
              <span>DBcoin</span>
            </div>
          </div>
          <ul>
            <li>
              <FontAwesomeIcon icon={faHome} /> &nbsp;<span>Dashboard</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faUser} /> &nbsp;<span>User</span>
            </li>

            <li>
              <FontAwesomeIcon icon={faMoneyBill} /> &nbsp;<span>Recharge</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faArrowRightArrowLeft} /> &nbsp;
              <span>Trading</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCoins} /> &nbsp;<span>Coins</span>
            </li>
          </ul>
        </div>
        <div className="container_page">
          <div className="header">
            <div className="navbar1">
              <div className="admin_profile">
                <Button className="btn" variant="outline-warning">
                  Logout
                </Button>
                <img className="img_user" src={profile} alt=""></img>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="cards">
              <div className="card_infor">
                <div className="box p-1">
                  <h3>2194</h3>
                  <h5>Students</h5>
                </div>
                <div className="img_box">
                  <img src={users} alt="" className="user11" />
                </div>
              </div>
              <div className="card_infor">
                <div className="box">
                  <h3>2194</h3>
                  <h5>Recharge</h5>
                </div>
                <div className="img_box">
                  <img src={recharge} alt="" className="user11" />
                </div>
              </div>
              <div className="card_infor">
                <div className="box">
                  <h3>2194</h3>
                  <h5>Trading</h5>
                </div>
                <div className="img_box">
                  <img src={trading} alt="" className="user11" />
                </div>
              </div>
              <div className="card_infor">
                <div className="box">
                  <h3>2194</h3>
                  <h5>Coins</h5>
                </div>
                <div className="img_box">
                  <img src={coins} alt="" className="user11" />
                </div>
              </div>
            </div>
            <div className="content-2">
              <div className="users_table">
                <div className="title">
                  <h2>Users</h2>
                  <a href="#" className="btn">
                    View All
                  </a>
                </div>
                <table>
                  <tr>
                    <th>Name</th>
                    <th>School</th>
                    <th>Amount</th>
                    <th>Option</th>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>St. James College</td>
                    <td>$120</td>
                    <td>
                      <a href="#" className="btn">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>St. James College</td>
                    <td>$120</td>
                    <td>
                      <a href="#" className="btn">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>St. James College</td>
                    <td>$120</td>
                    <td>
                      <a href="#" className="btn">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>St. James College</td>
                    <td>$120</td>
                    <td>
                      <a href="#" className="btn">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>St. James College</td>
                    <td>$120</td>
                    <td>
                      <a href="#" className="btn">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>St. James College</td>
                    <td>$120</td>
                    <td>
                      <a href="#" className="btn">
                        View
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
              <div className="request_table">
                <div className="title">
                  <h2>Users</h2>
                  <a href="#" className="btn">
                    View All
                  </a>
                </div>
                <table>
                  <tr>
                    <th>Name</th>
                    <th>School</th>
                    <th>Amount</th>
                    <th>Option</th>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>St. James College</td>
                    <td>$120</td>
                    <td>
                      <a href="#" className="btn">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>St. James College</td>
                    <td>$120</td>
                    <td>
                      <a href="#" className="btn">
                        View
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>John Doe</td>
                    <td>St. James College</td>
                    <td>$120</td>
                    <td>
                      <a href="#" className="btn">
                        View
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default AdminPage;
