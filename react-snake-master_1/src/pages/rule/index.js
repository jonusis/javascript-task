import React, { Component } from 'react';
import {  Link } from 'react-router-dom'
import './rule.scss';
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return <div>
            <div className='back'>
                <div className='cnt'>
                    <div className='word'>
                        <img src={require('../../images/description.png')} alt='' className='descrip'></img>
                    </div>
                <Link to='/snake'>
                <button className='button' >
                    <img src={require('../../images/button_start.png')} alt='' className='start'/>
                </button>
                </Link>
                <div className='small_snake'>
                    <img src={require('../../images/small_snake.png')} alt='' className='detail'/>
                </div>
            </div>
        </div>
    </div>
    }
}