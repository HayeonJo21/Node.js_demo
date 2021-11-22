const socket = io();

formatDateTime = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = d.getHours().toString(),
            minute = d.getMinutes().toString(),
            sec = d.getSeconds().toString();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hour.length < 2) hour = '0' + hour;
        if (minute.length < 2) minute = '0' + minute;
        if (minute.length < 2) minute = '0' + minute;
        if (sec.length < 2) sec= '0' + sec;

        var formatedDate = year + "/" + month + "/" + day + " " + hour + ":" + minute +":"+ sec;
        return formatedDate;
};

var currentTime = formatDateTime(new Date());

socket.on("load all messages", (data) => {
  data.forEach(message => {
  displayMessage(message);
});

socket.on("user disconnected", () => {
  displayMessage({
    userName: "운영자",
    content: "사용자가 채팅방을 나갔습니다.",
    date: currentTime
  });
});

socket.on("message", (message) => {
  displayMessage(message);
  for(let i = 0; i < 2; i++){
    $(".chat-icon").fadeOut(250).fadeIn(250);
  }
});

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
    userId = $("#chat-user-id").val(),
    userName = $("#chat-user-name").val();
    socket.emit("message", {
      content: text,
      userId: userId,
      userName: userName
    });

    $("#chat-input").val("");
    return false;
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

let displayMessage = (message) => {
  var messageWithDate = message.content + "    (" + message.date + ")";
  $("#chat").prepend($("<p>").html('<div class="message' + `${getCurrentUserClass(message.user)}` + '">'
  + '<strong>' + `${message.userName}` + ':  ' + '</strong>'
  + messageWithDate + '</div>'));
};

let getCurrentUserClass = (id) => {
  let userId = $("#chat-user-id").val();
  return userId === id ? "current-user" : "";
}
