import mongoose from "mongoose";
import { getTask } from "../packages/server/src/models/index";

async function insertData() {
  const uri = "mongodb://localhost:27017/middle-platform";

  const status = ["In Progress", "Completed", "Not Started"];

  try {
    const Task = getTask(mongoose);
    await mongoose.connect(uri);

    for (let i = 0; i < 31; i++) {
      const result = await Task.create({
        name: `Task ${Math.floor(Math.random() * 100) + 1}`,
        createTime: new Date(),
        importance: Math.floor(Math.random() * 5) + 1,
        status: Math.floor(Math.random() * 3),
        description: "description",
        role: "user",
      });

      console.log(`A data was inserted with the _id: ${result._id}`);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

insertData();
