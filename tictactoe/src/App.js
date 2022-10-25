import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [arr, setArr] = useState([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ]);

    const [player, setPlayer] = useState('X');
    const [msg, setMsg] = useState(null);
    const [count, setCount] = useState(0);

    const reset = () => {
        setArr([
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' '],
        ]);
        setMsg(null);
        setPlayer('X');
        setCount(0);
    }

    const calculate = () => {
        for (var i = 0; i < 3; i++){
            var tx1 = 0, tx2 = 0, ty1 = 0, ty2 = 0;
            for (var j = 0; j < 3; j++){
                if (arr[i][j] === 'X'){
                    tx1++;
                }
                if (arr[j][i] === 'X'){
                    tx2++;
                }
                if (arr[i][j] === 'O'){
                    ty1++;
                }
                if (arr[j][i] === 'O'){
                    ty2++;
                }
            }
            if (tx1 === 3 | tx2 === 3)
                return "Player X wins";
            if (ty1 === 3 | ty2 === 3)
                return "Player O wins";
        }
        var tx1 = 0, tx2 = 0, ty1 = 0, ty2 = 0;
        for (var i = 0; i < 3; i++){
            if (arr[i][i] === 'X')
                tx1++;
            if (arr[i][i] === 'O')
                ty1++;
            if (arr[i][2 - i] === 'X')
                tx2++;
            if (arr[i][2 - i] === 'O')
                ty2++;
        }
        if (tx1 === 3 | tx2 === 3)
            return "Player X wins";
        if (ty1 === 3 | ty2 === 3)
            return "Player O wins";
        if(count >= 8)
            return 'Draw';
        return null;
    }

    const playerMove = (i, j) => {
        if (arr[i][j] === ' ' & msg === null){
            setCount(count + 1);
            let tmp = [...arr];
            tmp[i][j] = player;
            setArr(tmp);
            setMsg(calculate());
            setPlayer((player === 'X') ? 'O' : 'X');
        }
    }


    return (
        <div className="App">
            <h4>Player: { player }</h4>
            <div className="buttons">
                { arr.map((row, i) => (
                    <div key={i}>
                        { row.map((col, j) => (
                            <div key={j}>
                                <button disabled={arr[i][j] !== ' '} className='waves-effect waves-light btn button' onClick={() => playerMove(i, j)}>{ arr[i][j] }</button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {  msg && <div>
                { msg } 
                <button className='waves-effect waves-light btn red' onClick={reset}>Reset</button>
            </div> }
        </div>
    );
}

export default App;
