import './Main.css'
import { useState } from 'react'

import Header from './Header/Header.jsx'
import JobSelection from './Selection/JobSelection.jsx'
import File from './Selection/File.jsx'
import ResultsDashboard from './Results/ResultsDashboard.jsx'

function App() {
    const [file, setFile] = useState(null)
    const [jobTitle, setJobTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const [analysis, setAnalysis] = useState(null)

    const handleAnalyze = async (e) => {
    e.preventDefault()

    if (!file || !jobTitle) {
      alert('Please select both a file and a job title!')
      return
    }

    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('JobTitle', jobTitle)

  try{
    const response = await fetch("http://127.0.0.1:8000/api/analyze",{
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`)
      }

      const data = await response.json()
      console.log('CONNECTED TO BACKEND SUCCESSFULLY!', data)
      setAnalysis(data.analysis_data)
  } 
  
  catch (error){
    console.error('❌ FETCH ERROR:', error)
  } finally {
      setLoading(false)
    }
  }

  return (  <>
      <Header/>
    <form onSubmit={handleAnalyze}>
      <div className="selection-container">
          <File file={file} setFile={setFile} />
          <JobSelection jobTitle={jobTitle} setJobTitle={setJobTitle} loading={loading}/>
        </div>
    </form>

      {analysis && <ResultsDashboard analysisData={analysis} />}

  </>
  
  );
    }

export default App
