
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

function postPersonData(){

  page_url = window.location.pathname;
  page_url = page_url.split('/');
  controller_wid_url = page_url.slice(0,page_url.length-1).join('/')

  // console.log("********MOMOOO");
  // var newdata = document.getElementById("first-name").value;
  // var newdata={"user":{"first_name":"Bozo","last_name":"","headline":"","location":"","email_address":""}}

  return $.ajax({
    type: 'PUT',
    url: controller_wid_url,
    data: newdata,
    success: function() {
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

  var CardEditForm = React.createClass({
    data: data,
    render: function() {
      return (
        <div>
        <form  id="card-edit" action="/card_specs/14" method="POST">
            <h3><label>First name: <input type="text" name="first-name" placeholder={this.data.first_name} /></label></h3>
            <h3><label>Last name: <input type="text" name="last-name" placeholder={this.data.last_name} /></label></h3>
            <h3><label>Headline: <input type="text" name="headline" placeholder={this.data.headline} size="30" /></label></h3>
            <h3><label>Location: <input type="text" name="location" placeholder={this.data.location} size="30" /></label></h3>
            <h3><label>Email: <input type="email" name="email" placeholder={this.data.email_address} /></label></h3>
            <h3><button id="submit" type="submit">Update Your Card</button> </h3>
        </form>
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

    React.render(
      <CardEditForm />,
      document.getElementById('editcard-form')
    );

  }

}

$( document ).ready(function() {

  if ($("#newcard-title").length > 0 || $("#showcard-title").length > 0) {
    getPersonData();
  }

  if ($("#editcard-title").length > 0) {
    getPersonData();
    $(function() {
      console.log("MMOOOOOO-------------------")
      var form = $('#card-edit');
      // $('submit').on("click",function(event){
      //   event.preventDefault();
      //   console.log("SHIIIT")
      // })
      // Set up an event listener for the contact form.
        // $(form).bind('submit', function (event) {
        //     event.preventDefault();
        //                     console.log("MMOOOOOO!!!!!!!!!!!!!!!!!!!!!")
        // });
          $(form).on('submit',function(event) {
          // $(form).submit(function(event) {
              // Stop the browser from submitting the form.
              event.preventDefault();
              event.stopImmediatePropagation();
              console.log("MMOOOOOO!!!!!!!!!!!!!!!!!!!!!")
              var formData = $(form).serialize();
              console.log(formData);
              // TODO
          });
      // console.log(formData);
      // Get the messages div.
      //var formMessages = $('#form-messages');

      // TODO: The rest of the code will go here...
    });
  }

});
