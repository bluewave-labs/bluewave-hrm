import SettingsPage from "./SettingsPage";

//Storybook display settings
export default {
  title: "SettingsMenu/SettingsPage",
  component: SettingsPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

//Stories for each SettingsPage type
export const Primary = {
  args: {},
};
