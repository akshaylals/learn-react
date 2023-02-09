import React from 'react';
import { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';

const Game = ({ player1Name, player2Name, onGameOver }) => {
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

    const newGame = () => {
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
                return `${player1Name} wins`;
            if (ty1 === 3 | ty2 === 3)
                return `${player2Name} wins`;
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
            return `${player1Name} wins`;
        if (ty1 === 3 | ty2 === 3)
            return `${player2Name} wins`;
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
            var m = calculate();
            setMsg(m);
            if (m != null){
                onGameOver((m === 'Draw') ? m : player);
                return;
            }
            setPlayer((player === 'X') ? 'O' : 'X');
        }
    }
    
    return (
        <div>
            <Typography variant='h4' component='h4'>
                { player1Name } vs { player2Name }
            </Typography>
            <Typography variant='h6' component='h6'>
                Player: { player === 'X' ? player1Name : player2Name } ({ player })
            </Typography>
            <div className="buttons">
                { arr.map((row, i) => (
                    <div key={i}>
                        { row.map((col, j) => (
                            <Box key={j} sx={{ m: 1 }}>
                                <Button variant="contained" disabled={arr[i][j] !== ' '} className='button' onClick={() => playerMove(i, j)}>{ arr[i][j] }</Button>
                            </Box>
                        ))}
                    </div>
                ))}
            </div>
            { msg && <div className='center-align'>
                <h6>{ msg }</h6>
                <Button variant="contained" onClick={ reset }>Reset</Button>
                <Button variant="contained" onClick={ newGame }>New Game</Button>
            </div>}
        </div>
    );
}
 
export default Game;