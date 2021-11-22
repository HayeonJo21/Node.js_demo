const socket = io();

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

  $("#chatForm").submit(() => {
    console.log("chat submit ajax proceed.");
    let text =  $("#chat-input").val(),
    userId = $("#chat-user-id").val();
    socket.emit("message", {
      content: text,
      userId: userId
    });
    $("#chat-input").val("");
    return false;
  });
  socket.on("message", (message) => {
    displayMessage(message.content, message.date);
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

let displayMessage = (message) => {
  var messageWithDate = message.content + "  (" + message.date + ")";
  $("#chat").prepend($("<p>").html('<div class="message' + `${getCurrentUserClass(message.user)}` + '">' + messageWithDate + '</div>'));
};

let getCurrentUserClass = (id) => {
  let userId = $("#chat-user-id").val();
  return userId === id ? "current-user" : "";
}
