import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid'
import './index.css';
import * as serviceWorker from './serviceWorker';

class Space extends React.Component {
    render() {
        return(<Grid 
                    item xs={1} 
                    className={this.props.value}
                    onClick={() => this.props.onClick()}>
                </Grid>);
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            spaces: Array(144).fill("space"),
            redTurn: true
        }
    }

    renderSpace(i) {
        return <Space
                    value={this.state.spaces[i]}
                    onClick={() => this.handleClick(i)}>
                </Space>;
    }

    handleClick(i) {
        const spaces = this.state.spaces.slice();
        
        if (spaces[i] === "redSpace" || spaces[i] === "blueSpace") {
            return;
        }

        spaces[i] = this.state.redTurn ? "redSpace" : "blueSpace";
        
        this.checkBoardState(i);

        this.setState({
            spaces: spaces,
             redTurn: !this.state.redTurn}
            )
    }

    //Recursive wrapper
    //Checks if the current move led to a connected segment
    checkBoardState(i) {
        //logic:
        //Recurse from the current piece on all surrounding pieces
        
        //Stopping conditions:
            //if arrive back at self, you control a section not touching the walls
                //Call markFloatingSection(startPiece)
            //if arrive at two edge pieces, conrol a section touching the walls
                //Call markEdgeSection(firstEdge, secondEdge)
            //if all surrounding are either visited or opposite color, return
    }

    buildGrid(){
        let children = []
        for(let i=1; i<145; ++i) {
            children.push(this.renderSpace(i));
        }
        return children;
    }

    render() {
        return (
            <div className="border">
                <Grid container spacing={1} className="gameBoard" direction="row" justify="center" alignItems="center">
                    {this.buildGrid()}
                </Grid>
            </div>
        );
    
    }
}

  ReactDOM.render(<Board />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
