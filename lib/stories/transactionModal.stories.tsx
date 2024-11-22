import type { Meta, StoryObj } from "@storybook/react";
import { TransactionModal } from "../components/transactionModal/transactionModal";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
  title: "Components/Transaction Modal",
  component: TransactionModal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypesbackground: #EEEEEE;
} satisfies Meta<typeof TransactionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TransactionCardPending: Story = {
  args: {
    hash: "0x1234567890123456789123456789",
    transactionStatus: "Pending...",
    address: "0x1234567890123456789123456789",
    recipient: "0x1234567890123456789123456789",
    token: {
      display: "1.548641",
      symbol: "ETH",
    },
  },
};
