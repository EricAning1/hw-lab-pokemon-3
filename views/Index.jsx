const React = require('react');
const DefaultLayout = require('./Default.jsx');

const myStyle = {
  color: '#ffffff',
  backgroundColor: '#000000',
};

const style = {
  textDecoration: 'none',
  lineHeight: '30px',
  fontWeight: 'bold',
};

class Index extends React.Component {
  render() {
    console.log(this.props);
    return (
      <DefaultLayout title={'See All The Pokemon!'}>
        <ul>
          {this.props.pokemon.map((pokemon, i) => {
            return (
              <li>
                <a style={style} href={`/pokemon/${pokemon.id}`}>
                  {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                </a>
                <br />
                <a href={`/pokemon/${pokemon._id}/edit`}>EDIT</a>
                <br />
                <form
                  action={`/pokemon/${pokemon._id}?_method=DELETE`}
                  method='POST'
                >
                  <input type='submit' value='DELETE' />
                </form>
              </li>
            );
          })}
        </ul>
        <nav>
          <a style={style} href='/pokemon/new'>
            Create A New Pokemon
          </a>
        </nav>
      </DefaultLayout>
    );
  }
}
module.exports = Index;
