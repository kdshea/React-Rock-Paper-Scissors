import { useState, useEffect } from 'react'

const App = () => {

  // ! State
  // State to start game
  // Set ongoingGame to false to prevent randomBotPick from executing when the page renders
  const [ ongoingGame, setOngoingGame ] = useState(false)

  // State to count number of rounds
  // Set useEffect to check gameResult for every round in case new botPick is the same as the previous botPick
  const [ round, setRound ] = useState(0)

  // State for player pick
  const [ playerPick, setPlayerPick ] = useState('')

  // State for bot pick
  const [ botPick, setBotPick ] = useState('')

  // State for game result
  const [ gameResult, setGameResult ] = useState('')

  // State for player score
  const [ playerScore, setPlayerScore ] = useState(0)

  // State for bot score
  const [ botScore, setBotScore ] = useState(0)


  //! Execution

  const startGame = () => {
    if (ongoingGame === false) {
      setOngoingGame(true)
    }
  }

  const resetGame = () => {
    setOngoingGame(false)
    setRound(0)
    setPlayerPick('')
    setBotPick('')
    setPlayerScore(0)
    setBotScore(0)
  }

  const playerPicksRock = () => {
    console.log('You picked rock')
    setPlayerPick('rock')
    playerShoots()
  }

  const playerPicksPaper = () => {
    console.log('You picked paper')
    setPlayerPick('paper')
    playerShoots()
  }

  const playerPicksScissors = () => {
    console.log('You picked scissors')
    setPlayerPick('scissors')
    playerShoots()
  }

  const playerShoots = () => {
    startGame()
    getRandomBotPick()
    setRound(round + 1)
  }

  const getRandomBotPick = () => {
    if (ongoingGame === true) {
      const randomNumber = Math.random()
      if (randomNumber < .33) {
        console.log('Bot picked rock')
        setBotPick('rock')
      } else if (randomNumber < .66) {
        console.log('Bot picked paper')
        setBotPick('paper')
      } else if (randomNumber < 1) {
        console.log('Bot picked scissors')
        setBotPick('scissors')
      }
    }
  }

  const getGameResults = () => {
    if (playerPick === 'rock' && botPick === 'rock' || playerPick === 'paper' && botPick === 'paper' || playerPick === 'scissors' && botPick === 'scissors') {
      console.log('You tied')
      setGameResult('tied')
    } else if (playerPick === 'rock' && botPick === 'scissors' || playerPick === 'paper' && botPick === 'rock' || playerPick === 'scissors' && botPick === 'paper') {
      console.log('You win')
      setGameResult('win')
      setPlayerScore(playerScore + 1)
    } else if (playerPick === 'rock' && botPick === 'paper' || playerPick === 'paper' && botPick === 'scissors' || playerPick === 'scissors' && botPick === 'rock') {
      console.log('You lose')
      setGameResult('lose')
      setBotScore(botScore + 1)
    }
  }

  useEffect(() => {
    getRandomBotPick()
  }, [ongoingGame])

  useEffect(() => {
    getGameResults()
    console.log('Round', { round })
  }, [botPick, round])

  //! JSX
  return (
    <div className="container">
      <h1>Rock Paper Scissors</h1>
      <p>A bot has challenged you to a game. <br></br> Rock beats scissors, paper beats rock, and scissors beats paper.</p>
      <div className="scoreboard">
        <h2>Scoreboard</h2>
        <table>
          <tbody>
            <tr>
              <td id="player">{playerScore}</td>
              <td id="bot">{botScore}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>You</th>
              <th>Bot</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <h2 id="result" className={ongoingGame ? '' : 'hidden'}>You played {playerPick}. The bot played {botPick}. You {gameResult}.</h2>
      <button onClick={playerPicksRock}>Rock</button>
      <button onClick={playerPicksPaper}>Paper</button>
      <button onClick={playerPicksScissors}>Scissors</button>
      <div className="reset">
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  )
}

export default App
