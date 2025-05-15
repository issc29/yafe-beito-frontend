// Import necessary testing libraries
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Dropdown from '../../src/components/dropdown';

// Mock the Link component from Gatsby
jest.mock('gatsby', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

// Mock the ChevronDownIcon component from @heroicons/react/solid
jest.mock('@heroicons/react/24/solid', () => ({
  ChevronDownIcon: () => <svg />,
}));

// Mock the Menu and Transition components from @headlessui/react
jest.mock('@headlessui/react', () => ({
  Menu: ({ as: _, children }) => children,
  Transition: ({ as: _, children }) => children,
  MenuButton: ({ children }) => children,
  MenuItem: ({ children, focus }) => children({ focus }),
  MenuItems: ({ children }) => children,
}));

// Test cases for Dropdown component
describe('Dropdown Component', () => {
  it('renders the dropdown button with the correct name', () => {
    const name = 'Test Dropdown';
    render(<Dropdown name={name} options={[]} />);
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it('renders the dropdown options correctly', () => {
    const options = [
      { link: '/option1', name: 'Option 1' },
      { link: '/option2', name: 'Option 2' },
    ];

    render(<Dropdown name="Test Dropdown" options={options} />);
    fireEvent.click(screen.getByText('Test Dropdown'));
    options.forEach(option => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  it('renders the correct link for each option', () => {
    const options = [
      { link: '/option1', name: 'Option 1' },
      { link: '/option2', name: 'Option 2' },
    ];
    render(<Dropdown name="Test Dropdown" options={options} />);
    fireEvent.click(screen.getByText('Test Dropdown'));
    options.forEach(option => {
      const linkElement = screen.getByText(option.name).closest('a');
      expect(linkElement).toHaveAttribute('href', option.link);
    });
  });
});