# KEEPUP
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Table of Contents
- [Description](#Description)
- [Links](#Links)
- [Technologies](#Technologies)
- [Screenshots](#Screenshots)
- [Installation Instructions](#Installation-Instructions)
- [User Instructions](#User-Instructions)
- [License](#License)
- [Contributors](#Contributors)
- [Contribution Instructions](#Contribution-Instructions)
- [Acknowledgements](#Acknowledgements)
- [Questions](#Questions)

## Description

**KeepUP** is a full stack application that provides teams with a platform that makes communication easy!  Chat with others, manage your projects, create notes, and more with **KeepUP**.

## Links
[URL to deployed application]( https://keepup-project-management.herokuapp.com/)
[URL to GitHub repository](https://github.com/inklein1997/ProManj)

## Technologies
![Javascript logo](/assets/img/javascript-logo.png)
![Handlebars logo](/assets/img/handlebars-logo.png)
![NodeJS logo](/assets/img/nodejs-logo.png)
![Sequelize logo](/assets/img/sequelize-logo.png)
![Google Platform Services logo](/assets/img/google-platform-logo.png)
![mySQL logo](/assets/img/mySQL-logo.png)
![socket.io logo](/assets/img/socket.io-logo.png)
![CSS3 logo](/assets/img/css3-logo.png)
![Bootstrap logo](/assets/img/bootstrap-logo.png)

## Screenshots

## Installation Instructions

1. Since **KeepUP** is primarily a NodeJS application, you must have NodeJS downloaded. Please download [here](https://nodejs.org/en/download/) if you have not done so previously.

<br>

2. To create and seed the database, you must have MySQL installed.  Please download [here](https://www.mysql.com/downloads/) if you have not done so previously.  To create and seed the company_db database, please follow these instructions...
<hr>
<br>

1. Log into MySQL into your command-line while be located in Employee-Tracker's repository.
```
mysql -u root -p
```
2. Once logged in, enter the following commands...
```
SOURCE main/db/schema.sql;
```
3. Exit the MySQL CLI by entering the following command...
```
quit
```

<hr>
<br>

3. Create a .env file and input the following information
```
DB_NAME=user_db
DB_USER={ENTER MYSQL USER HERE}
DB_PASSWORD={ENTER MYSQL PASSWORD HERE}
```

<br>

4. Install all necessary packages by typing in the following command into your command-line...
```
npm i
```
<br>

5. To seed the database with dummy data, please enter the following command in your command-line...
```
npm run seed
```
<br>

6. You are then able to run your server by entering the following command into your command-line...
```
npm start
```
OR
```
node server.js
```

## User Instructions

| Feature | Instructions |
| ----------- | ----------- |
| Personal Notes | 1. To add a note, **click the pencil/paper** in the top left corner of the notes section  <br> 2. To delete a note, **click the trashcan** in the top left corner of the note <br> 3. To access the note content, **click the space between the note title and trashcan** <br> 4. To edit the note, **click the text** you wish to edit and **start typing** |
| Creating a Project | 1. To create a project, **click 'Starting a new project?'** <br> 2. You must then add yourself to that project by **clicking 'Add members to project'** <br> 3. Click your project in the *Your Workspaces section* |
| Trello Board | 1. To add a list item, **click '+ add new list'** <br> 2. To add a task item to a list, **click '+ Add task'** <br> 3. To edit task or list text, **click the text** you would like to edit and **start typing** <br> 4. To delete a list, **click the trash can** in the top left corner of that list <br> *NOTE:* If you would like to delete a task item, you must put it into a list item that you then delete <br> 5. You may toggle on/off the text editing by **clicking the edit text toggle** <br> 6. You must **click the moveable task/moveable list toggle**.  This feature gives the user a better user experience. |
| Chat | 1. To send a message, simply **type your message** into the text box and **click send** <br> 2. To send your geolocation, **click the Google Maps Icon** next to the send button |
| Update Profile | 1. To update your profile, **click your profile icon** and **click 'Edit Profile'** |
| Logout | 1. To log out, **click your profile icon** in the top right corner of the page and **click logout** |



## License

This project is licensed under the terms of [MIT](https://opensource.org/licenses/MIT).

## Contributors

[<img src="https://avatars.githubusercontent.com/u/93157433?v=4" width="75" height="75">](https://github.com/inklein1997)
[<img src="https://avatars.githubusercontent.com/u/95494071?v=4" width="75" height="75">](https://github.com/romeodixonll)

## Contribution Instructions

Before contributing to **KeepUP**, please read this [code of conduct](code_of_conduct.md)[^1].<br>
Here's how you can contribute...
1. Add issue or recommendation for improvement to Issues tab on Github.
2. Submit pull request for review.

## Acknowledgements

Toggle on Project page was created by [Sergey Zakharov](https://codepen.io/Multiple-Illusionsi/pen/PoYvydd);
Animated checkmark on /project page was created by [Gary](https://codepen.io/gbuddell/pen/KwoRLX);

## Questions?

If you have any questions, please contact us via:

| Name | Github | Email |
| ----------- | ----------- | ----------- |
| Michael Klein | [@inklein1997](https://github.com/inklein1997) | michaelklein1997@gmail.com |
| Romeo Dixon | [@romeodixonll](https://github.com/romeodixonll) | Romeodixonll@yahoo.com|


[^1]: Code of Conduct provided by [Contributor Covenant](https://www.contributor-covenant.org/)