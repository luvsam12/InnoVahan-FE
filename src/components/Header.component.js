import React from "react"
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, message } from 'antd';
import './../styles/header.scss';

  

function Header() {
  return (
    <div className="chat-page-header-container">
        <div className="logo-container">
            <a href="http://13.232.89.81:3000">
              <img className="vahan-logo vahan" alt="vahan" src="/vahan-final-logo-black.png" />
            </a>
        </div>
    </div>
  );
}

export default Header;
