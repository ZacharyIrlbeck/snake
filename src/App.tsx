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


    return <div key={ind} className={classes}></div>;
}

function App() {

    const squares = new Array(20 * 20).fill();
    const [pos, setPos] = useState(0);
    const [foodPos, setFoodPos] = useState(-1);

    useEffect(() => {
        if(foodPos === -1 || pos === foodPos){
           setFoodPos(Math.floor(Math.random() * 400)); 
        }

        console.log("pos", pos);
    }, [pos]);

    useEffect(() => {
       window.addEventListener("keydown", move);

        function move(e){
            let diff = 0;

            switch(e.key){
                case "ArrowUp":
                    diff = -20;
                    break;
                case "ArrowDown":
                    diff = 20;
                    break;
                case "ArrowLeft":
                    diff = -1;
                    break;
                case "ArrowRight":
                    diff = 1;
                    break;
            }

            setPos(prevPos => {
                const newPos = prevPos + diff;

                if(newPos >= 0 && newPos <= 399){
                    return newPos;
                }

                return prevPos;
            });


        }
        return () => window.removeEventListener("keydown", move);
    }, []);

    return (
        <div className="board">
            { squares.map((_x, ind) => <Square ind={ind} pos={pos} foodPos={foodPos} />) }
        </div>
    )
}

export default App
