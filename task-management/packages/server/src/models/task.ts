const getTask = (mongoose: any) => {
  return mongoose.model(
    "Task",
    new mongoose.Schema({
      name: String,
      createTime: Date,
      importance: Number,
      status: Number,
      description: String,
    })
  );
};

export default getTask;
