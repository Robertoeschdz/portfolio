import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Weather from './pages/weather/Weather'
import Dino from './pages/dino/Dino'
import Cripto from './pages/cripto/Cripto'
import Quiz from './pages/quizzes/Quizzes'
import AddQuestion from './pages/quizzes/pages/AddQuestion'
import DeliveryApp from './pages/deliveryApp/DeliveryApp'
import MemoryGame from './pages/memoryGame/MemoryGame'
import Results from './pages/memoryGame/pages/Results'
import MusicApp from './pages/music/MusicApp'
import SurveyApp from './pages/survey/SurveysApp'
import Survey from './pages/survey/components/Survey'
import Responses from './pages/survey/components/Responses'
import Chat from './pages/chat/Chat'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/weather' element={<Weather />} />
      <Route path='/dino' element={<Dino />} />
      <Route path='/cripto' element={<Cripto />} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path='/quiz/addquestion' element={<AddQuestion />} />
      <Route path='/delivery' element={<DeliveryApp />} />
      <Route path='/memorygame' element={<MemoryGame />} />
      <Route path='/memorygame/results' element={<Results />} />
      <Route path='/music' element={<MusicApp />} />
      <Route path='/survey' element={<SurveyApp />} />
      <Route path='/survey/:id' element={<Survey />} />
      <Route path='/survey/:id/responses' element={<Responses />} />
      <Route path='/chat' element={<Chat />} />
    </Routes>
  </BrowserRouter>
)
