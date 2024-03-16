const getUser = (mongoose: any) => {
  return mongoose.model(
    "User",
    new mongoose.Schema({
      role: { type: String, required: true },
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
    })
  );
};

export default getUser;
