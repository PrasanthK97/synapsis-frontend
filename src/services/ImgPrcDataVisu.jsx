import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './ImgPrcDataVisu.css';

function ImgPrcDataVisu() {
  const [loading, setLoading] = useState(false);
  const [isDevViewEnabled, setIsToggled] = useState(false);
  const [isOpObtained, setIsOpObtained] = useState(true);
  const location = useLocation();
  const data = location.state.outputData;
  const measurementData = data.inference_results.measurements
  console.log(location.state.imageFile)
  console.log(data)

  const toggleDevView = () => {
            setIsToggled(prev => !prev); 
    };

  return (
    <div className="img-prc-data-container">

      {loading ? (
         <div>
          <h2>Processing The Image</h2>
          <div className="spinner"></div>
         </div>
      ) : (
        <div className="img-output-container"> 
            <div className="img-container">
              <img className="uploaded-img" src={location.state.imageFile} alt="logo" style={{ maxWidth: "400px" }}/>
            </div>
            <div>           
               {isOpObtained ? 
                (
                  <div>
                    <div className="dev-view-button-container">
                          <button className="dev-view-button" onClick={toggleDevView}>{isDevViewEnabled ? 'Disable Dev View' : 'Enable Dev View'}</button>
                    </div>
                    <div className="output-container">          
                        <>
                          {isDevViewEnabled ?
                                <h3 >Image Inference Result (JSON): {<pre>{JSON.stringify(data, null, 2)}</pre>}</h3>
                              : 
                                <div className="intensity-table-container">
                                    <table border="3" cellPadding="8" cellSpacing="0">
                                    <thead>
                                        <tr>                                    
                                            <th>Signal A Intensity</th>
                                            <th>Signal B Intensity</th>
                                            <th>Ratio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{measurementData.signal_a_intensity}</td>
                                            <td>{measurementData.signal_b_intensity}</td>
                                            <td>{measurementData.ratio}</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                          }
                        </> 
                    </div>
                  </div>
                  )
                  : (<p></p>)            
               }
            </div>
        </div>
        )
      }
    </div>
  );
}

export default ImgPrcDataVisu;