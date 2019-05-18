import React from 'react';
import ProgressBar from '../progressBar';
import './headera.scss'

class Header extends React.Component{

  constructor(props){
    super(props);
    this.state={

    }
  }


  render() {
    const { level,status,handleStart,handleRestart,pause,redblock,greenblock,blueblock,targetR,targetG,targetB} = this.props;
    return(
      <div className="game-header">
        <div className="header-level inline title-font">关卡：{level}</div>
        <div className="inline title-font target-box">目标颜色：
          <div 
            className="target-color"
            style={{background: "rgb("+targetR+","+targetG+","+targetB+")"}}
          />
        </div>
        <div className="inline header-bar">
          <ProgressBar 
            color="rgba(255, 0, 0, 1)"
            status={redblock}
            target={targetR}
            id="red-loading"
          />
          <ProgressBar 
            color="rgba(128, 194, 105, 1)"
            status={greenblock}
            target={targetG}
            id="green-loading"
          />
          <ProgressBar 
            color="rgba(68, 138, 202, 1)"
            status={blueblock}
            target={targetB}
            id="blue-loading"
          />
        </div>
        <div className="inline">
          <div className="h-button">
          <button className="pause header-button" onClick={status === 'pause' ? handleStart : pause}>
            {status === 'pause' ? 'Continue' : 'Pause'}
          </button>
          <button className="restart header-button" onClick={handleRestart}>Restart</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
