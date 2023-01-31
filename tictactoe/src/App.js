import { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function App() {
    const [arr, setArr] = useState([
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ]);

    const [player, setPlayer] = useState('X');
    const [msg, setMsg] = useState(null);
    const [count, setCount] = useState(0);
    const [playerModalOpen, setPlayerModalOpen] = useState(true);
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [p1NameErr, setP1NameErr] = useState('');
    const [p2NameErr, setP2NameErr] = useState('');

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
        setPlayerModalOpen(true);
        setPlayer1Name('');
        setPlayer2Name('');
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
            setMsg(calculate());
            setPlayer((player === 'X') ? 'O' : 'X');
        }
    }

    const handlePlayerModalClose = () => {
        if (player1Name === ''){
            setP1NameErr('Name cannot be empty');
            return;
        }else{
            setP1NameErr('');
        }
        if (player2Name === ''){
            setP2NameErr('Name cannot be empty');
            return;
        }else{
            setP2NameErr('');
        }
        setPlayerModalOpen(false);
    }


    return (
        <div className="App">
            { (!playerModalOpen) && <div>
                <h4 className='center-align'>{ player1Name } vs { player2Name }</h4>
                <h4 className='center-align'>Player: { player === 'X' ? player1Name : player2Name } ({ player })</h4>
                <div className="buttons">
                    { arr.map((row, i) => (
                        <div key={i}>
                            { row.map((col, j) => (
                                <div key={j}>
                                    <Button variant="contained" disabled={arr[i][j] !== ' '} className='button' onClick={() => playerMove(i, j)}>{ arr[i][j] }</Button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                { msg && <div className='center-align'>
                    <h6>{ msg }</h6>
                    <Button variant="contained" onClick={ reset }>Reset</Button>
                    <Button variant="contained" onClick={ newGame }>New Game</Button>
                </div>}
            </div> }

            <Dialog open={playerModalOpen} onClose={handlePlayerModalClose}>
                <DialogTitle>Enter Player Details</DialogTitle>
                <DialogContent>
                    
                    <TextField autoFocus
                            value={player1Name}
                            margin='dense'
                            id='player1'
                            label='Player 1'
                            type='text'
                            fullWidth
                            variant='standard'
                            error={p1NameErr !== ''}
                            helperText={p1NameErr}
                            onChange={(e) => { setPlayer1Name(e.target.value) }} />

                    <TextField margin='dense'
                            value={player2Name}
                            id='player2'
                            label='Player 2'
                            type='text'
                            fullWidth
                            variant='standard'
                            error={p2NameErr !== ''}
                            helperText={p2NameErr}
                            onChange={(e) => { setPlayer2Name(e.target.value) }} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={ handlePlayerModalClose }>Start</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default App;
