
var EditCard = React.createClass({

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

  handleChange: function(event) {
    this.setState({value: event.target.value}); },

	handleSubmit: function(event) {

    event.preventDefault();

    var firstName = React.findDOMNode(this.refs.firstName).value.trim();
    var lastName = React.findDOMNode(this.refs.lastName).value.trim();
    var headline = React.findDOMNode(this.refs.headline).value.trim();
    var location = React.findDOMNode(this.refs.location).value.trim();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var emailOthers = React.findDOMNode(this.refs.emailOthers).value.trim();

    var dataInitial={
      "first_name":firstName,
      "last_name":lastName,
      "headline":headline,
      "location":location,
      "email_address":email,
      "email_address_recipients":emailOthers
    }

    var keys = Object.keys(dataInitial);
    dataReduce={};
    for (i=0;i<keys.length;i++){
      if (dataInitial[keys[i]] != "") {
        dataReduce[keys[i]]=dataInitial[keys[i]];
      }
    }
    data={}
    data["id"] = this.state.id
    data["user"] = dataReduce

    var path = '/card_specs/'+this.state.id;

		$.ajax({
      type: 'PUT',
			url: path,
      dataType: 'json',
			data: data,
			success: function(data) {
        // console.log(data);
        window.location.replace(path)
        }
			});

		},

	render: function() {

		return (
      <div>
        <form className="editCard" onSubmit={this.handleSubmit}>
          <h3><label>First name:</label>
            <input type="text" placeholder={this.state.first_name} ref="firstName"/>
          </h3>
          <h3><label>Last name:</label>
            <input type="text" placeholder={this.state.last_name} ref="lastName" />
          </h3>
          <h3><label>Headline:</label>
            <input type="text" placeholder={this.state.headline} ref="headline" size="30" />
          </h3>
          <h3><label>Location:</label>
            <input type="text" placeholder={this.state.location} ref="location" size="30" />
          </h3>
            <h3><label>Email Address:</label> <input type="email" placeholder={this.state.email_address} ref="email" />
          </h3>
          <p>
            <h2> Add addresses to send your card to colleagues: </h2>
          </p>
          <p>
            <h3><label>Recipient Email Addresses:</label></h3>
            <h3>
              <input type="text" placeholder={this.state.email_address_recipients} ref="emailOthers" size="50"/>
            </h3>
          </p>
            <h1></h1>
            <h3><button id="submit" type="submit">Update Your Card</button></h3>
          </form>
      </div>
    )

   }

});

$( document ).ready(function() {

  if ($("#editcard").length > 0) {
    React.render(
      <EditCard />,
      document.getElementById('editcard')
    );
  }

});
