"use strict";

$(document).ready(function () {

  if ($("#welcome-title").length > 0) {

    var text = ["Virtual Card", "Here, you can create a virtual business card to share with colleagues and clients.", "You must have a LinkedIn account to get started."];

    var Welcome = React.createClass({
      displayName: "Welcome",

      text: text,
      render: function render(text) {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            null,
            " ",
            this.text[0],
            " "
          )
        );
      }
    });

    var About = React.createClass({
      displayName: "About",

      text: text,
      render: function render(text) {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            null,
            " ",
            this.text[1],
            " "
          ),
          React.createElement(
            "h2",
            null,
            " ",
            this.text[2],
            " "
          )
        );
      }
    });

    React.render(React.createElement(Welcome, null), document.getElementById('welcome-title'));
    React.render(React.createElement(About, null), document.getElementById('about'));
  }
});