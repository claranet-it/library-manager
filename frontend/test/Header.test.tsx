import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Header } from '../src/shared/components/layout/components';

describe('Header', () => {
  it('should render header title', () => {
    render(<Header />);
    const h1Element = screen.getByText('Library Manager');
    expect(h1Element).toBeInTheDocument();
  });
});
