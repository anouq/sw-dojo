import { describe, it, expect, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import TicTacToe from './TicTacToe.svelte';

describe('TicTacToe', () => {
	let container: HTMLElement;

	beforeEach(() => {
		container = render(TicTacToe).container;
	});

	it('renders without crashing', () => {
		expect(container.innerHTML).toBeDefined();
	});

	it('allows players to take turns', async () => {
		const cells = container.querySelectorAll('.cell');

		await fireEvent.click(cells[0]);
		expect(container.innerHTML).toContain('next player: O');

		await fireEvent.click(cells[1]);
		expect(container.innerHTML).toContain('next player: X');
	});

	it('detects a winner', async () => {
		const cells = container.querySelectorAll('.cell');

		await fireEvent.click(cells[0]); // X
		await fireEvent.click(cells[3]); // O
		await fireEvent.click(cells[1]); // X
		await fireEvent.click(cells[4]); // O
		await fireEvent.click(cells[2]); // X

		expect(container.querySelector('h2')!!.innerHTML).toContain('X wins');
	});

    it('detects a draw', async () => {
        const cells = container.querySelectorAll('.cell');

        await fireEvent.click(cells[0]); // X
        await fireEvent.click(cells[1]); // O
        await fireEvent.click(cells[3]); // X
        await fireEvent.click(cells[4]); // O
        await fireEvent.click(cells[2]); // X
        await fireEvent.click(cells[6]); // O
        await fireEvent.click(cells[8]); // X
        await fireEvent.click(cells[5]); // O
        await fireEvent.click(cells[7]); // X

        expect(container.querySelector('h2')!!.innerHTML).toContain('draw');
    });
});
