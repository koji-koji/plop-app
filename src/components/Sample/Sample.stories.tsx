import { Meta, StoryFn } from "@storybook/react";
import Sample from "./Sample";

export default {
  title: "Components/Sample",
  component: Sample,
} as Meta;

const Template: StoryFn<{ label: string }> = (args) => <Sample {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Button",
};
