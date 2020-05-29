import { Layout, Skeleton } from 'antd';
import React, { Suspense } from 'react';
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
          <Suspense fallback={'...'}>
            <GeneralMenu />
          </Suspense>
        </Header>
        <Content>
          <div className="site-layout-content">
            <Suspense fallback={<Skeleton />}>
              <ItemsList />
              <AddTodoForm />
            </Suspense>
          </div>
        </Content>
        <Footer>Tadeas © 2020 Teno Fdio Team</Footer>
      </Layout>
    </div>
  );
}

export default App;
