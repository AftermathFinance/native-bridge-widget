import { Bridge, BridgeConfig } from "sui-bridge-react";
import "./app.css";

export function App() {
  const config: BridgeConfig = {
    style: {
      hasBackgroundImage: true,
    },
    appKitProjectId: import.meta.env.VITE_APP_KIT_PROJECT_ID as string,
    isMainnet: import.meta.env.VITE_IS_MAINNET === "false",
  };

  return (
    <>
      <Bridge {...config} />
    </>
  );
}
