import { MoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { ClickParam } from 'antd/es/menu';

const { SubMenu } = Menu;

const GeneralMenu = () => {
  const handleMenuClick = async (elem: ClickParam) => {
    console.log('Delete finished task clicked', elem);
  };

  return (
    <Menu theme="dark" mode="horizontal" onClick={handleMenuClick}>
      <SubMenu icon={<MoreOutlined />}>
        <Menu.Item key="deleteFinishedTasks">Delete finished tasks</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default GeneralMenu;
