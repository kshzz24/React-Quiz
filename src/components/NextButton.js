function NextButton({dispatch, answer, index, nums}) {
    if (answer === null) return null;
  if(index<nums-1) { return (
        <div>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"nextQuestion"})}> Next </button>
        </div>
    )
  }
  else{
     return (
        <div>
             <button className="btn btn-ui" onClick={()=>dispatch({type:"finished"})}> Finish </button>
        </div>
     )
  }
}

export default NextButton
