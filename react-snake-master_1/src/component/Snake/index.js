import React, { Component } from 'react';
import './index.sass';

const size = { row: 30, col: 30 }
var direction = { down: 1, up: 2, left: 3, right: 4 };
var red = <div className="red"></div>;
var green = <div className="green"></div>;
var blue = <div className="blue"></div>;
var black = <div className="black"></div>;

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snake: [{ x: 1, y: 1 }],
            food: [{ x: 1, y: 4 , color:'red'},{ x: 3, y: 3 , color:'green'},{ x: 10,y: 20 , color:'blue'}],
            dir: direction.right,
            redblock:0,
            blueblock:0,
            greenblock:0,
            redRequest:1,
            blueRequest:1,
            greenRequest:1,
            level:1,
            interval: '', //暂停和开始自动移动
            status: 'start', // start or pause
            score: 0,
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
        const { score, status,redblock,blueblock,greenblock } = this.state;
        return <div className="snakeBackground">
            <div className="snakeTitle">
                贪吃蛇
                <div className="snakeScore">score: {score}{redblock}{greenblock}{blueblock}</div>
            </div>
            <div className="snakeBody">
                <table border="1">
                    {this.renderBackground()}
                </table>
                <div className="buttonGroup">
                    <button onClick={status === 'pause' ? this.handleStart : this.pause}>
                        {status === 'pause' ? 'start' : 'pause'}
                    </button>
                    <button onClick={this.handleRestart}>restart</button>
                </div>
            </div>
        </div>
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
        console.log(e);
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
        const { snake, food } = this.state;
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
            this.handleRestart();
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
    //赢得本次胜利
    GameNext = () =>{
        let {redblock,greenblock,blueblock,redRequest,greenRequest,blueRequest,level} = this.state;
        if((redblock >= redRequest + 2)||(greenblock >= greenRequest + 2)||(blueblock >= blueRequest + 2)){
            this.handleRestart();
        }else if((redblock >= redRequest)&&(greenblock >= greenRequest)&&(blueblock >= blueRequest)){
            alert("恭喜你，你赢了！");
            level += 1;
            this.setState({level});
        }
    }
    // 重新开始
    handleRestart = () => {
        alert("对不起，失败了，重新来过吧！");
        let i = this.state.interval;
        window.clearInterval(i);
        this.setState({
            snake: [{ x: 1, y: 1 }],
            food: [{ x: 1, y: 4 , color:'red'},{ x: 3, y: 3 , color:'green'},{ x: 10,y: 20 , color:'blue'}],
            dir: direction.right,
            interval: '', //暂停和开始自动移动
            status: 'start', // start or pause
            score: 0,
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
        let {redblock,greenblock,blueblock} = this.state;
        let score = this.state.score + 1;
        let food = this.state.food;
        let color = food[index].color;
        food.splice(index, 1);
        if(color === 'red'){
            redblock += 1;
            this.setState({redblock});
        }else if(color === 'green'){
            greenblock += 1;
            this.setState({greenblock});
        }else if(color === 'blue'){
            blueblock += 1;
            this.setState({blueblock});
        }
        this.GameNext();
        this.setState({ food: [...food,{ x: x, y: y ,color:color}], score })
    }
}