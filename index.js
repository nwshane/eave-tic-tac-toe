const readline = require('readline')

const boardToString = (board) => (
  `
${board[1]} ${board[2]} ${board[3]}
${board[4]} ${board[5]} ${board[6]}
${board[7]} ${board[8]} ${board[9]}
  `
)

const gameString = ({board, currentPlayer}) => (
  `
Make your move, ${currentPlayer}:
The board currently looks like:
${boardToString(board)}
  `
)

const promptUserToMove = (state, numMove) => {
  console.log(gameString(state))
  const moves = [
    1,
    5,
    3,
    2,
    8,
    4,
    6,
    7,
    9
  ]

  return moves[numMove]
}

const positionsAreFilled = (board) => (
  !Object.keys(board).find((position) => (
    board[position] === '-'
  ))
)

const getWinningCombos = () => ([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
])

const winningPlayer = (board) => {
  getWinningCombos().find((winningCombo) => (
    board[winningCombo[0]] && board[winningCombo[1]] && board[winningCombo[2]] === 'O'
  ))
  if (board[3] === 'O' && board[6] === 'O' && board[9] === 'O') {
    return 'O'
  }
}

const gameOver = ({board}) => (
  positionsAreFilled(board) || winningPlayer(board)
)

const getOtherPlayer = (player) => (
  player === 'O' ? 'X' : 'O'
)

const ticTacToe = () => {
  let state = {
    currentPlayer: 'O',
    board: {
      1: '-',
      2: '-',
      3: '-',
      4: '-',
      5: '-',
      6: '-',
      7: '-',
      8: '-',
      9: '-'
    }
  }

  let numMove = 0

  console.log('gameOver', gameOver(state))

  while (!gameOver(state)) {
    let answer = promptUserToMove(state, numMove)

    const newState = Object.assign(
      {},
      state
    )

    newState.board[answer] = state.currentPlayer
    newState.currentPlayer = getOtherPlayer(state.currentPlayer)
    state = newState

    numMove++
  }

  let winner = winningPlayer(state.board)
  if (winningPlayer(state.board)) {
    console.log(`Congratulations, player ${winner}!`)
  } else {
    console.log("It's a tie!")
  }

  console.log(gameString(state))
}

ticTacToe()
