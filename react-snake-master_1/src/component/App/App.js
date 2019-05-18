import React, { Component } from 'react';
import './App.css';

import Portal from '../../common/Portal';
// import Index from '../../pages/index/index';
// import  Rule from '../../pages/rule/index';

class App extends Component {

    render() {
        return (
            <div className="App">
                <Portal />
                {/* <Index /> */}
                {/* <Rule /> */}
            </div>
        );
    }
}

export default App;