
function getPersonData(){

  return $.ajax({
    type: 'GET',
    url: '/card_specs',    // Action found via render in controller
    dataType: 'json',
    success: function(data) {
      page_url = window.location.pathname
      makePage(data,page_url);
    },
    error: function() {
      alert("Ajax error!");
    }
  });

};

function makePage(data,page_url){

  var titles=[
    "Your Virtual Business Card!",
    "Edit Your Card"
    ];

  var CardTitle = React.createClass({
    text: titles,
    render: function(text){
      return (
        <div>
          <h1> {this.text[0]} </h1>
        </div>
      );
    }
  });

  var CardTable = React.createClass({
    data: data,
    render: function() {
      return (
        <table className="table">
          <tr className="row">
            <td>
              {this.data.first_name + ' ' + this.data.last_name}
            </td>
            <td>
              <img src={this.data.picture_url} alt='photo' />
            </td>
          </tr>
          <tr className="row">
            <td>
              {this.data.headline}
            </td>
          </tr>
          <tr className="row">
            <td>
              {this.data.location}
            </td>
          </tr>
          <tr className="row">
            <td>
              {this.data.email_address}
            </td>
          </tr>
          <tr className="row">
            <td>
              See more at: <a href={this.data.public_profile_url}> LinkedIn </a>
            </td>
          </tr>
        </table>
      );
    }
  });

  var CardEditTitle = React.createClass({
    text: titles,
    render: function(text){
      return (
        <div>
          <h1> {this.text[1]} </h1>
        </div>
      );
    }
  });

  var page_url = page_url.split('/');
  var last_elem = page_url[page_url.length-1]

  if ( last_elem.slice(0,3) == "new" ) {

    React.render(
      <CardTitle />,
      document.getElementById('newcard-title')
    );

    React.render(
      <CardTable />,
      document.getElementById('newcard-table')
    );

  }

  if ( last_elem.slice(0,3) != "new" && last_elem != "edit" ) {

    React.render(
      <CardTitle />,
      document.getElementById('showcard-title')
    );

    React.render(
      <CardTable />,
      document.getElementById('showcard-table')
    );

  }

  if ( last_elem == "edit" ) {

    React.render(
      <CardEditTitle />,
      document.getElementById('editcard-title')
    );

  }

}

$( document ).ready(function() {

  if ($("#newcard-title").length > 0 || $("#showcard-title").length > 0) {
    getPersonData();
  }

  if ($("#editcard-title").length > 0) {
    getPersonData();
  }

});
