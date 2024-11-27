# Native Sui Bridge Widget for React

---

This repository contains React components that allow users to bridge ETH between Ethereum and Sui networks. Library is fully typed and self contained.

## Installation

Library is assuming your project is using `react` and `react-dom` as dependencies.

```bash
npm install sui-bridge-react
```

## Usage

Standalone usage.

```tsx
import { Bridge, BridgeConfig } from "sui-bridge-react";

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
```

If your app has already installed `wagmi`, you can pass it's instance.

```tsx
const config: BridgeConfig = {
  style: {
    hasBackgroundImage: true,
  },
  wagmi: wagmiInstance,
  queryClient: queryClientInstance,
};
```

## Development

You can test the library locally using vite.

```bash
npm run build
npm run dev
```

Testing components is done using storybook.

```bash
npm run storybook
```

## License

Apache-2.0

Developed by [DarkSpace.studio](https://darkspace.studio/) in coordination with Sui Foundation and Mysten. Hosted by Aftermath Finance.
