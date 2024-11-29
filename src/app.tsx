import { Bridge, BridgeConfig } from "sui-bridge-react";
import "./app.css";
const appkit = import.meta.env.APP_KIT_PROJECT_ID as string;

export function App() {
  const config: BridgeConfig = {
    style: {
      hasBackgroundImage: true,
    },
    appKitProjectId: appkit,
    isTestnet: true,
  };

  return (
    <>
      <Bridge {...config} />
    </>
  );
}
