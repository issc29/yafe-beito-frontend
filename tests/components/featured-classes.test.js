import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeaturedClasses from '../../src/components/featured-classes';
import { useStaticQuery, navigate } from 'gatsby';



describe('FeaturedClasses', () => {
  // Setup mock data
  const mockData = {
    site: {
      featuredClasses: [
        { title: 'Class 1', url: '/class-1' },
        { title: 'Class 2', url: '/class-2' },
      ],
    },
  };

  // Clear mocks between tests
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders featured classes buttons', () => {
    // Set up the mock return value for this test
    useStaticQuery.mockReturnValue(mockData);
    
    render(<FeaturedClasses />);
    expect(screen.getByText('FEATURED CLASSES:')).toBeInTheDocument();
    expect(screen.getByText('Class 1')).toBeInTheDocument();
    expect(screen.getByText('Class 2')).toBeInTheDocument();
  });

  it('navigates to class url on button click', () => {
    useStaticQuery.mockReturnValue(mockData);
    
    render(<FeaturedClasses />);
    const button = screen.getByText('Class 1');
    fireEvent.click(button);
    expect(navigate).toHaveBeenCalledWith('/class-1');
  });

  it('throws error if site data is missing', () => {
    // Mock returning an object without site property
    useStaticQuery.mockReturnValue({});
    
    // Use the correct error message from the component
    expect(() => render(<FeaturedClasses />)).toThrow(
      'Missing "Site settings"'
    );
  });
}); 