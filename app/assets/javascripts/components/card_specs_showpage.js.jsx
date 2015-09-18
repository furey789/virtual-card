
$( document ).ready(function() {

  if ($("#showcard").length > 0) {
    React.render(
      <Card />,
      document.getElementById('showcard')
    );
  }

});
