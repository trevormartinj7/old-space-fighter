import React, {Component} from 'react'

class Grid extends Component{

    constructor(){
        super();
        this.state ={
            grid: [],
            playerCoord: [1,0],
            gridHeight: 30,
            gridWidth: 50,
            asteroidSize: 3,
            numAsteroids: 15,
            playerX: 48,
            playerY: 15,
            attackRange: 3,
            supportRange: 9
        }
        // this.createGridArray = this.createGridArray.bind(this);
        this.emptyOrFull = this.emptyOrFull.bind(this);
        this.displayGrid = this.displayGrid.bind(this);
        this.movePlayer = this.movePlayer.bind(this);
        // this.addObstacles = this.addObstacles.bind(this);
        this.initGrid = this.initGrid.bind(this)
    }

   

    componentDidMount(){
        this.initGrid()
    }

    initGrid(){

        //creates grid of default size
        let grid = [];
        for(let i =0; i < this.state.gridHeight; i++){
            grid.push([])
            for(let j = 0; j < this.state.gridWidth; j++){
                grid[i].push(0)
            }
        }

        //Creates the players ship with default coordinates
        grid[this.state.playerY][this.state.playerX] = 3;


        //Randomly generates asteroids for each encounter
        for(let i =0; i < this.state.numAsteroids; i++){

            let asteroidHeight = this.state.asteroidSize;

            let startCoordX = Math.floor(Math.random() * (40))

            let startCoordY = Math.floor(Math.random() * (20)) 

            let xCheck = startCoordX + asteroidHeight

            let yCheck = startCoordY + asteroidHeight


            for(let j = startCoordX; j < xCheck; j++){
                for(let k = startCoordY; k < yCheck; k++){
                    grid[k][j] = 1;

                }
            }
                
        }
        
        //pushes all these changes into the grid itself
        this.setState({grid: grid})

    }


    consoleLogger(text){
        console.log(text)
    }

    movePlayer(xPos,yPos){
        let grid = [...this.state.grid];
        grid[this.state.playerY][this.state.playerX] = 0;
        grid[yPos][xPos] = 3;
        this.setState({grid: grid, playerY: yPos, playerX: xPos})
        
    }

    displayRange(){
        //This function will convert all movable tiles around the ship to 4 and thereby change their color
        let grid = [...this.state.grid];
        console.log(this.state.playerX)
        for(let i = (this.state.playerX - this.state.attackRange); i < (this.state.playerX + this.state.attackRange + 1); i++){
            console.log(i + " and " + this.state.playerY)
            grid[this.state.playerY][i] = 4;
        }
        console.log(grid)
        this.setState({grid: grid})
    }

    emptyOrFull(value, yPos, xPos){
        if(value == 0){
            return(
                <div className="empty" onClick={() => this.movePlayer(xPos, yPos)}></div>
            )
        } else if(value == 1){
            return (
                <div className="asteroid" onClick={() => this.consoleLogger("full")}></div>
            )
        } else if (value == 3){
            return(
                <div className="player-ship" onClick={() => this.displayRange()}>10</div>
            )
        } else if(value == 4){ 
            return(<div className="movable" onClick={() => this.consoleLogger("full")}></div>)
            
        } else{

        }
    }

    displayGrid(){
        return(this.state.grid.map((el, i) => {
            return (
                <div className="column">
                    {el.map((elx, ix) => {
                        return (
                            <div className="row">
                                {this.emptyOrFull(elx, i, ix)}
                            </div>
                        )
                    })}                            
                </div>

            )
        }))
    }


    render(){

        return(
            <div className="game-grid">
                <div className="square">
                    {this.displayGrid()}
                </div>
            </div>
        )

    }




}

export default Grid;