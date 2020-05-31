import { Layout } from 'antd';
import React from 'react';
import logo from './assets/logo.svg';
import './App.sass';
import GeneralMenu from './components/Menu';
import ItemsList from './components/ItemsList';
import AddTodoForm from './components/AddTodoForm';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div>
      <Layout>
        <Header>
          <div className="logo">
            <img src={logo} alt="Todo list" />
            <span>Tadeas</span>
          </div>
          <GeneralMenu />
        </Header>
        <Content>
          <div className="site-layout-content">
            <ItemsList />
            <AddTodoForm />
          </div>
        </Content>
        <Footer>Tadeas © 2020 Teno Fdio Team</Footer>
      </Layout>
    </div>
  );
}

export default App;
