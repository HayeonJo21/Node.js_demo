const User = require("../models/user");
const Post = require("../models/post");
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
var currentDate = formatDate(new Date());

getPostParams = (body) => {
  return{
    category: body.category,
    title: body.title,
    content: body.content,
    filename: body.filename,
    date: currentDate,
    writer: body.writer,
    writerNickname: body.writerNickname
  };
};

module.exports = {

  create: (req, res, next) => {
   if(req.skip) next();

   let newPost = new Post(getPostParams(req.body));

   Post.create(newPost)
   .then(() => {
     console.log("*****SUCCESS******");
      req.flash("success", "게시글이 등록되었습니다.");
      next();
  })
  .catch(error => {
    console.log("#####ERROR#####  " + error.message);
    req.flash("error", "게시글 등록에 실패했습니다. 다시 시도해주세요.");
    res.locals.redirect = "/post/registerForm";
    next();
  });
},
//
// getUserInfo: (req, res, next) => {
//   if(req.skip) next();
//
//     let newJam = new Jam(getJamParams(req.body));
//
//       User.findById(newJam.host)
//       .then(user => {
//         console.log("USER: " + user.name);
//         res.locals.user = user;
//         next();
//       }).catch(error => {
//         console.log("Error fetching user by ID: " + error.message);
//         next(error);
//       });
//
// },
//
// getUserForDetail: (req, res, next) => {
//     let jamId = req.params.id;
//     Jam.findById(jamId)
//     .then(jam => {
//       User.findById(jam.host)
//       .then(user => {
//         res.locals.user = user;
//         console.log("@@@@ USER:" + user.name);
//         next();
//       }).catch(error => {
//         console.log("Error fetching user by ID: " + error.message);
//         next(error);
//       });
//     })
//     .catch(error => {
//       console.log("Error fetching jam by ID " + error.message);
//       next(error);
//     });
// },

  redirectView: (req, res, next) => {
    console.log("redirect view called!");
    let redirectPath = res.locals.redirect;
    if(redirectPath) res.redirect(redirectPath);
    else next();
  },


searchPostForIndex: (req, res, next) => {
    Post.find({})
    .then(posts => {
      res.locals.posts = posts;
      next();
    })
    .catch(error => {
      console.log("Error fetching searching post " + error.message);
      next(error);
    });
},

showRegisterForm: (req, res ) =>{
  res.render("postForm");
},

indexView: (req, res) => {
  res.render("qna");
},

respondJSON: (req, res) => {
  res.json({
    status: httpStatus.OK,
    data: res.locals
  });
}

// edit: (req, res, next) => {
//   let jamId = req.params.id;
//   Jam.findById(jamId)
//   .then(jam => {
//     res.render("jamUpdateForm", {
//       jam: jam
//     });
//   })
//   .catch(error => {
//     console.log("Error fetching jam by ID " + error.message);
//     next(error);
//   });
// },
//
// update: (req, res, next) => {
//   let jamId = req.params.id,
//   jamParams = {
//     title: req.body.title,
//     location: req.body.location,
//     date: req.body.date,
//     requiredPosition: req.body.requiredPosition,
//     host: req.body.host,
//     description: req.body.description
//   };
//
//   Jam.findByIdAndUpdate(jamId, {
//     $set: jamParams
//   })
//   .then(jam => {
//     console.log("Updated jam : " + jam.title);
//     res.locals.jam = jam;
//     res.locals.redirect = "/jam/detail/" + jamId;
//     next();
//   })
//   .catch(error => {
//     console.log("Error updating jam by ID: " + error.message);
//     next(error);
//   });
// },
//
// delete: (req, res, next) => {
// let jamId = req.params.id;
// Jam.findByIdAndRemove(jamId)
// .then(() => {
//   res.locals.redirect = "/"
//   req.flash("success", "삭제가 완료되었습니다.");
//   next();
// })
// .catch(error => {
//   console.log("Error deleting jam by ID : " + error.message);
//   next();
// });
// },
//
// getAllJams: (req, res, next) => {
//   Jam.find({})
//   .exec()
//   .then((jams) => {
//     console.log("Get all jams");
//     res.locals.jams = jams;
//     next();
//   })
//   .catch((error) => {
//     console.log(error.message);
//     next(error);
//   });
// },
//
// join: (req, res, next) => {
//   let jamId = req.params.id,
//   currentUser = req.user;
//
//   if(currentUser){
//     User.findByIdAndUpdate(currentUser, {
//       $addToSet: {
//         jams: jamId
//       }
//     }).then(() => {
//       console.log("user DB에 Jam 저장 " + "Jam ID: " + jamId + " Username: " + currentUser.name);
//       res.locals.success = true;
//       next();
//     }).catch(error => {
//       next(error);
//     }) ;
//   }else {
//     next(new Error("User must log in."));
//   }
// },
//
// showJoinForm: (req, res) => {
//   res.render("jamJoinForm");
// },
//
// showDetailView: (req, res) => {
//   res.render("jamDetail");
// },
//
// filterUserJams: (req, res, next) => {
//   let currentUser = res.locals.currentUser;
//   if(currentUser){ // 사용자 로그인 유무 체크
//     let mappedJams = res.locals.jams.map((jam) => { // 사용자가 연계됐는지 표식을 추가하기 위한 강좌 데이터 수
//       let userJoined = currentUser.jams.some((userJams) => {
//         return userJams.equals(jam._id); // 사용자 강좌 배열에 강좌가 있는지 체크
//       });
//       return Object.assign(jam.toObject(), {joined: userJoined});
//     });
//     res.locals.jams = mappedJams;
//     next();
//   } else{
//     next();
//   }
// },
//
//
// errorJSON: (error, req, res, next) => {
//   let errorObject;
//
//   if(error) {
//     errorObject = {
//       status: httpStatus.INTERNAL_SERVER_ERROR,
//       message: error.message
//     };
//   } else{
//     errorObject = {
//       status: httpStatus.INTERNAL_SERVER_ERROR,
//       message: "Unknown Error."
//     };
//   }
//   res.json(errorObject);
// }
}
