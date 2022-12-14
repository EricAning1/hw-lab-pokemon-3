const React = require('react');
const DefaultLayout = require('./Default.jsx');

class Edit extends React.Component {
  render() {
    return (
      <DefaultLayout title='Edit Page'>
        <form
          action={`/pokemon/${this.props.pokemon._id}?_method=PUT`}
          method='POST'
        >
          Name:
          <input
            type='text'
            name='name'
            defaultValue={this.props.pokemon.name}
          />
          <br />
          Image:
          <input type='text' name='img' defaultValue={this.props.pokemon.img} />
          <br />
          <input type='submit' value='Submit Changes' />
        </form>
      </DefaultLayout>
    );
  }
}
module.exports = Edit;
