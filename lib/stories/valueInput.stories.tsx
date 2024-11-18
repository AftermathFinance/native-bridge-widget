import type { Meta, StoryObj } from "@storybook/react";
import { ValueInput } from "../components/input/valueInput";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta = {
  title: "Components/Input/Value Input",
  component: ValueInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypesbackground: #EEEEEE;
} satisfies Meta<typeof ValueInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ValueInputStory: Story = {
  args: {},
};
