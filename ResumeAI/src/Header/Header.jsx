import { useState, useEffect } from 'react'
import './Header.css'

function Header() {
  const [typeWord, setTypeWord] = useState("")
  const word = "Resume"

  useEffect(() => {
    let index = 0

    const timer = setInterval(() => {
        if (index < word.length) {
        setTypeWord(word.slice(0, index + 1))
        index++
    } 
        else {
        index = 0
        setTypeWord("")
      }
    }, 500)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="Header">
      <h2>Upload <span className="typed-text">{typeWord}</span></h2>
    </div>
  )
}

export default Header