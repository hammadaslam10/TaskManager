const Task = require("../models/taskschema");
const connectDataBase = require("../config/database");
require("dotenv").config({ path: "config/Secret.env" });
connectDataBase()
// Seed mock data
const seedTasks = async () => {
    try {
        const sampleTasks = Array.from({ length: 40 }).map((_, index) => ({
            title: `Task ${index + 1}: ${getRandomTitle()}`,
            description: getRandomDescription(),
            status: getRandomStatus(),
            dueDate: getRandomDueDate()
        }));

        await Task.insertMany(sampleTasks);
        console.log("40 sample tasks inserted successfully");
    } catch (error) {
        console.error("Error seeding tasks:", error);
    }
};

const getRandomTitle = () => {
    const titles = [
        "Design Homepage",
        "Create User Authentication",
        "Build Admin Dashboard",
        "Update Product Listings",
        "Add Payment Gateway",
        "Optimize Database Queries",
        "Fix UI Bugs",
        "Implement Search Functionality",
        "Enhance Mobile Responsiveness",
        "Conduct Code Review",
        "Implement JWT Authentication",
        "Set Up Email Notifications",
        "Develop Landing Page",
        "Add Product Filtering",
        "Fix Security Vulnerabilities",
        "Create Customer Feedback Form",
        "Build Shopping Cart",
        "Migrate Database to Cloud",
        "Update User Profile Page",
        "Test Payment Process",
        "Build Analytics Dashboard",
        "Implement SEO Enhancements",
        "Create Multi-Language Support",
        "Develop Subscription System",
        "Integrate Third-Party APIs",
        "Build Admin Reports",
        "Add Multi-Tenant Support",
        "Develop Push Notifications",
        "Update Privacy Policy Page",
        "Build Cookie Consent Form",
        "Implement Two-Factor Authentication",
        "Upgrade Node.js Version",
        "Set Up CI/CD Pipeline",
        "Enhance Security Headers",
        "Conduct Load Testing",
        "Build QR Code Generator",
        "Add Dark Mode",
        "Update Terms of Service Page",
        "Enable Social Login",
        "Fix Layout Issues on iPad"
    ];

    return titles[Math.floor(Math.random() * titles.length)];
};

const getRandomDescription = () => {
    const descriptions = [
        "This task involves updating the layout for better user experience.",
        "Make sure the changes are responsive on mobile, tablet, and desktop devices.",
        "Focus on improving the performance and reducing load times.",
        "The task requires updating the API to include the latest endpoints.",
        "Fix the reported issues and create regression test cases.",
        "Ensure the feature works in cross-browser environments.",
        "Write test cases for the new feature and ensure 100% coverage.",
        "Collaborate with the design team for UI/UX enhancements.",
        "Refactor the current implementation to improve maintainability.",
        "Improve the error messages for better user feedback.",
        "Integrate the latest security patches and updates.",
        "Test the payment gateway for various edge cases.",
        "Implement pagination for better data management.",
        "Add logging and monitoring to identify potential issues.",
        "Create audit logs for tracking user activity.",
        "Focus on SEO improvements to increase website visibility.",
        "Update API responses to be more consistent.",
        "Add localization and multi-language support.",
        "The task involves integrating a third-party service.",
        "Conduct a performance review and optimize SQL queries."
    ];

    return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getRandomStatus = () => {
    const statuses = ['pending', 'in-progress', 'completed'];
    return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomDueDate = () => {
    // Generates a random due date from today to 30 days in the future
    const today = new Date();
    const randomDaysToAdd = Math.floor(Math.random() * 30); // Random number of days from today
    return new Date(today.setDate(today.getDate() + randomDaysToAdd));
};
seedTasks();

