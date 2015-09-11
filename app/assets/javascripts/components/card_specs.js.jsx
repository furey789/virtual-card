
function getPersonData(){

    return $.ajax({
      type: 'GET',
      url: '/card_specs',    // Action found via render in controller
      dataType: 'json',
      success: function(data) {
        page_url = window.location.pathname
        makePage(data,page_url);
      }
    });
    
};

function makePage(data,page_url){

  var text=[
    "Here's Your Business Card!"
    ];

  var NewCardTitle = React.createClass({
    text: text,
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

  var arr_page_url = page_url.split('/');
  var last_elem = arr_page_url[arr_page_url.length-1]

  if ( last_elem == "new" ) {

    React.render(
      <NewCardTitle />,
      document.getElementById('newcard-title')
    );

    React.render(
      <CardTable />,
      document.getElementById('newcard-table')
    );

  } else {

    React.render(
      <NewCardTitle />,
      document.getElementById('showcard-title')
    );

    React.render(
      <CardTable />,
      document.getElementById('showcard-table')
    );

  }

}

$( document ).ready(function() {
  if ($("#newcard-title").length > 0 || $("#showcard-title").length > 0) {
    getPersonData();
  }
});
