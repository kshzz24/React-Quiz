function FinishScreen({dispatch, points, highscore}) {
     const percentage = points/280 *100
    return (
        <>
        <p className="result">
            You Scored  <strong>{points}</strong> out of 280( {Math.ceil(percentage)}% )
        </p>
        <p className="highscore">( Highscore is {highscore} )</p>
        <button className="btn btn-ui" onClick={()=> dispatch({type:"restart"})}>Restart Quiz</button>
        </>
    )
}

export default FinishScreen
