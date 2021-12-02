const router = require("express").Router(),
homeController = require("../controllers/homeController"),
dmController = require("../controllers/dmController");
const nodemailer = require("nodemailer");
const httpStatus = require("http-status-codes");

router.get("/", homeController.showIndex);
router.get("/courses", homeController.showCourses);
router.get("/contact", homeController.showContact) ;
router.get("/gameSound", homeController.gameSoundMain);
router.get("/market", homeController.showMarket);
router.get("/jam", homeController.showJam);
router.get("/bgm", homeController.showBgm);
router.get("/chat/:id", dmController.show);
router.get("/chatAll", homeController.chatAll);
router.get("/directMessage/:id", dmController.showDM);
router.get("/thanks", homeController.thanks);

router.post("/mail/send", (req, res) => {
    console.log(req.body);
    let transporter = nodemailer.createTransport({
      service: "gmail",
        auth:{
            user: 'gkdus6629@gmail.com',
            pass: 'Gkdus1121-_-!'
        },
        host: 'smtp.mail.com',
        port: '465'
    });

    let mailOptions = {
        from : "조하연 <gkdus6629@gmail.com>",
        to : req.body.receiverEmail,
        subject : req.body.title,
        text : req.body.message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        transporter.close();
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });
    req.flash("success", "메일 전송 완료");
    res.render("contact");
});

module.exports = router;
