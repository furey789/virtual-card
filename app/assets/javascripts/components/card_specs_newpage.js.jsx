
var Card = React.createClass({

  loadLinksFromServer: function() {
      return $.ajax({
          type: 'GET',
          url: '/card_specs',
          dataType: 'json',
          success: function(data) {
            this.setState(data);
          }.bind(this),
          error: function() {
            alert("Ajax error!");
          }
      });
  },

  getInitialState: function() {
      return {data: {}};
  },

  componentWillMount: function() {
      this.loadLinksFromServer();
  },

  render: function() {
    //console.log(this.state);

    return (
      <div>

        <Title data={this.state} />

        <table className="table">
          <tr className="row">
            <td id="myname">
              {this.state.first_name + ' ' + this.state.last_name}
            </td>
            <td id="mypicture">
              <img src={this.state.picture_url} alt='photo' />
            </td>
          </tr>
          <tr className="row">
            <td>
              {this.state.headline}
            </td>
          </tr>
          <tr className="row">
            <td>
              {this.state.location}
            </td>
          </tr>
          <tr className="row">
            <td>
              {this.state.email_address}
            </td>
          </tr>
          <tr className="row">
            <td>
              See more at: <a href={this.state.public_profile_url}> LinkedIn </a>
            </td>
          </tr>
        </table>

        <Links data={this.state} />

      </div>
    )
  }
});

var Title = React.createClass({

  render: function() {

    if (this.props.data.loggedin === "yes"){
      return (
        <h1>{this.props.data.pagetitle}</h1>
      )
    } else {
      return (
        <div></div>
      )
    }

  }
});

var Links = React.createClass({

  render: function() {

    if (this.props.data.loggedin === "yes"){

      var main_url = window.location.pathname
      main_url = main_url.split('/');
      main_url.pop();
      edit_url = main_url.join('/')+'/'+this.props.data.id+'/edit';
      return (
        <h2><a href={edit_url} title="edit"> Edit </a></h2>
      )

    } else {

      return (
        <div></div>
      )

    }

  }

});

// TO DO?  <h2><a href='/' title="signout"> Sign Out </a></h2>

$( document ).ready(function() {

  if ($("#newcard").length > 0) {

    React.render(
      <Card />,
      document.getElementById('newcard')
    );

  }

});
