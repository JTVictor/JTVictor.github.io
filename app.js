import React from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

class App extends React.Component {
  state = {
    groups: []
  };

  componentDidMount() {
    axios.get('https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json')
      .then(res => {

        const findTeam = id => {
          return res.data.teams.find(team => team.id === id);
        };

        const groups = Object.values(res.data.groups).map(group => {
          return {
            name: group.name.replace('Group ', ''),
            winner: findTeam(group.winner).emojiString,
            runnerup: findTeam(group.runnerup).emojiString
          };
        });

        this.setState({ groups }, () => console.log(this.state));
      });
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.state.groups.map((group, i) =>
              <th key={i}>{group.name}</th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            {this.state.groups.map((group, i) =>
              <td key={i}>{group.winner}</td>
            )}
          </tr>
          <tr>
            {this.state.groups.map((group, i) =>
              <td key={i}>{group.runnerup}</td>
            )}
          </tr>
        </tbody>
      </table>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
