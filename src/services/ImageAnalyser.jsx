import React, {useState, useEffect,useCallback} from "react";
import { useNavigate } from 'react-router-dom';

import './ImageAnalyser.css';

const ImageAnalyser = () => {
    
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [isOpObtained, setIsOpObtained] = useState(false);
    const [measurementData, setMeasurementData] = useState({});

    useEffect(() => {
        setFile(null);
        setLoading(false);
        setResult("");
        setMeasurementData({});
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];

        if (!droppedFile.type.startsWith("image/")) {
            alert("Only image files are allowed.");
            return;
        }

        setFile(droppedFile);
            e.dataTransfer.clearData();
        }
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleUpload = async () => {

    if(!file){
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    console.log(file.type)
    
    try {
        setLoading(true);        // 🔥 Start spinner
        setResult("");
        if(file.type.startsWith("image/")){
            const response = await fetch("http://localhost:5000/api/v1/analyze-image", {
            method: "POST",
            body: formData
        });
        
        const data = await response.json();
        console.log(response.status, data);
        if(response.status === 400){
            alert("Invalid file type. Please upload an image.");
            setFile(null);
            return;
        } else if(response.status === 500){
            alert("Server error. Please try again later.");
            setFile(null);
            return;
        } 
    
        setMeasurementData(data.inference_results.measurements);
        setResult(data);
        setIsOpObtained(true);
        console.log(measurementData);
        const fileUrl = URL.createObjectURL(file);
        navigate('/img_data', { state: {imageFile: fileUrl, outputData: data }});
    
    }

      } catch (error) {
        console.error("Error:", error);
        
        setResult("Error occurred");
      } finally {
        setLoading(false);       // 🔥 Stop spinner
      }
    
    };
    return(
        <div>
            {loading ? 
                <h3>
                    Processing The Image...
                </h3>
                : 
                <h3>
                    Kindly Upload An Image File
                </h3>
            } 
            <div>
                <div className="input-base-container">
                    {loading ? (
                        <div className="spinner"></div>
                    ) : (
                    <div    className="drop-zone"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                    >
                    {file ? (
                        <p>Selected file: {file.name}</p>
                        ) : (
                        <div >
                            <div className="drag-drop-container">
                                <p>Drag & drop an image here, or click "Choose File" to select</p>
                            </div>
                            <div className="input-container">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                        </div>
                    )}
                       
                        <button className="process-image-button" 
                                onClick={handleUpload} 
                                disabled={loading}
                        > 
                            PROCESS IMAGE
                        </button>
                    </div>
                    )
                    }  
                </div>
            </div>
        </div>
    )
}


export default ImageAnalyser;