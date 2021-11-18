$(document).ready(() => {
  console.log("document ready");
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/jams", (results = {}) => {
      let data = results.data;
      if(!data || !data.jams) return;

      data.jams.forEach((jam) => {
        $(".modal-body").append('<div><span class="jam-title"><strong>' +`${jam.title}`
        + '</strong></span><div align="right"><button class="join-button" data-id="' + `${jam._id}` + '"> Join </button></div><div class="jam-description">'
        + `${jam.description}` + '</div></div><hr>'
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {
  $(".join-button").click((event) => {
    let $button = $(event.target),
    jamId = $button.data("id");
    $.get('/api/jams/'+ `${jamId}` + '/join', (results = {}) => {
      let data = results.data;
      if(data && data.success){
        $button
        .text("Joined")
        .addJam("joined-button")
        .removeJam("join-button");
      } else{
        $button.text("Try again");
      }
    });
  });
}
