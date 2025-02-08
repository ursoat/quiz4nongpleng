import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const questions = [
  { question: "น้องเพงเป็นสัตว์อะไร", answer: ["หมา", "ม๋า", "หมู", "หมุ"] },
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 5 * 6?", answer: "30" },
  { question: "What is the color of the sky?", answer: "blue" },
  { question: "What is the boiling point of water in Celsius?", answer: "100" }
];

export default function QuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const checkAnswer = () => {
    const correctAnswers = Array.isArray(questions[currentQuestion].answer)
      ? questions[currentQuestion].answer.map(ans => ans.toLowerCase())
      : [questions[currentQuestion].answer.toLowerCase()];
    
    if (correctAnswers.includes(userAnswer.trim().toLowerCase())) {
      setScore(score + 1);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer("");
        setFeedback(`Correct! You earned ${score + 1} จุ้บ.`);
      } else {
        setFeedback(`Congratulations! You have completed the quiz with ${score + 1} จุ้บ.`);
      }
    } else {
      setFeedback("Incorrect! Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <Card className="p-6 bg-[#5c6bc0] text-white text-center shadow-lg rounded-2xl">
          <CardContent>
            <motion.h1
              className="text-2xl font-bold mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Quiz Game
            </motion.h1>
            <motion.p
              className="text-lg mb-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {questions[currentQuestion].question}
            </motion.p>
            <Input
              className="text-black px-3 py-2 rounded-lg w-full mb-3"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer here..."
            />
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button className="bg-[#7986cb] hover:bg-[#5c6bc0] px-4 py-2 rounded-lg" onClick={checkAnswer}>
                Submit
              </Button>
            </motion.div>
            <motion.p className="mt-3 text-lg">
              Score: {score} จุ้บ
            </motion.p>
            {feedback && (
              <motion.p
                className="mt-3 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {feedback}
              </motion.p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
