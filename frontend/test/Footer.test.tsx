import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Footer } from '../src/shared/components/layout/components';

vi.mock('../src/model/label', async () => {
  const actual: object = await vi.importActual('../src/model/label');
  return { ...actual, stockData: { footerTitle: '__THE_MESSAGE__' } };
});
describe('Footer', () => {
  it('should render Footer message', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('__THE_MESSAGE__')).toBeInTheDocument();
  });
});
