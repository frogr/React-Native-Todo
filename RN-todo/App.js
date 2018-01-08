import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button
} from 'react-native';

export default class App extends React.Component {
  state = {
    tasks: [],
    text: '',
    error: ''
  };

  handleTextChange = text => {
    this.setState({ text });
  };

  addTodo = () => {
    if (this.state.text === '') {
      this.setState({ error: 'no message in text field.' });
      setTimeout(() => {
        this.setState({ error: '' });
      }, 3000);
      return;
    }
    this.setState(prevState => {
      let { text, tasks } = prevState;
      return {
        tasks: tasks.concat({ key: tasks.length, text }),
        text: ''
      };
    });
  };

  deleteTask = index => {
    this.setState(prevState => {
      let tasks = prevState.tasks.slice();
      tasks.splice(index, 1);
      return { tasks };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {this.state.tasks.length > 0
            ? 'looks like you have stuff to do!'
            : 'free to play games!'}
        </Text>
        {this.state.error !== '' ? <Text>{this.state.error}</Text> : null}
        <TextInput
          style={styles.inputStyles}
          onSubmitEditing={this.addTodo}
          onChangeText={this.handleTextChange}
          value={this.state.text}
          placeholder="add task"
        />
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) => {
            return (
              <View>
                <View style={styles.listContainer}>
                  <Text style={styles.textItem}>{item.text}</Text>
                  <Button onPress={() => this.deleteTask(index)} title="X" />
                </View>
                <View style={styles.hr} />
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    width: '100%'
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textItem: {
    fontSize: 20
  },
  inputStyles: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    width: '70%',
    height: 40,
    marginBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    textAlign: 'center'
  },
  header: {
    color: 'green',
    fontSize: 24,
    marginBottom: 25
  },
  footer: {
    marginBottom: '5%'
  },
  container: {
    marginTop: '40%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
