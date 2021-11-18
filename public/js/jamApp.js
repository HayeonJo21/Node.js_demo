var socket = io();

$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/jams?apiToken=soundyT0k3n", (results = {}) => {
      let data = results.data;
      if(!data || !data.jams) return;

      data.jams.forEach((jam) => {
        $(".modal-body").append('<div><span class="jam-title"><strong>' +`${jam.title}`
        + '</strong></span><div align="right"><button class="' + `${jam.joined ? "joined-button" : "join-button"}`
        + '" data-id="' + `${jam._id}` + '">' + `${jam.joined ? "Joined" : "Join"}`
        + '</button></div><div class="jam-description">'
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
        .addClass("joined-button")
        .removeClass("join-button");
      } else{
        $button.text("Try again");
      }
    });
  });
};

$("#chatForm").submit(() => {
  console.log("chat submit ajax proceed.");
  socket.emit("message");
  $("#chat-input").val("");
  return false;
});
socket.on("message", (message) => {
  displayMessage(message.content);
});

let displayMessage = (message) => {
  $("#chat").prepend($("<li>").html(message));
};
