import React from "react";
import GitHubButton from "react-github-btn";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="text">Made By Webmasters &#169; 2020</div>
      <GitHubButton
        href="https://github.com/amanjagdev/stockify"
        data-size="large"
        aria-label="Star ntkme/github-buttons on GitHub"
      >
        Star{" "}
      </GitHubButton>
      <br />
      <GitHubButton
        href="https://github.com/amanjagdev/stockify"
        data-size="large"
        aria-label="Fork ntkme/github-buttons on GitHub"
      >
        Fork{" "}
      </GitHubButton>
    </div>
  );
};

export default Footer;
