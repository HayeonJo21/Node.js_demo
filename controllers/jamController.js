const User = require("../models/user");
const Jam = require("../models/jam");
const passport = require("passport");
const httpStatus = require("http-status-codes");
const {body, validationResult} = require("express-validator");

getJamParams = (body) => {
  return{
    title: body.title,
    location: body.location,
    date: body.date,
    requiredPosition: body.requiredPosition,
    host: body.host,
    description: body.description
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

showDetailPage: (req, res) => {
  let jamId = req.params.id;

  if(jamId){
    Jam.findById(jamId)
    .then(jam => {
      res.render("jamDetail", {
        jam: jam
      });
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
  res.locals.redirect = "/"
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
