import { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import Game from './components/Game';

function App() {
    const endpoint = 'https://63d89fa4baa0f79e09ab817e.mockapi.io/winners';

    const [playerModalOpen, setPlayerModalOpen] = useState(true);
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [p1NameErr, setP1NameErr] = useState('');
    const [p2NameErr, setP2NameErr] = useState('');

    const [winnersModalOpen, setWinnersModalOpen] = useState(false);
    const [winners, setWinners] = useState([]);

    

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

    const handleWinnerModalOpen = async () => {
        var response = await axios.get(endpoint);
        if (response.status == 200){
            setWinners(response.data);
            console.log(response.data);
            setWinnersModalOpen(true);
        }
    }

    const sendToDb = (player) => {
        var value = ''
        if (player !== 'Draw'){
            value = (player === 'X') ? player1Name : player2Name;
        }else{
            value = 'Draw';
        }
        axios.post(endpoint, {
            "player1": player1Name,
            "player2": player2Name,
            "winner": value
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    return (
        <div className="App">
            <Button variant='contained' onClick={ handleWinnerModalOpen }>Winners</Button>
            { (!playerModalOpen) && <Game player1Name={player1Name} player2Name={player2Name} onGameOver={sendToDb} /> }
            
            <Dialog open={ playerModalOpen }>
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

            <Dialog open={ winnersModalOpen }>
                <DialogTitle>Winners</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Player 1</TableCell>
                                <TableCell>Player 2</TableCell>
                                <TableCell>Winner</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { winners.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{ row.player1 }</TableCell>
                                        <TableCell>{ row.player2 }</TableCell>
                                        <TableCell>{ row.winner }</TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </DialogContent>

                <DialogActions>
                    <Button onClick={ () => { setWinnersModalOpen(false) } }>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default App;
