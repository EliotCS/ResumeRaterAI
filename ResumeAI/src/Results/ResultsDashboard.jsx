import { useState } from 'react'
import './ResultsDashboard.css'

function ResultsDashboard({ analysisData }) {
  const [copiedIndex, setCopiedIndex] = useState(null)

  if (!analysisData){
     return null}

  const {
    match_percentage = 0,
    match_summary = '',
    missing_keywords_and_tools = [],
    quantifiable_impact_suggestions = [],
    recommended_skills_to_add = [],
    line_by_line_feedback = []
  } = analysisData

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getScoreColor = (score) => {
    if (score >= 80) {
        return "rgb(6, 201, 71)"
    }
    if (score >= 60){

    return "#f99f04"
    }
    return "rgb(209, 21, 21)"
  }

  return (
    <div className="dashboard-container">
      <div className="card overview-card">
        <div 
          className="score-circle" 
          style={{ borderColor: getScoreColor(match_percentage) }}
        >
          <span className="score-num" style={{ color: getScoreColor(match_percentage) }}>
            {match_percentage}%
          </span>
          <span className="score-label">ATS Score</span>
        </div>
        <div className="overview-text">
          <h2>ATS Alignment Summary</h2>
          <p>{match_summary}</p>
        </div>
      </div>

      <div className="grid-2col">
        <div className="card">
          <h3 className="card-header text-danger">🚨 Missing Required ATS Keywords</h3>
          <p className="card-subtitle">Add these tools/technologies to pass ATS filters:</p>
          <div className="badge-wrap">
            {missing_keywords_and_tools.map((item, idx) => (
              <span key={idx} className="badge badge-missing">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="card-header text-success">Recommended Tech to Highlight</h3>
          <p className="card-subtitle">Skills worth emphasizing for this target role:</p>
          <div className="badge-wrap">
            {recommended_skills_to_add.map((item, idx) => (
              <span key={idx} className="badge badge-recommended">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {quantifiable_impact_suggestions.length > 0 && (
        <div className="card">
          <h3 className="card-header">Suggested Metrics & Numbers to Add</h3>
          <ul className="impact-list">
            {quantifiable_impact_suggestions.map((suggestion, idx) => (
              <li key={idx}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="critique-section">
        <h2 className="section-title">Line-by-Line Resume Analysis</h2>

        {line_by_line_feedback.map((item, index) => (
            <div key={index} className="card line-card">
            <div className="line-header">
                <span className="location-tag">Section: <strong>{item.section}</strong></span>
                <span className={`action-tag action-${item.action?.toLowerCase()}`}>{item.action}</span>
            </div>

            <div className="line-body">
                <div className="box original-line-box">
                <span className="box-title">Original Resume Line:</span>
                <p className="original-text">"{item.current_text}"</p>
            </div>

            <div className="box critique-box">
                <span className="box-title">What Needs to Change:</span>
                <p>{item.critique}</p>
            </div>

            <div className="box improved-line-box">
                <div className="improved-header">
                <span className="box-title">Recommended High-Impact Rewrite:</span>
                <button 
                    className="copy-btn" 
                    onClick={() => handleCopy(item.improved_version, index)}
                >
                    {copiedIndex === index ? "✓ Copied" : "Copy Text"}
                </button>
                </div>
                <p className="improved-text">{item.improved_version}</p>
            </div>
            </div>
        </div>
        ))}
    </div>
    </div>
    )
}

export default ResultsDashboard