
$( document ).ready(function() {

  if ($("#welcome-title").length > 0) {

    var text=[
      "Virtual Card",
      "Here, you can create a virtual business card to share with colleagues and clients.",
      "You must have a LinkedIn account to get started."
      ];

    var Welcome = React.createClass({
      text: text,
      render: function(text){
        return (
          <div>
            <h1> {this.text[0]} </h1>
          </div>
        );
      }
    });

    var About = React.createClass({
      text: text,
      render: function(text){
        return (
        <div>
          <h2> {this.text[1]} </h2>
          <h2> {this.text[2]} </h2>
        </div>
        );
      }
    });

    React.render(
      <Welcome />,
      document.getElementById('welcome-title')
    );
    React.render(
      <About />,
      document.getElementById('about')
    );

  }

});
