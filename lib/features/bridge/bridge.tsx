import { Button } from "../../components/button/button";
import { Card, Style } from "../../components/card/card";

import typography from "../../theme/typography.module.css";

export interface BridgeConfig {
  style: Style;
}

export const Bridge = ({ style }: BridgeConfig) => {
  return (
    <Card customStyle={style}>
      <h1 className={typography.xLarge}>Bridge test</h1>
      <h1 className={typography.xLarge}>Bridge test</h1>
      <h1 className={typography.xLarge}>Bridge test</h1>
      <h1 className={typography.xLarge}>Bridge test</h1>

      <p className={typography.body}>This is a bridge</p>
      <Button onClick={() => {}} label="Button" />
    </Card>
  );
};
