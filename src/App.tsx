import { Toaster } from "react-hot-toast";
import { Providers } from "./context";
import "./styles/index.css";
import { Frame } from "./utils/Frame";
import { Layout } from "./utils/Layout";

function App() {
  return (
      <Providers>
          <Toaster position="bottom-right" />
          <Frame />
          <Layout />
      </Providers>
  );
}

export default App;
