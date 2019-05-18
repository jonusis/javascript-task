import React, { Component } from 'react';
import {  Link } from 'react-router-dom'
import './index.scss';
import  '../../images/snake_logo.png';
import  '../../images/button.png';
import  '../../images/detail.png';

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return <div >
            <div className='back1'>
                <div className='word'>
                    <img src={require('../../images/snake_logo.png')} alt='' className='logo'/>
                </div>
                <Link to='/rule'>
                <button className='button_1' >
                    <img src={require('../../images/button.png')} alt='' className='start'/>
                </button>
                </Link>
                <div className='small_tab'>
                    <img src={require('../../images/detail.png')} alt='' className='detail_1'/>
                </div>
            </div>
        </div>
    }
}