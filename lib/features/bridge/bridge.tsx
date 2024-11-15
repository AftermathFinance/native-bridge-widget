import { Button } from "../../components/button/button";
import globals from "../../theme/globals.module.css";
import typography from "../../theme/typography.module.css";

export const Bridge = () => {
  return (
    <div className={globals.root}>
      <h1 className={typography.xLarge}>Bridge test</h1>
      <h1 className={typography.xLarge}>Bridge test</h1>
      <p className={typography.body}>This is a bridge</p>
      <Button onClick={() => {}} label="Button" />
    </div>
  );
};
