<script lang="ts">
	let board: (string | null)[] = Array(9).fill(null);
	let currentPlayer: string = 'X';
	let winner: string | null = null;

	function handleClick(index: number) {
		// Early exit if the clicked cell is occupied or there's already a winner
		if (board[index] || winner) return;

		// Update the board and check for a winner
		board[index] = currentPlayer;
		winner = checkWinner();

		// Switch players only if there's no winner
		if (!winner) {
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
		}
	}

	// Check for a winner with functional logic
	const checkWinner = (): string | null => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		for (const [a, b, c] of lines) {
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a];
			}
		}

		// If no winner, check for a draw
		return board.every((cell) => cell) ? 'draw' : null;
	};

	const resetGame = () => {
		board.fill(null);
		currentPlayer = 'X';
		winner = null;
	};
</script>

<div>
	<h2>
		{winner ? (winner === 'draw' ? 'draw' : `${winner} wins`) : `next player: ${currentPlayer}`}
	</h2>
	<div class="board">
		{#each board as cell, index}
			<div class="cell" on:click={() => handleClick(index)}>{cell ? cell : ''}</div>
		{/each}
	</div>
	<button on:click={resetGame}>Reset Game</button>
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(3, 100px);
		gap: 5px;
	}
	.cell {
		width: 100px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		border: 1px solid #000;
		cursor: pointer;
	}
</style>
