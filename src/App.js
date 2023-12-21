//import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";


const initialState = {
  questions: [],

  // loading, err, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore:0,
  secondsRemaining:null
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 30 
      };
    case "newAnswer":
       const currentQuestion = state.questions.at(state.index);
       return {
          ...state,
          answer : action.payload,
          points: action.payload === currentQuestion.correctOption ? state.points + currentQuestion.points : state.points
       }  
    case "nextQuestion":
         return {
          ...state,
           index : state.index+1,
           answer: null
         }
    
    case "finished":    
            return{
               ...state,
               status:"finished",
               highscore: (state.highscore > state.points ? state.highscore : state.points),
               secondsRemaining : 10
            }
    case "restart":
          return {
           ...initialState, questions:state.questions, status:"ready",highscore:state.highscore
          }
    case "tick":
       return {
        ...state,
        secondsRemaining:state.secondsRemaining-1,
          status: (state.secondsRemaining  === 0) ? "finished": state.status
       }            
    default:
      throw new Error("Unknown Error");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const l = questions.length;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Loader />}
        {status === "ready" && <StartScreen nums={l} dispatch={dispatch} />}
        {status === "active" && 
          <>
          <Progress index={index} nums ={l} points = {points} answer = {answer} />
          < Question 
          question={questions[index]} 
          dispatch = {dispatch} 
          answer = {answer} 
          />
          <Footer>
          <Timer 
          dispatch={dispatch}
          secondsRemaining = {secondsRemaining}
          />
          <NextButton 
          dispatch={dispatch} 
          answer= {answer}
          nums={l}
          index={index} 
          />
          </Footer>
          </>
          
           
          }
          {status === "finished" && <FinishScreen 
          dispatch={dispatch}
          points={points}
          highscore={highscore}
          /> }
        
      </Main>
    </div>
  );
}

export default App;
