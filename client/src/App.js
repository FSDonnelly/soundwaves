import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    axios.get('/api/product/brands').then(res => {
      console.log(res);
    });
  }

  render() {
    return <div>MY APP</div>;
  }
}

export default App;
