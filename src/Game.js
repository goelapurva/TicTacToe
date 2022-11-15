import { useState } from "react";
import Board from "./Board";

const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNo, setStepNo] = useState(0);

    const handleClick = (i) => {
        const pastMoves = history.slice(0, stepNo + 1);
        const current = [...pastMoves[stepNo].squares];
        if (current[i] || calculateWinner(current)) return;
        current[i] = xIsNext ? "X" : "O";
        setHistory([...pastMoves, { squares: current }]);
        setXIsNext((prev) => !prev);
        setStepNo(pastMoves.length);
    };

    const moves = history.map((_step, move) => {
        const desc = move ? `Go to move ${move}` : `Go to game start`;
        return (
            <li>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });
    const jumpTo = (step) => {
        setStepNo(step);
        setXIsNext(step % 2 === 0);
    };

    const evaluateStatus = () => {
        let status;
        const winner = calculateWinner(history[stepNo].squares);
        status = winner
            ? `Winner : ${winner}`
            : `Next Player: ${xIsNext ? "X" : "O"}`;
        return status;
    };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
    };
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    square={history[stepNo].squares}
                    boardClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <p className="status">{evaluateStatus()}</p>
                <ol className="history">{moves}</ol>
            </div>
        </div>
    );
};

export default Game;