import { MoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useFirestore } from 'reactfire';
import { ClickParam } from 'antd/es/menu';

const { SubMenu } = Menu;

const GeneralMenu = () => {
  const tasksRef = useFirestore().collection('todos');

  const handleMenuClick = async (elem: ClickParam) => {
    if (elem.key === 'deleteFinishedTasks') {
      const querySnapshot = await tasksRef.where('finished', '==', true).get();
      querySnapshot.forEach((document) => {
        tasksRef.doc(document.id).delete();
      });
    }
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
