import cron from "node-cron";
import { sendMail } from "./mail.js";
import CourseModel from "../models/Course.model.js";
import ModuleModel from "../models/module.model.js";
import UserModel from "../models/User.js";

export const fetchDeadlinesAndSendMails = async () => {
  try {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

    // 1. courses whose calculated deadline is within the next 24 hours
    const coursesWithDeadlines = await CourseModel.find({
      isCompleted: false,
      $expr: {
        $lt: [
          { $add: ['$createdAt', { $multiply: ['$deadline', 24 * 60 * 60 * 1000] }] },
          tomorrow
        ]
      }
    });

    //console.log(coursesWithDeadlines)

    // Notify users about course deadlines
    for (const course of coursesWithDeadlines) {
      const users = await UserModel.find({ course: course._id });
      //console.log(users)
      users.forEach(user => {
        sendMail(
          user.email,
          "Course Deadline Reminder",
          `Hi ${user.name}, the deadline for your course "${course.title}" is tomorrow!`
        );
      });
    }

    // 2.  modules whose calculated deadline is within the next 24 hours
    const modulesWithDeadlines = await ModuleModel.find({
      isCompleted: false,
      $expr: {
        $lt: [
          { $add: ['$createdAt', { $multiply: ['$deadline', 24 * 60 * 60 * 1000] }] },
          tomorrow
        ]
      }
    });
    console.log(modulesWithDeadlines)

    // Notify users about module deadlines
    for (const module of modulesWithDeadlines) {
      const users = await UserModel.find({ completedModules: { $ne: module._id } }); // Users who haven't completed this module
      console.log(users)
      users.forEach(user => {
        sendMail(
          user.email,
          "Module Deadline Reminder",
          `Hi ${user.name}, the deadline for the module "${module.title}" is tomorrow!`
        );
      });
    }

  } catch (error) {
    console.error("Error fetching deadlines or sending emails:", error);
  }
};

// cron job to run every day at midnight (0 0 * * *)
cron.schedule("0 0 * * *", () => {
  console.log("Running scheduled cron job to send deadline emails...");
  fetchDeadlinesAndSendMails();
});
