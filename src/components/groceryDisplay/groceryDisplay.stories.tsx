import * as React from 'react';

import { ShoppingItem } from '@model/shoppingItem';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { AppProvider } from '../../appProvider';
import { GroceryDisplay } from './groceryDisplay';

const meta: Meta<typeof GroceryDisplay> = {
  title: 'GroceryDisplay',
  component: GroceryDisplay,
};

type Story = StoryObj<typeof GroceryDisplay>;

const testShoppingItem = 'Test item';

export const Primary: Story = {
  args: {
    item: new ShoppingItem(testShoppingItem, 0),
    editMode: false,
  },
  render: (args) => (
    <AppProvider>
      <GroceryDisplay data-testid="GroceryDisplay" {...args} />
    </AppProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const count = await canvas.getByTestId('item-count');
    const label = await canvas.getByTestId('item-label');
    const increment = await canvas.getByTestId('item-increment');
    const decrement = await canvas.getByTestId('item-decrement');

    expect(await count.innerText).toBe('0');
    expect(await label.innerText).toBe(testShoppingItem);

    await decrement.click();
    await decrement.click();

    expect(await count.innerText).toBe('0');

    await increment.click();
    await increment.click();
    await increment.click();

    expect(await count.innerText).toBe('3');
  },
};

export default meta;
