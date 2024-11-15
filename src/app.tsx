// https://nodejs.org/api/packages.html#packages_self_referencing_a_package_using_its_name
import { Bridge } from "sui-bridge-react";

export function App() {
  return (
    <>
      <Bridge />
    </>
  );
}
