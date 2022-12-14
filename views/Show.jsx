const React = require('react');

class Show extends React.Component {
  render() {
    const { pokemon } = this.props;

    return (
      <div>
        <h1>Gotta Catch 'Em All!</h1>
        <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src={pokemon.img}></img>
        <nav>
          <a href='/pokemon'>Return To Pokemon Index</a>
        </nav>
      </div>
    );
  }
}
module.exports = Show;
