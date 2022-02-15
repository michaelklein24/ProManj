const sequelize = require("../config/connection");
const { Project, User, usersToProjects, List, Task } = require("../models");

const projectSeedData = require("./projectData.json");
const userSeedData = require("./userData.json");
const listSeedData = require("./ListData.json");
const taskSeedData = require("./taskData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Task.bulkCreate(taskSeedData);

  await List.bulkCreate(listSeedData);

  const project = await Project.bulkCreate(projectSeedData);

  const user = await User.bulkCreate(userSeedData);





  // Create trips at random
  for (let i = 0; i < 10; i++) {
    // Get a random traveller's `id`
    const { id: randomProjectId } =
      project[Math.floor(Math.random() * project.length)];

    // Get a random location's `id`
    const { id: randomUserId } = user[Math.floor(Math.random() * user.length)];

    // const { id: randomListId } = list[Math.floor(Math.random() * list.length)];

    // const { id: randomTaskId } = task[Math.floor(Math.random() * task.length)];

    // Create a new trip with random `trip_budget` and `traveller_amount` values, but with ids selected above
    await usersToProjects
      .create({
        project_id: randomProjectId,
        user_id: randomUserId,
      })
      .catch((err) => {
        // If there's an error, such as the same random pairing of `traveller.id` and `location.id` occurring and we get a constraint error, don't quit the Node process
        console.log(err);
      });
  }

  process.exit(0);
};

seedDatabase();
