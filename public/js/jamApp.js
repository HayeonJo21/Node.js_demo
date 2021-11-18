$(document).ready(() => {
  console.log("document ready");
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/jams", (results = {}) => {
      let data = results.data;
      if(!data || !data.jams) return;

      data.jams.forEach((jam) => {
        $(".modal-body").append('<div><span class="jam-title"><strong>' +`${jam.title}`
        + '</strong></span><div class="jam-description">' + `${jam.description}` + '</div></div>' +
        '<div align="right"><button class="join-button" data-id="' + `${jam._id}` + '"> Join </button></div><hr>'
        );
      });
    });
  });
});
