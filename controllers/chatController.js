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

module.exports = io => {
  console.log("chatController called");
  var currentDate = formatDateTime(new Date());
  io.on("connection", client => {
    console.log("new connection");

    client.on("disconnect", () => {
      console.log("user disconnected");
    });

    client.on("message", () => {
      io.emit("message", {
        content: "Hello",
        date: currentDate
      });
    });
  });
};
