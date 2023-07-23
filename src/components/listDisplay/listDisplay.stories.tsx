import * as React from 'react';

import { expect, jest } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { ListDisplay } from './listDisplay';
import { AppProvider } from '../../appProvider';
import { ListItem, ShoppingItem } from '@model/shoppingItem';

const meta: Meta<typeof ListDisplay> = {
  title: 'ListDisplay',
  component: ListDisplay,
};

type Story = StoryObj<typeof ListDisplay>;

const testShoppingItem = 'Test item';

const item = new ListItem(new ShoppingItem(testShoppingItem, 0));

export const Primary: Story = {
  args: {
    item,
  },
  render: (args) => (
    <AppProvider>
      <ListDisplay {...args} />
    </AppProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const content = await canvas.getByTestId('item-content');
    const action = await canvas.getByTestId('item-buy');
    const purchase = jest.spyOn(item, 'purchase');

    await action.click();

    expect(purchase).toBeCalledWith(true);
    expect(
      Object.values(content.classList).filter((rule) => /bought/.test(rule))
    ).toHaveLength(1);

    purchase.mockClear();
    await action.click();

    expect(purchase).toBeCalledWith(false);
    expect(
      Object.values(content.classList).filter((rule) => /bought/.test(rule))
    ).toHaveLength(0);
  },
};

export default meta;
