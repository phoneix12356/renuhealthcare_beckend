import userModal from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateCertificate from "../Util/pdfGenerator.js";
import Certificate from "../models/Certificate.js";
import courseModel from "../models/Course.model.js";
// register new user...
const userRegistration = async (req, res) => {
  const { name, email, phone, post, password } = req.body;

  try {
    const existingUser = await userModal.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email already exists" });
    }

    // Validate that all fields contain data
    if (!name || !email || !phone || !post || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const course = await courseModel.findOne({ title: post });
    // Create new user instance
    const newUser = new userModal({
      name: name,
      email: email,
      phone: phone,
      post: post,
      password: hashPassword,
      // course: course._id,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Optionally, generate JWT token
    const token = await jwt.sign(
      { userID: savedUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5d" }
    );
    const userId = savedUser._id;
    // generateUserCertificate(name, email, userId, post);
    // console.log(courseController);
    // Send response with user data and token
    res.status(201).json({ status: "success", user: savedUser, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ status: "failed", message: "Unable to register" });
  }
};

//  user login..
const userLogin = async (req, res) => {
  console.log(req.body, "hello user login");
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await userModal.findOne({ email: email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          // Now generate JWT
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

          res.status(200).json({ user, token });
        } else {
          res.send({ status: "failed", message: "Invalid email or password" });
        }
      } else {
        res.send({ status: "failed", message: "You are not registered" });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  } catch (error) {
    res.send({ status: "failed", message: "Unable to login" });
  }
};

// change user password after login through settings etc..
const changeUserPassword = async (req, res) => {
  const { password, cpassword } = req.body;
  if (password && cpassword) {
    if (password === cpassword) {
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);
      await userModal.findByIdAndUpdate(req.user._id, {
        $set: { password: newHashPassword },
      });
      res.send({ status: "200", message: "Change password successfully" });
      generateCertificate(req.user.name, req.user.email);
    } else {
      res.send({
        status: "failed",
        message: "Password and confirm password not matched",
      });
    }
  } else {
    res.send({ status: "failed", message: "All fields are required" });
  }
};

// Reset password, or forget password to send email...
const sendEmailResetPassword = async (req, res) => {
  const { email } = req.body;
  if (email) {
    const user = await userModal.findOne({ email: email });
    if (user) {
      const secret = user._id + process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userID: user._id }, secret, { expiresIn: "1d" });
      const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
      console.log(link, "starting token");
      res.send({ status: "success", message: "Email sent successfully" });
    } else {
      res.send({ status: "failed", message: "Email does not exist" });
    }
  } else {
    res.send({ status: "failed", message: "Email is required" });
  }
};

// After email send allow password reset..
const userPasswordReset = async (req, res) => {
  const { password, cpassword } = req.body;
  const { id, token } = req.params;
  const user = await userModal.findById(id);
  const new_secret = user._id + process.env.JWT_SECRET_KEY;
  try {
    console.log(token, "xxxxx", new_secret);
    jwt.verify(token, new_secret);
    if (password && cpassword) {
      if (password === cpassword) {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await userModal.findByIdAndUpdate(id, {
          $set: { password: newHashPassword },
        });
        res.send({ status: "200", message: "Password reset successfully" });
      } else {
        res.send({ status: "failed", message: "Passwords do not match" });
      }
    }
  } catch (error) {
    res.send({ status: "failed", message: "Token does not match" });
  }
};

const generateUserCertificate = (name, email, userId, post) => {
  // Call the function to generate the certificate
  generateCertificate(name, email, userId, post);
};

const download = async (req, res) => {
  try {
    // Find the certificate in the database based on userId
    const userId = req.user._id;

    const certificate = await Certificate.findOne({ userId });
    console.log(certificate);
    // If certificate not found
    if (!certificate) {
      return res.status(404).send("Certificate not found");
    }

    // Set response headers for PDF file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Offer_letter.pdf`
    );

    // Send the PDF buffer as response
    res.send(certificate.pdfBuffer);
  } catch (error) {
    console.error("Error downloading certificate:", error);
    res.status(500).send("Internal Server Error");
  }
};

export {
  userRegistration,
  userLogin,
  changeUserPassword,
  sendEmailResetPassword,
  userPasswordReset,
  download,
};
