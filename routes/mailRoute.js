const nodemailer = require('nodemailer');
const router=require("express").Router();
const requireSignin=require("../middlewares/authMiddlewares");

  router.post("/sendmails",requireSignin, async(req, res) => {
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vickybabu2001ara0@gmail.com',
        pass: 'Vicky@12345'
    }
  });
    try {
      const { name, email, messag } = req.body;
  
      //validation
      if (!name || !email || !messag) {
        return res.status(500).send({
          success: false,
          message: "Please Provide All Fields",
        });
      }
      //email matter
      transporter.sendMail({
        from: email,
        to: "vickybabu2001ara0@gmail.com",
        subject: "Regarding Bus Ticket Booking App",
        html:`
          <h5>Detail Information</h5>
          <ul>
            <li><p>Name : ${name}</p></li>
            <li><p>Email : ${email}</p></li>
            <li><p>Message : ${messag}</p></li>
          </ul>
        `,
      });
  
      return res.send({
        success: true,
        message: "Your Message Send Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.send({
        success: false,
        message: "Send Email API Error",
        error,
      });
    }
  });
  module.exports = router;