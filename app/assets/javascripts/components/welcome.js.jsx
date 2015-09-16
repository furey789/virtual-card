
var Welcome = React.createClass({

  loadLinksFromServer: function() {
      return $.ajax({
          type: 'GET',
          url: '/root',
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
      return {data: []};
  },

  componentWillMount: function() {
      this.loadLinksFromServer();
  },

  render: function() {
      return (
          <div>
            <h1> {this.state["title"]} </h1>
            <h2> {this.state["line1"]} </h2>
            <h2> {this.state["line2"]} </h2>
          </div>
      )
  }
});

$( document ).ready(function() {

  if ($("#welcome").length > 0) {
    React.render(
      <Welcome />,
      document.getElementById('welcome')
    );
  }

});
