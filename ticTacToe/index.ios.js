/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';


class Square extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={() => this.props.onPress()}>
        <Text style={styles.mark}>{this.props.value}</Text>
      </TouchableOpacity>
    )
  }
}

class Board extends Component {
  renderSquare(i){
    return <Square value={this.props.squares[i]} onPress={() => this.props.onPress(i)} />;
  }
  render() {
    return (        
      <View style={styles.board}>

          <View style={styles.row}>
          
            <View style={styles.square}>
              {this.renderSquare(0)}
            </View>
          
            <View style={styles.square}>
               {this.renderSquare(1)}
            </View>

            <View style={styles.square}>
               {this.renderSquare(2)}
            </View>

          </View>

          <View style={styles.row}>
          
            <View style={styles.square}>
               {this.renderSquare(3)}
            </View>
          
            <View style={styles.square}>
               {this.renderSquare(4)}
            </View>
          
            <View style={styles.square}>
               {this.renderSquare(5)}
            </View>

          </View>

          <View style={styles.row}>
          
            <View style={styles.square}>
               {this.renderSquare(6)}
            </View>
          
            <View style={styles.square}>
               {this.renderSquare(7)}
            </View>
          
            <View style={styles.square}>
               {this.renderSquare(8)}
            </View>

          </View>

        </View>
    )
  }
}

class ticTacToe extends Component {
  constructor() {
    super()
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }
  handlePress(i) {
    const squares = this.state.squares.slice()

    if (!calculateWinner(squares) && !squares[i]) {
      squares[i] = this.state.xIsNext ? 'X' : 'O'
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext
      })
    }
  }
  restart() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true
    })
  }
  render() {
    const winner = calculateWinner(this.state.squares)

    let status

    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <View style={styles.container}>
        <Text style={styles.info}>{status}</Text>

        <Board
            squares={this.state.squares}
            onPress={(i) => this.handlePress(i)}
        />

        <Text style={styles.info} onPress={() => this.restart()}>Restart</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60
  },
  info: {
    fontSize: 30,
    marginBottom: 20,
    marginTop: 20
  },
  board: {
    width: 306,
    height: 314,
    borderWidth: 3,
    backgroundColor: '#000',
  },
  row: {
    alignItems: 'flex-end',
    height:102,
    width:306,
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  },
  square: {
    backgroundColor: '#ddd',
    height:100,
    width:100,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000000'
  },
  mark: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#ea2',
  },
  button: {
    backgroundColor: '#ddd',
    height:100,
    width:100,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000000'
  }
})

/// Helpers

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/// App Export 

AppRegistry.registerComponent('ticTacToe', () => ticTacToe);
