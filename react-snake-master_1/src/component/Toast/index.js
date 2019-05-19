import React from 'react';
import {  Link } from 'react-router-dom';
import './index.sass'

class Toast extends React.Component{

  constructor(props){
    super(props);
    this.state={
    }
  }


  render() {
    const { src,toastRemove } = this.props;
    return(
      <div className="toast-box">
        <div className="toast-img">
          <img src={require("../../images/"+src)} alt=""/>
        </div>
        <div className="toast-bottom">
          <Link to ='/index'>
            <img 
              className="toast-button"
              src={require('../../images/end.png')} 
              alt=""
            />
          </Link>
            <button onClick={toastRemove}>
              <img 
                className="toast-button" 
                src={require('../../images/nextlevel.png')} 
                alt=""
                />
            </button>
        </div>
      </div>
    )
  }
}

export default Toast;
