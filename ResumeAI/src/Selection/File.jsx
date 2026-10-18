import './File.css'
import {useState,useEffect} from 'react'

function File ({file, setFile}){
const [fileUrl, setFileUrl] = useState(null)
const [isDragging, setIsDragging] = useState(false)

useEffect(() => {
        if (file && file.type === 'application/pdf') {
        const url = URL.createObjectURL(file)
        setFileUrl(url)
        return () => URL.revokeObjectURL(url)
        } else {
        setFileUrl(null)
        }
        }, [file])

const handleFileChange = (e) =>{
        const selectedFile = e.target.files[0]
        if(selectedFile){
        setFile(selectedFile)   
        setFileUrl(URL.createObjectURL(selectedFile))
        }
}

const handleRemove = () => {
        setFile(null)
        setFileUrl(null)    
}

const handleDragOver = (e) =>{
        e.preventDefault()
        setIsDragging(true)
}

const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
}

const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)

        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) {
                setFile(droppedFile)
                setFileUrl(URL.createObjectURL(droppedFile))
        }
}

return (<div className="uploadFileBox">
        <input type="file" accept=".docx,.pdf" className="FileInput" id="resumeUpload" onChange={handleFileChange}/>

        {!file ? (
                <label htmlFor="resumeUpload" className={`dropzone ${isDragging ? 'dragging' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                        <div className="dropzone2">
                        <p className="upload-text">Click or drag your resume here</p>
                        <span className="file-types">Only file types: .PDF, .DOCX</span>
                        </div>
                </label>) 
                :(
                        <div className="previewContainer">
                                <div className="file-info-header">
                                <p className="file-name">{file.name}</p>
                                <button className="remove-btn" onClick={handleRemove}>Remove</button>
                                </div>
                        {file.type === 'application/pdf' && fileUrl && (
                                <div className="pdf-preview-wrapper">  
                                <iframe src={fileUrl} title="Resume Preview" className="pdf-preview"/>
                                </div>
                                )}
                        </div>

                )}
        </div>
)

}

export default File