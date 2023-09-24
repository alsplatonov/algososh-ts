import React from 'react';
import { render } from '@testing-library/react';
import { Button } from "./button";

describe('Button Component', () => {
  it('renders a button with text', () => {
    const { asFragment } = render(<Button text="Click me" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a button without text', () => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a disabled button', () => {
    const { asFragment } = render(<Button text="Disabled" disabled />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a button with a loading indicator', () => {
    const { asFragment } = render(<Button isLoader />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls the onClick callback when clicked', () => {
    const onClickMock = jest.fn();
    const { asFragment, getByText } = render(
      <Button text="Click me" onClick={onClickMock} />
    );
    const button = getByText('Click me');

    button.click();
    expect(onClickMock).toHaveBeenCalledTimes(1);

    expect(asFragment()).toMatchSnapshot();
  });
});

