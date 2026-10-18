import './JobSelection.css'
import {JobsList} from './JobList'

function JobSelection({jobTitle, setJobTitle, loading}){

    return(<div className="jobSelectionBox">
      <div className="InputSection">
      <label className="jobLabel"  htmlFor="job-input">Choose Target Job</label>
      <input id="job-input" list="job-list" type="text" className="job-input" placeholder="Type to search jobs.." value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>

      <datalist id="job-list">
        {JobsList.map((job, index) => (
          <option key={index} value={job} />))}
      </datalist>
</div>
      <button type="submit" className="submitBtn">{loading ? 'Analyzing...' : 'Submit Resume'}</button>

    </div>)
}

export default JobSelection