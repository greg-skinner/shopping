import * as React from 'react';

import { expect, jest } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { AppContext, emptyContext } from '../../appProvider';
import { AddGrocery } from './addGrocery';

const meta: Meta<typeof AddGrocery> = {
  title: 'AddGrocery',
  component: AddGrocery,
};

type Story = StoryObj<typeof AddGrocery>;

const onComplete = jest.fn();
const addGrocery = jest.fn();

export const Primary: Story = {
  args: {
    onComplete,
  },
  render: (args) => (
    <AppContext.Provider
      value={{
        ...emptyContext,
        groceries: { ...emptyContext.groceries, addGrocery },
      }}
    >
      <AddGrocery data-testid="addGrocery" {...args} />
    </AppContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const nameInput = await canvas.getByTestId('grocery-input');
    const priceInput = await canvas.getByTestId('grocery-price');
    const complete = await canvas.getByTestId('grocery-complete');

    expect(await canvas.queryAllByTestId('grocery-error', {})).toHaveLength(0);

    await complete.click();

    expect(await canvas.getAllByTestId('grocery-error')).toHaveLength(1);

    const grocery = 'New grocery name';
    const price = '27';
    await userEvent.type(nameInput, grocery);
    await userEvent.type(priceInput, price);

    expect(await canvas.queryAllByTestId('grocery-error')).toHaveLength(0);

    await complete.click();

    expect(addGrocery).toBeCalledWith(grocery, parseInt(price, 10));
    expect(onComplete).toBeCalledTimes(1);
  },
};

export default meta;
