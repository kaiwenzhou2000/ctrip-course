import mongoose from "mongoose";

const tableItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  createTime: Date,
  importance: Number,
  status: String,
  people: [String],
});

const TableItem = mongoose.model("TableItem", tableItemSchema);

async function insertData() {
  const uri = "mongodb://localhost:27017/tasks";

  try {
    await mongoose.connect(uri);

    const tableItem = {
      id: "1",
      name: "Task 1",
      createTime: new Date(),
      importance: 1,
      status: "In Progress",
      people: ["Person 1", "Person 2"],
    };
    for (let i = 0; i < 31; i++) {
      const result = await TableItem.create(tableItem);

      console.log(`A document was inserted with the _id: ${result._id}`);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

insertData();
