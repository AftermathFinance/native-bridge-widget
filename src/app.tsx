import { Bridge, BridgeConfig } from "sui-bridge-react";
import "./app.css";

export function App() {
  const config: BridgeConfig = {
    style: {
      hasBackgroundImage: true,
    },
  };

  return (
    <>
      <Bridge {...config} />
    </>
  );
}
