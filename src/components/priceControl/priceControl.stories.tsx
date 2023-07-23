import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { AppProvider } from '../../appProvider';
import { PriceControl } from './priceControl';

const meta: Meta<typeof PriceControl> = {
  title: 'PriceControl',
  component: PriceControl,
};

type Story = StoryObj<typeof PriceControl>;

export const Primary: Story = {
  args: {
    editMode: false,
  },
  render: (args) => (
    <AppProvider>
      <PriceControl data-testid="PriceControl" {...args} />
    </AppProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
  },
};

export default meta;
