import React from 'react';
import { render } from '@testing-library/react';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Circle component snapshots', () => {
  it('renders without a letter', () => {
    const { asFragment } = render(<Circle />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with letter', () => {
    const { asFragment } = render(<Circle letter="A" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with head as string', () => {
    const { asFragment } = render(<Circle head="Head" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with head as React element', () => {
    const { asFragment } = render(<Circle head={<div>Head Element</div>} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with tail as string', () => {
    const { asFragment } = render(<Circle tail="Tail" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with tail as React element', () => {
    const { asFragment } = render(<Circle tail={<div>Tail Element</div>} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with index', () => {
    const { asFragment } = render(<Circle index={5} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as small', () => {
    const { asFragment } = render(<Circle isSmall={true} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders in default state', () => {
    const { asFragment } = render(<Circle state={ElementStates.Default} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders in changing state', () => {
    const { asFragment } = render(<Circle state={ElementStates.Changing} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders in modified state', () => {
    const { asFragment } = render(<Circle state={ElementStates.Modified} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
