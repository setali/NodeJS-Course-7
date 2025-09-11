import { ConfigProvider } from "antd";
import AuthProvider from "./AuthProvider";
import { BrowserRouter as Router } from "react-router";
import QueryProvider from "./QueryProvider";

export default function AppProviders({ children }) {
  return (
    <ConfigProvider>
      <Router>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </Router>
    </ConfigProvider>
  );
}
