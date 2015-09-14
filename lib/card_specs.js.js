'use strict';

function getPersonData() {

  return $.ajax({
    type: 'GET',
    url: '/card_specs', // Action found via render in controller
    dataType: 'json',
    success: function success(data) {
      page_url = window.location.pathname;
      makePage(data, page_url);
    },
    error: function error() {
      alert("Ajax error!");
    }
  });
};

function makePage(data, page_url) {

  var titles = ["Your Virtual Business Card!", "Edit Your Card"];

  var CardTitle = React.createClass({
    displayName: 'CardTitle',

    text: titles,
    render: function render(text) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          ' ',
          this.text[0],
          ' '
        )
      );
    }
  });

  var CardTable = React.createClass({
    displayName: 'CardTable',

    data: data,
    render: function render() {
      return React.createElement(
        'table',
        { className: 'table' },
        React.createElement(
          'tr',
          { className: 'row' },
          React.createElement(
            'td',
            null,
            this.data.first_name + ' ' + this.data.last_name
          ),
          React.createElement(
            'td',
            null,
            React.createElement('img', { src: this.data.picture_url, alt: 'photo' })
          )
        ),
        React.createElement(
          'tr',
          { className: 'row' },
          React.createElement(
            'td',
            null,
            this.data.headline
          )
        ),
        React.createElement(
          'tr',
          { className: 'row' },
          React.createElement(
            'td',
            null,
            this.data.location
          )
        ),
        React.createElement(
          'tr',
          { className: 'row' },
          React.createElement(
            'td',
            null,
            this.data.email_address
          )
        ),
        React.createElement(
          'tr',
          { className: 'row' },
          React.createElement(
            'td',
            null,
            'See more at: ',
            React.createElement(
              'a',
              { href: this.data.public_profile_url },
              ' LinkedIn '
            )
          )
        )
      );
    }
  });

  var CardEditTitle = React.createClass({
    displayName: 'CardEditTitle',

    text: titles,
    render: function render(text) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h1',
          null,
          ' ',
          this.text[1],
          ' '
        )
      );
    }
  });

  var page_url = page_url.split('/');
  var last_elem = page_url[page_url.length - 1];

  if (last_elem.slice(0, 3) == "new") {

    React.render(React.createElement(CardTitle, null), document.getElementById('newcard-title'));

    React.render(React.createElement(CardTable, null), document.getElementById('newcard-table'));
  }

  if (last_elem.slice(0, 3) != "new" && last_elem != "edit") {

    React.render(React.createElement(CardTitle, null), document.getElementById('showcard-title'));

    React.render(React.createElement(CardTable, null), document.getElementById('showcard-table'));
  }

  if (last_elem == "edit") {

    React.render(React.createElement(CardEditTitle, null), document.getElementById('editcard-title'));
  }
}

$(document).ready(function () {

  if ($("#newcard-title").length > 0 || $("#showcard-title").length > 0) {
    getPersonData();
  }

  if ($("#editcard-title").length > 0) {
    getPersonData();
  }
});