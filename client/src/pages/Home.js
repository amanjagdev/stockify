import React from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../global/gloablState";

const Home = ({ history }) => {
  const user = useRecoilValue(userAtom);

  const handleCTA = () => {
    if (user) {
      history.push("/dashboard");
    } else {
      history.push("/signup");
    }
  };

  return (
    <div className="Home">
      <div className="header">
        <div className="left">
          <h1>Welcome to stockify</h1>
          <p>
            Store your warehouse stocks and get an all-automated stockholder
            registry, with complete security. The Stockify gives you a platform
            where you can interact and manage your stocks.
          </p>
          <button onClick={() => handleCTA()} className="cta rev">
            {user ? "Go to dashboard" : "Get Started"}
          </button>
        </div>

        <div className="right">
          <img src={require("../assets/home_back.png")} alt="" />
        </div>
      </div>
      <div className="divider"></div>
      <div className="main-body">
        <div className="features">
          <h1>Features</h1>
          <div className="items">
            <div className="item">
              <img src="https://via.placeholder.com/300" alt="" />
              <p>Advance CRUD operations with our app</p>
            </div>
            <div className="item">
              <img src="https://via.placeholder.com/300" alt="" />
              <p>Security kept in mind</p>
            </div>
            <div className="item">
              <img src="https://via.placeholder.com/300" alt="" />
              <p>Simple Creative UI/UX</p>
            </div>
          </div>
        </div>

        <div className="about-us">
          <h1>About Us</h1>
          <p className="desc">Members of Team WebMasters</p>
          <div className="items">
            <div className="item">
              <img src="https://via.placeholder.com/300" alt="" />
              <p>Aman Jagdev</p>
            </div>
            <div className="item">
              <img src="https://via.placeholder.com/300" alt="" />
              <p>Kartik</p>
            </div>
            <div className="item">
              <img src="https://via.placeholder.com/300" alt="" />
              <p>Gautam Arora</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
