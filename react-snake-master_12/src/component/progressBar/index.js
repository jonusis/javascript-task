import React from 'react';
// import ProgressBar from './ProgressBar';
import './progress.scss'

class Header extends React.Component{

  constructor(props){
    super(props);
    this.state={

    }
  }

  render() {
    const { isshine,color,id } = this.props;
    return(
      <div className="progress-box">
        <div 
          className="inline progress-circle"
          style={{background: color}}
        />
        <div className="inline progress-loading">
          <div 
            id={id}
            className={isshine?"progress-loading-in-twinkling":"progress-loading-in"}
            style={{background: color}}
         />
        </div>
      </div>
    )
  }
}

export default Header;
