const User = require("../models/user");
const Jam = require("../models/jam");
const Comment = require("../models/comment");
const passport = require("passport");
const httpStatus = require("http-status-codes");
const {body, validationResult} = require("express-validator");

formatDate = (date) => {  //date format 메서드
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var formatedDate = year + '년 ' + month + '월 ' + day + "일";

    return formatedDate;
};

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

getJamParams = (body) => {
  return{
    title: body.title,
    date: formatDate(new Date()),
    requiredPosition: body.requiredPosition,
    host: body.host,
    description: body.description,
    filename: body.filename,
    participant: 0
  };
};

getJoinJamParams = (body) => {
  return{
    title: body.title,
    date: formatDate(new Date()),
    host: body.host,
    hostNickname: body.hostNickname,
    description: body.description,
    filename: body.filename,
    originalJam: body.originalJam
  };
};

getCommentParams = (body) => {
  return{
    content: body.content,
    date: formatDateTime(new Date()),
    writer: body.writer,
    writerNickname: body.writerNickname,
    originalJam: body.originalJam
  };
};

module.exports = {
  errorValidate: (req, res, next) => {
     const error = validationResult(req).errors;
         if(Object.keys(error).length !== 0) {
           let messages = error.map(e => e.msg);
           req.skip = true;
           req.flash("error",  messages);
           res.locals.redirect = "/jam/registerForm";
             next();
         }else{
           next();
         }
   },

  create: (req, res, next) => {
   if(req.skip) next();

   let newJam = new Jam(getJamParams(req.body));

   Jam.create(newJam)
   .then(() => {
     console.log("*****SUCCESS******");
      req.flash("success", "글이 등록되었습니다.");
      res.locals.jam = newJam;
      next();
  })
  .catch(error => {
    console.log("#####ERROR#####  " + error.message);
    req.flash("error", "글 등록에 실패했습니다. 다시 시도해주세요.");
    res.locals.redirect = "/jam/registerForm";
    next();
  });
},

commentCreate: (req, res, next) => {
 if(req.skip) next();


 let newComment = new Comment(getCommentParams(req.body));
 newComment.originalJam = req.body.originalJam;

 Comment.create(newComment)
 .then(() => {
   console.log("*****SUCCESS******");
    req.flash("success", "댓글이 등록되었습니다.");
    next();
})
.catch(error => {
  console.log("#####ERROR#####  " + error.message);
  req.flash("error", "댓글 등록에 실패했습니다. 다시 시도해주세요.");
  res.locals.redirect = "/post/registerForm";
  next();
});
},

searchCommentsForIndex: (req, res, next) => {
    Comment.find({})
    .then(comments => {
      console.log("comment searching complete");
      res.locals.comments = comments;
      next();
    })
    .catch(error => {
      console.log("Error fetching searching comment " + error.message);
      next(error);
    });
},

deleteComment: (req, res, next) => {
let commentId = req.params.id;
Comment.findByIdAndRemove(commentId)
.then(() => {
  res.locals.redirect = "/jam/main"
  req.flash("success", "댓글 삭제가 완료되었습니다.");
  next();
})
.catch(error => {
  console.log("Error deleting comment by ID : " + error.message);
  next();
});
},

getUserInfo: (req, res, next) => {
  if(req.skip) next();

    let newJam = new Jam(getJamParams(req.body));

      User.findById(newJam.host)
      .then(user => {
        console.log("USER: " + user.name);
        res.locals.user = user;
        next();
      }).catch(error => {
        console.log("Error fetching user by ID: " + error.message);
        next(error);
      });

},

getUserForDetail: (req, res, next) => {
    let jamId = req.params.id;
    Jam.findById(jamId)
    .then(jam => {
      User.findById(jam.host)
      .then(user => {
        res.locals.user = user;
        console.log("@@@@ USER:" + user.name);
        next();
      }).catch(error => {
        console.log("Error fetching user by ID: " + error.message);
        next(error);
      });
    })
    .catch(error => {
      console.log("Error fetching jam by ID " + error.message);
      next(error);
    });
},

  redirectView: (req, res, next) => {
    console.log("redirect view called!");
    let redirectPath = res.locals.redirect;
    if(redirectPath) res.redirect(redirectPath);
    else next();
  },

registerForm: (req, res) => {
  res.render("jamRegisterForm");
},

showDetailPage: (req, res, next) => {
  let jamId = req.params.id;

  if(jamId){
    Jam.findById(jamId)
    .then(jam => {
      res.locals.jam = jam;
      next();
    })
    .catch(error => {
      console.log("Error fetching jam by ID " + error.message);
      next(error);
    });
  }
  else{
  res.render("jamDetail");
}
},

searchForJoinedJam: (req, res, next) => {
  let jamId = req.params.id;

  Jam.find({originalJam : jamId})
  .then(jams => {
    res.locals.joinedJam = jams;
    next();
  }).catch(error => {
    console.log("Error fetching jam by ID " + error.message);
    next(error);
  })
},

edit: (req, res, next) => {
  let jamId = req.params.id;
  Jam.findById(jamId)
  .then(jam => {
    res.render("jamUpdateForm", {
      jam: jam
    });
  })
  .catch(error => {
    console.log("Error fetching jam by ID " + error.message);
    next(error);
  });
},

update: (req, res, next) => {
  let jamId = req.params.id,
  jamParams = {
    title: req.body.title,
    location: req.body.location,
    date: req.body.date,
    requiredPosition: req.body.requiredPosition,
    host: req.body.host,
    description: req.body.description
  };

  Jam.findByIdAndUpdate(jamId, {
    $set: jamParams
  })
  .then(jam => {
    console.log("Updated jam : " + jam.title);
    res.locals.jam = jam;
    res.locals.redirect = "/jam/detail/" + jamId;
    next();
  })
  .catch(error => {
    console.log("Error updating jam by ID: " + error.message);
    next(error);
  });
},

delete: (req, res, next) => {
let jamId = req.params.id;
Jam.findByIdAndRemove(jamId)
.then(() => {
  res.locals.redirect = "/jam/main"
  req.flash("success", "삭제가 완료되었습니다.");
  next();
})
.catch(error => {
  console.log("Error deleting jam by ID : " + error.message);
  next();
});
},

getAllJams: (req, res, next) => {
  Jam.find({})
  .exec()
  .then((jams) => {
    console.log("Get all jams");
    res.locals.jams = jams;
    next();
  })
  .catch((error) => {
    console.log(error.message);
    next(error);
  });
},

joinModal: (req, res, next) => {
  let jamId = req.params.id,
  currentUser = req.user;

  if(currentUser){
    User.findByIdAndUpdate(currentUser, {
      $addToSet: {
        jams: jamId
      }
    }).then(() => {
      console.log("user DB에 Jam 저장 " + "Jam ID: " + jamId + " Username: " + currentUser.name);
      res.locals.success = true;
      next();
    }).catch(error => {
      next(error);
    }) ;
  }else {
    next(new Error("User must log in."));
  }
},

showJoinForm: (req, res) => {
  let jamId = req.params.id;
  res.render("jamJoinForm", {
    originalJam: jamId
  });
},

createJoin: (req, res, next) => {
  if(req.skip) next();

  let newJam = new Jam(getJoinJamParams(req.body));

  Jam.create(newJam)
  .then(() => {
    console.log("*****SUCCESS******");
     req.flash("success", "답글이 등록되었습니다.");
     res.locals.jam = newJam;
     next();
   }).then(() => {
   Jam.findById(newJam.originalJam)
   .then(jam => {
     let part = jam.participant;
     part = part + 1;
     console.log("part: " + part);
     Jam.findByIdAndUpdate(jam._id, {
       $set: {
         participant: part
       }
     }).catch(error => {
       console.log("#####ERROR#####  " + error.message);
       req.flash("error", "답글 등록에 실패했습니다. 다시 시도해주세요.");
       res.locals.redirect = "/jam/main";
       next();
     });
   }).catch(error => {
     console.log("#####ERROR#####  " + error.message);
     req.flash("error", "답글 등록에 실패했습니다. 다시 시도해주세요.");
     res.locals.redirect = "/jam/main";
     next();
   });
 }).catch(error => {
   console.log("#####ERROR#####  " + error.message);
   req.flash("error", "답글 등록에 실패했습니다. 다시 시도해주세요.");
   res.locals.redirect = "/jam/main";
   next();
 });
},

showDetailView: (req, res) => {
  res.render("jamDetail");
},

showJoinedDetailView: (req, res) => {
  res.render("JoinedjamDetail");
},

filterUserJams: (req, res, next) => {
  let currentUser = res.locals.currentUser;
  if(currentUser){ // 사용자 로그인 유무 체크
    let mappedJams = res.locals.jams.map((jam) => { // 사용자가 연계됐는지 표식을 추가하기 위한 강좌 데이터 수
      let userJoined = currentUser.jams.some((userJams) => {
        return userJams.equals(jam._id); // 사용자 강좌 배열에 강좌가 있는지 체크
      });
      return Object.assign(jam.toObject(), {joined: userJoined});
    });
    res.locals.jams = mappedJams;
    next();
  } else{
    next();
  }
},

indexView: (req, res) => {
  res.render("jam");
},

respondJSON: (req, res) => {
  res.json({
    status: httpStatus.OK,
    data: res.locals
  });
},

errorJSON: (error, req, res, next) => {
  let errorObject;

  if(error) {
    errorObject = {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: error.message
    };
  } else{
    errorObject = {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Unknown Error."
    };
  }
  res.json(errorObject);
}
}
