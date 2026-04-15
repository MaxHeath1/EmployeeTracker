Employee Tracker

A command-line application for managing a company's employees, roles, and departments using a relational database. Built with Node.js and SQL, this tool allows users to view and update organizational data efficiently.

🚀 Features
View all employees, roles, and departments
Add new employees, roles, and departments
Update employee roles
Structured relational database using SQL
Clean and interactive command-line interface
🛠️ Technologies Used
JavaScript (Node.js)
SQL (MySQL)
Inquirer.js
Console Table
📂 Project Structure
server.js – Main application logic and prompts
db/ – Database schema and seed files
queries/ – SQL query functions
package.json – Dependencies and scripts
⚙️ Installation

Clone the repository:

git clone https://github.com/yourusername/employee-tracker.git

Navigate into the project directory:

cd employee-tracker

Install dependencies:

npm install

Set up your database using the schema file:

mysql -u root -p < db/schema.sql

(Optional) Seed the database:

mysql -u root -p < db/seeds.sql
▶️ Usage

Run the application with:

node server.js

Follow the prompts in the terminal to:

View employees, roles, or departments
Add new data
Update existing employee roles
📸 Demo

(Add a screenshot or screen recording here if you can — this helps a lot)

💡 What I Learned
How to design and interact with a relational database
Writing and organizing SQL queries for real-world use cases
Building interactive CLI applications with Node.js
Structuring backend logic for maintainability
🔧 Future Improvements
Add ability to delete employees, roles, and departments
Improve UI/UX of the command-line interface
Add validation for user inputs
Convert to a full-stack web application
👤 Author

Maxwell Heath
GitHub: https://github.com/MaxHeath1
