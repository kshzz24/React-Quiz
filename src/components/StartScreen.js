function StartScreen({nums, dispatch}) {

   function handleDispatchAction(){
         dispatch({type:"startQuiz"});
   }

    return (
        <div className="start">
        <h2>Welcome to react Quiz</h2>
         <h3>{nums} Question to test your React Mastery</h3>
         <button className="btn btn-ui" onClick={handleDispatchAction}>Lets Start</button>
        </div>
    )
}

export default StartScreen
