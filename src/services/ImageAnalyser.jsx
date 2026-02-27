import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

import './ImageAnalyser.css';

const ImageAnalyser = () => {
    
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [isOpObtained, setIsOpObtained] = useState(false);
    const [measurementData, setMeasurementData] = useState({});

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
        console.log(data);
        console.log(data.inference_results.measurements);
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
                <div className="input-container">
                    {loading ? (<div className="spinner"></div>
                    ) : (
                    <>
                        <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button className="process-image-button" 
                                onClick={handleUpload} 
                                disabled={loading}
                        > 
                            PROCESS IMAGE
                        </button>
                    </>
                    )
                    }  
                </div>
            </div>
        </div>
    )
}


export default ImageAnalyser;