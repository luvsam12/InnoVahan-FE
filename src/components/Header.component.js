import React from "react"
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, message } from 'antd';


import './../styles/header.scss';


const items = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: '4rd menu item',
      key: '4',
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  

function Header() {
  return (
    <div className="chat-page-header-container">
        <div className="logo-container">
            <a href="http://13.232.89.81:3000">
              <img className="vahan-logo vahan" alt="vahan" src="/vahan-final-logo-black.png" />
            </a>
        </div>
        
        <div className="language-container">
            <Dropdown menu={menuProps}>
                <Button>
                    <Space>
                    Language
                    <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </div>
    </div>
  );
}

export default Header;
