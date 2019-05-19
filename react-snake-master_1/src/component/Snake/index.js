import React, { Component } from 'react';
import './index.scss';
import Header from '../Header';
import Toast from '../Toast';

const size = { row: 18, col: 35 }
var direction = { down: 1, up: 2, left: 3, right: 4 };
var red = <div className="red"></div>;
var green = <div className="green"></div>;
var blue = <div className="blue"></div>;
var black = <div className="black"></div>;

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {r: 20, g: 80, b: 20},
                {r: 40, g: 20, b: 100},
                {r: 20, g: 120, b: 40},
                {r: 120, g: 20, b: 60},
                {r: 120, g: 20, b: 100},
                {r: 240, g: 40, b: 20},
                {r: 100, g: 220, b: 20},
                {r: 20, g: 140, b: 200},
                {r: 240, g: 80, b: 60},
                {r: 40, g: 220, b: 160},
                {r: 240, g: 140, b: 60},
                {r: 160, g: 60, b: 240},
                {r: 240, g: 200, b: 40},
                {r: 100, g: 160, b: 240},
                {r: 180, g: 240, b: 80},
                {r: 100, g: 180, b: 240},
                {r: 200, g: 100, b: 220},
                {r: 100, g: 240, b: 200},
                {r: 240, g: 240, b: 200},
                {r: 240, g: 200, b: 220}
            ],
            checked:false,
            snake: [{ x: 1, y: 1 }],
            food: [{ x: 1, y: 4 , color:'red'},{ x: 3, y: 3 , color:'green'},{ x: 10,y: 20 , color:'blue'}],
            dir: direction.right,
            redblock: 0,
            blueblock: 0,
            greenblock: 0,
            redRequest: 1,
            blueRequest: 1,
            greenRequest: 1,//
            level:1,
            interval: '', //暂停和开始自动移动
            status: 'start', // start or pause
            isToast: false,
            isWin: false
        }
    }

    componentDidMount() {
        // 键盘点击事件
        document.onkeydown = function (event) {
            var e = event || window.event;
            var keyCode = e.keyCode;
            if (keyCode === 37 || keyCode === 65) { // left a
                this.move(direction.left);
                this.setState({ dir: direction.left })
            } else if (keyCode === 38 || keyCode === 87) { // up w
                this.move(direction.up);
                this.setState({ dir: direction.up })
            } else if (keyCode === 39 || keyCode === 68) { //right d
                this.move(direction.right);
                this.setState({ dir: direction.right })
            } else if (keyCode === 40 || keyCode === 83) { // down s
                this.move(direction.down);
                this.setState({ dir: direction.down })
            }
        }.bind(this);
        // 初次渲染的时候开启定时
        this.timer();
    }


    render() {
        const { isToast,isWin,level,status,redRequest,blueRequest,greenRequest,checked} = this.state;
        return <div className="background">
        <div className="snakeBackground">
            <Header 
              targetR={redRequest * 20}
              targetG={greenRequest * 20}
              targetB={blueRequest * 20}
              level={level}
              status={status}
              pause={this.pause.bind(this)}
              handleRestart={this.handleRestart.bind(this)}
              handleStart={this.handleStart.bind(this)}
            />
            <div className="snakeBody">
                <table border="1">
                    {this.renderBackground()}
                </table>
                <img src={require('../../images/move_snake.png')} className={checked? 'snake_move':'none'} alt=''/>
            </div>
            {isToast ? 
              <Toast
                src={isWin ?"winsnake.png" : "losesnake.png"}
                toastRemove={this.toastRemove.bind(this)}
              /> : 
              ""
            }
        </div>
    </div>
    }

    //移除toast
    toastRemove() {
      this.setState({
        isToast: false
      })
      this.handleRestart();
    }

    renderBackground() {
        this.changecolor();
        let trs = [];
        for (let i = 0; i < size.row; i++) {
            let tds = [];
            for (let j = 0; j < size.col; j++) {
                let value = this.getSnack(i, j);
                if (value === 0) {
                    tds.push(<td key={i * 200 + j}></td>);
                } else if (value === 1) {
                    tds.push(<td key={i * 100 + j}>{black}</td>)
                } else if (value === 2) {
                    tds.push(<td key={i * 5 + j}>{red}</td>)
                } else if (value === 3) {
                    tds.push(<td key={i * 5 + j}>{green}</td>)
                } else if (value === 4) {
                    tds.push(<td key={i * 5 + j}>{blue}</td>)
                }
            }
            trs.push(<tr key={i}>{tds}</tr>)
        }
        return <tbody>{trs}</tbody>;
    }

    // 获取在方块中蛇以及食物的显示
    getSnack = (c, r) => {
        const { snake, food } = this.state;
        for (let s in snake ) {
            // 如果这个点是蛇，则返回1
            if (snake[s].x === c && snake[s].y === r) {
                return 1;
            }
            for (let obj in food ) {
            // 如果这个点是食物，则返回2
            if (food[obj].x === c && food[obj].y === r && food[obj].color === 'red') {
                return 2;
            }else if(food[obj].x === c && food[obj].y === r && food[obj].color === 'green') {
                return 3;
            }else if(food[obj].x === c && food[obj].y === r && food[obj].color === 'blue') {
                return 4;
            }
        }
    }
        // 如果这个点什么都不是返回0
        return 0;
    }
    changecolor(){
        let e = document.getElementsByClassName('black');
        //console.log(e);
        let {redblock,blueblock,greenblock} = this.state;
        let r = redblock*20;
        let g = greenblock*20;
        let b = blueblock*20;
        for(let index of e){
            index.style.backgroundColor = "rgb(" + [r,g,b].join(',') +")";
        }
    }
    // 定时自己移动
    timer = () => {
        let {level} = this.state;
        let interval = setInterval(function () {
            this.move(this.state.dir);
        }.bind(this), 500-level*20);
        this.setState({ interval, status: 'start' })
    }

    move = (dir) => {
        const { snake,food} = this.state;
        let first = { x: snake[0].x, y: snake[0].y }
        let last = {};
        // move
        if (dir === direction.up) {
            first.x -= 1;
        } else if (dir === direction.down) {
            first.x += 1;
        } else if (dir === direction.left) {
            first.y -= 1;
        } else if (dir === direction.right) {
            first.y += 1;
        }

        // 撞到自己
        let _snake = snake.filter(item => item.x === first.x && item.y === first.y)
        if (first.y > size.col - 1 || first.y < 0 || first.x < 0 || first.x > size.row - 1 || _snake.length > 0) {
            this.loseToast();//失败弹窗
            return;
        }
        //是否结束
        let {list,redblock,greenblock,blueblock,redRequest,greenRequest,blueRequest,level} = this.state;
        if((redblock >= redRequest)&&(greenblock >= greenRequest)&&(blueblock >= blueRequest)){
            let rgb = {};
            rgb = list[level];
            level += 1;
            this.resetZero();//?
            this.setState({
              level: level,
              readRequest: rgb.r / 20,
              greenRequest: rgb.g / 20,
              blueRequest: rgb.b / 20,
            });
            this.winToast();
            return;
        }
        let eat = false;
        // 吃到食物
    for(let obj in food){
        if (first.x === food[obj].x && first.y === food[obj].y) {
            eat = true;
            last = { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y }
            this.showFood(obj);
        }
    }

        // 蛇整体动起来
        for (let s in snake) {
            var next_first = { x: snake[s].x, y: snake[s].y };
            snake[s].x = first.x;
            snake[s].y = first.y;
            first = next_first;
        }
        // 吃到食物之后蛇变长
        if (eat) {
            snake[snake.length] = last
        }

        this.setState({ snake })
    }

    // 暂停
    pause = () => {
        let i = this.state.interval;
        window.clearInterval(i); // 清除定时器
        this.setState({ status: 'pause' })
    }

    // 开始
    handleStart = () => {
        const { status } = this.state;
        if (status === 'pause') {
            this.timer();  // 重新开启定时器
        }
    }
    //将当前值清零
    resetZero = () =>{
      document.getElementById("red-loading").style.width = "0px";
      document.getElementById("green-loading").style.width = "0px";
      document.getElementById("blue-loading").style.width = "0px";
      let i = this.state.interval;
      window.clearInterval(i);
      this.setState({
        redblock:0,
        blueblock:0,
        greenblock:0,
        dir: direction.right,
        snake: [{ x: 1, y: 1 }],
        interval: '', //暂停和开始自动移动
        status: 'start', // start or pause
        food: [{ x: 1, y: 4 , color:'red'},{ x: 3, y: 3 , color:'green'},{ x: 10,y: 20 , color:'blue'}]
      })
      this.timer()
    }


    //winToast胜利弹窗
    winToast() {
      this.pause();
      this.setState({
        isToast: true,
        isWin: true
      })
    }
    //失败弹窗
    loseToast() {
        this.pause();
        this.setState({
          isToast: true
        })
    }

    // 重新开始
    handleRestart = () => {
        let i = this.state.interval;
        window.clearInterval(i);
        document.getElementById("red-loading").style.width = "0px";
        document.getElementById("green-loading").style.width = "0px";
        document.getElementById("blue-loading").style.width = "0px";
        this.setState({
            snake: [{ x: 1, y: 1 }],
            food: [{ x: 1, y: 4 , color:'red'},{ x: 3, y: 3 , color:'green'},{ x: 10,y: 20 , color:'blue'}],
            dir: direction.right,
            interval: '', //暂停和开始自动移动
            status: 'start', // start or pause
            redblock:0,
            blueblock:0,
            greenblock:0,
        })
        this.timer()
    }

    // 显示新的食物
    showFood = (index) => {
        let x = parseInt(Math.random() * size.row);
        let y = parseInt(Math.random() * size.col);
        if (this.getSnack() !== 0) {
            x = parseInt(Math.random() * size.row);
            y = parseInt(Math.random() * size.col);
        }
        //每次显示新的食物意味着吃了上一个食物，加1分
        let {redblock,greenblock,blueblock,redRequest,greenRequest,blueRequest} = this.state;
        let food = this.state.food;
        let color = food[index].color;
        let len;
        let that = this;
        food.splice(index, 1);
        //吃了食物之后判断当前状态，判断是否要闪烁特效/进度条清零
        if(color === 'red'){
            redblock += 1;
            if(redblock > redRequest) {
              if((redblock - redRequest) === 3)  {
                redblock = 0;
                len = 0;
                this.setState({redblock,checked:true});
                this.pause();
                setTimeout(function () {
                    that.handleStart();
                    this.setState({checked:false});
                }.bind(this),5000);
                //进度条清零，关闭闪烁特效！！！
              }else {
                len = 94; 
                 //此处吃多了，但是还没死，应触发闪烁特效提醒玩家！！！
              } 
            }else { len = redblock / redRequest * 94; }
            document.getElementById("red-loading").style.width = [len+"px"].join("");
            this.setState({redblock});
        }else if(color === 'green'){
            greenblock += 1;
            if(greenblock > greenRequest) {
              if((greenblock - greenRequest) === 3)  {
                greenblock = 0;
                len = 0;
                this.setState({greenblock,checked:true});
                this.pause();
                setTimeout(function () {
                    that.handleStart();
                    this.setState({checked:false});
                }.bind(this),5000);
                //关闭闪烁特效！！！
               }else { 
                len = 94; 
                //此处吃多了，应触发闪烁特效提醒玩家！！！
               } 
            }else { len = greenblock / greenRequest * 94; }
            console.log(len)//
            document.getElementById("green-loading").style.width = [len+"px"].join("");
            this.setState({greenblock});
        }else if(color === 'blue'){
            blueblock += 1;
            console.log("now:"+blueblock+"target"+blueRequest);//
            if(blueblock > blueRequest) {
              if((blueblock - blueRequest) === 3)  {
                blueblock = 0;
                len = 0;
                console.log("3===now:"+blueblock+"target"+blueRequest);//
                this.setState({blueblock,checked:true});
                this.pause();
                setTimeout(function () {
                    that.handleStart();
                    this.setState({checked:false});
                }.bind(this),5000);
                //关闭闪烁特效！！！
              }else { 
                console.log("2===now:"+blueblock+"target"+blueRequest);//
                len = 94; 
                //此处吃多了，但是还没死，应触发闪烁特效提醒玩家
              } 
            }else { len = blueblock / blueRequest * 94;console.log("normal===now:"+ (blueblock / blueRequest)); }
            console.log("len"+len)//
            document.getElementById("blue-loading").style.width = [len+"px"].join("");
            this.setState({blueblock});
        }
        this.setState({ food: [...food,{ x: x, y: y ,color:color}]})
    }
}