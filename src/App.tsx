import { useState, useEffect } from 'react'
import './App.css'


function Square({ ind, pos, foodPos }){
    let classes = "square";

    if(foodPos === ind){
        classes += " food";
    }

    if(pos === ind){
        classes += " snake";
    }


    return <div key={ind} className={classes}>{ind}</div>;
}

function App() {

    const dirs = { "ArrowUp": -20, "ArrowDown": 20, "ArrowLeft": -1, "ArrowRight": 1 };
    const squares = new Array(20 * 20).fill();
    const [pos, setPos] = useState(Math.floor(Math.random() * 400));
    const [foodPos, setFoodPos] = useState(Math.floor(Math.random() * 400));
    const [dir, setDir] = useState(Object.keys(dirs)[Math.floor(Math.random() * 4)]);
    const [move, setMove] = useState(false);
    const [alive, setAlive] = useState(true);
    const [speed, setSpeed] = useState(500);

    // if the head === the food, eat the food and move to new spot
    useEffect(() => {
        if(foodPos === -1 || pos === foodPos){
           setFoodPos(Math.floor(Math.random() * 400)); 
        }
    }, [pos]);

    // allow user to change direction of snake
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        function handleKeyDown({ key }){
            if(Object.keys(dirs).includes(key)){
                setDir(key);
            }
        }

        return () => window.removeEventListener("keydown", handleKeyDown);
    })

    // move the snake
    useEffect(() => {
        const interval = setInterval(() => {
            setPos((prevPos) => {
                const diff = dirs[dir]
                let newPos = prevPos + diff;

                if(newPos < 0 || newPos > 399){
                    newPos = prevPos - diff;
                }

                return newPos;
            });
        }, speed);


        return () => clearInterval(interval);
    }, [move, dir])

    return (
        <div className="board">
            { squares.map((_x, ind) => <Square ind={ind} pos={pos} foodPos={foodPos} />) }
        </div>
    )
}

export default App
