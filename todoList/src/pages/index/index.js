import Taro, { Component } from '@tarojs/taro'
import { View, Text, Checkbox } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  constructor(props){
    super(props);
    this.state = {
      list:[],
      inputValue:'',
      checklist: false,
    }
  }
  
  handleBtnClick(){
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    })
  }

  handleInputChange(e){
    this.setState({
      inputValue: e.target.value
    })
  }

  handleItemClick(index){
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState({
      list: list
    })
  }

  handleChooseAll(){
      this.setState({
        checklist:true,
      });
    }
    handleChooseNone(){
      this.setState({
        checklist:false,
      });
    }

  render () {
    return (
      <div className = "Box">
        <h3>to do list</h3>
        <input type = "text" className = "text-type" value = {this.state.inputValue} onChange = {this.handleInputChange.bind(this)}/>
        <span className = "button" >
        <button onClick = {this.handleBtnClick.bind(this)}>add</button>
        </span>
        <div>
          {
            this.state.list.map((item, index) => {
              return <div>
              <input type = "checkbox" checked = {this.state.checklist}></input>
              <input className = "text-type" value={item}/>
              <button className = "button" onclick = {this.handleItemClick.bind(this)}>delete</button>
              </div>
            })
          } 
          <button  onClick = {this.handleChooseAll.bind(this)}>choose all</button>
          <button className = "Box" onClick = {this.handleChooseNone.bind(this)}>choose none</button>
        </div>
       
      </div>
    )
  }
}
