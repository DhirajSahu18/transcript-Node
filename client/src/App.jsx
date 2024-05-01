import { useState } from 'react'
import './App.css'
import VideoTranscript from './VideoTranscript'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <VideoTranscript/>
    </>
  )
}

export default App
