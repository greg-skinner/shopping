import * as React from 'react';

import { ShoppingItem } from '@model/shoppingItem';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { AppProvider } from '../../appProvider';
import { PriceControl } from './priceControl';

const meta: Meta<typeof PriceControl> = {
  title: 'PriceControl',
  component: PriceControl,
};

type Story = StoryObj<typeof PriceControl>;

const testShoppingItem = 'Test item';

export const Primary: Story = {
  args: {},
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
