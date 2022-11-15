import Square from "./Square";
const Board = ({ square, boardClick }) => {
    const renderSquare = (i) => {
        return (
            <Square
                key={i}
                value={square[i]}
                squareClick={() => boardClick(i)}
            />
        );
    };
    let count = 0;
    return (
        <div className="board">
            {[...Array(3)].map((_el, i) => (
                <div className="board-row" key={i}>
                    {[...Array(3)].map((_el) => {
                        count++;
                        return renderSquare(count - 1);
                    })}
                </div>
            ))}
        </div>
    );
};

export default Board;