import type { Preview } from "@storybook/react";
// Changed: index.css is in the home folder, not /src/
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
