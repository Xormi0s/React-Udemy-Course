import {useState} from "react";
import QUESTIONS from "../questions.js";
import quizComplete from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length -1;

    function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevState) => {
            return [...prevState, selectedAnswer];
        });
    }

    if(quizIsComplete){
        return <div id="summary">
            <img src={quizComplete} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
        </div>
    }

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={10000} onTimeout={() => handleSelectAnswer(null)}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => (
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}