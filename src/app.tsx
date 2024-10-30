import "./app.css";

// https://nodejs.org/api/packages.html#packages_self_referencing_a_package_using_its_name
import { Button } from "sui-bridge-react";

export function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <br />
        <Button />
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
