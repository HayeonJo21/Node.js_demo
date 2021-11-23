const Message = require("../models/message"),
User = require("../models/user");

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

var currentDate = formatDateTime(new Date());
getDmParams = (body) => {
  console.log("DM Params called");
  console.log("****chat Content: " + body.chatContent);
  return{
    content: body.chatContent,
    userName: body.sender,
    user: body.senderId,
    receiver: body.receiver,
    date: currentDate
  };
};

module.exports = {
  create: (req, res, next) => {
      let m = new Message(getDmParams(req.body));
      m.save()
      .then(() => {
        res.render("directChat", m);
      }).catch(error => console.log("Error: " + error.message));
    },

    show: (req, res, next) => {
      let userId = req.params.id;
      Message.find({user: userId})
      .then(messages => {
        res.render("chatList", {
          chats : messages
        });
      }).catch(error => {
        console.log("Error fetching message by ID " + error.message);
        next(error);
      });
    }
};
