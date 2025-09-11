import { Layout } from "antd";
import Sidebar from "./components/general/Sidebar";
import Login from "./components/auth/Login";
import AuthContext from "./contexts/AuthContext";
import AuthProvider from "./providers/AuthProvider";
import useAuth from "./hooks/useAuth";
import { Route, Routes } from "react-router";
import ArticleRouter from "./components/article/Router";

const { Header, Footer, Content } = Layout;

function App() {
  const { isLoggedIn, loading, logout } = useAuth();

  if (loading) {
    return "Loading ...";
  }

  return (
    <div>
      {isLoggedIn ? (
        <Layout>
          <Header style={{ backgroundColor: "white" }}>
            Header
            <span style={{ color: "red", margin: "2rem" }} onClick={logout}>
              Logout
            </span>
          </Header>
          <Layout>
            <Content>
              <Routes>
                <Route path="/article/*" element={<ArticleRouter />} />
              </Routes>
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
