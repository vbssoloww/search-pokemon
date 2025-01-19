// tests/Result.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Result from '../src/components/Result';
import { bulbasaur, charmander, squirtle } from './__mocks__/pokemon';
import { useQuery } from '@apollo/client';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock the useQuery hook
jest.mock('@apollo/client', () => {
    const originalModule = jest.requireActual('@apollo/client');
    return {
        ...originalModule,
        useQuery: jest.fn(() => ({
            loading: false,
            error: null,
            data: { pokemon: {} },
        })),
    };
});

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
}));

describe('Result Component', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });
        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn().mockReturnValue('Bulbasaur'),
        });
    });

    it('should display Bulbasaur as Grass type', () => {
        (useQuery as jest.Mock).mockReturnValueOnce({
            loading: false,
            error: null,
            data: { pokemon: bulbasaur },
        });

        render(<Result />);
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
        const typeElement = screen.getByText((content, element) => {
            return element?.tagName.toLowerCase() === 'span' && content.includes('Grass');
        });
        expect(typeElement).toBeInTheDocument();
    });

    it('should display Charmander as Fire type', () => {
        (useQuery as jest.Mock).mockReturnValueOnce({
            loading: false,
            error: null,
            data: { pokemon: charmander },
        });

        render(<Result />);
        expect(screen.getByText('Charmander')).toBeInTheDocument();
        const typeElement = screen.getByText((content, element) => {
            return element?.tagName.toLowerCase() === 'span' && content.includes('Fire');
        });
        expect(typeElement).toBeInTheDocument();
    });

    it('should display Squirtle as Water type', () => {
        (useQuery as jest.Mock).mockReturnValueOnce({
            loading: false,
            error: null,
            data: { pokemon: squirtle },
        });

        render(<Result />);
        expect(screen.getByText('Squirtle')).toBeInTheDocument();
        const typeElement = screen.getByText((content, element) => {
            return element?.tagName.toLowerCase() === 'span' && content.includes('Water');
        });
        expect(typeElement).toBeInTheDocument();
    });
});
