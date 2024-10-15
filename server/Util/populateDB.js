import CourseModel from '../models/Course.model.js';
import ModuleModel from '../models/module.model.js';
import UserModel from '../models/User.js';

// Function to insert a course and reference a module
export async function insertCourseWithModule() {
  try {


    // Step 1: Create and insert a module
    const newModule = new ModuleModel({
      title: 'JavaScript Loops',
      videoId: [],  // Add video references if needed
      test: null,   // Add test reference if needed
      isCompleted: false,
      deadline: 3   // 3 days deadline for module
    });

    // Save the module to the database
    const savedModule = await newModule.save();

    console.log('Module inserted:', savedModule);

    // Step 2: Create and insert a course that references the module
    const newCourse = new CourseModel({
      title: 'JavaScript Basics',
      modulesName: ['Loops'],  // Add module name (same as module)
      modulesIds: [savedModule._id],  // Reference the saved module ID
      isCompleted: false,
      deadline: 1   // 30 days deadline for course
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    console.log('Course inserted:', savedCourse);


    // step 3: Insert user
    const newUser = new UserModel({
        name: "Arjun",
        email: "parajuliarjun54@gmail.com",
        phone: "1234567890",
        password: "hashedpassword",  // Hashed password should be used
        post: "developer",
        course: savedCourse._id,  // Reference course ID
        completedModules: [],  // Empty for now
        completedTests: [],    // Empty for now
        completedVideos: [],   // Empty for now
        completedCourses: [],  // Empty for now
      }); 

      const savedUser = await newUser.save();
      console.log('User inserted:', savedUser);

  } catch (error) {
    console.error('Error inserting course with module reference:', error);
  }
}


