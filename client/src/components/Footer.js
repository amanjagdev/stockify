import React from "react";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="text">Made By Webmasters &#169; 2020</div>
      <div className="github-links">
        <a target="_blank" href="https://github.com/amanjagdev/stockify/fork">
          Fork us on
        </a>
        <a
          id="github-icon"
          target="_blank"
          href="https://github.com/amanjagdev/stockify"
        >
          <i id="github-icon" class="im im-github"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
