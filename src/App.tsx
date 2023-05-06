import { useState, useEffect } from 'react'
import './App.css'


function App() {

    const squares = new Array(20 * 20).fill();
    const [pos, setPos] = useState(0);

    useEffect(() => {
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
                    console.log("pos", pos);
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
            { squares.map((_x, ind) => <div key={ind} className={pos === ind ? "snake square" : "square"}></div>) }
        </div>
    )
}

export default App
