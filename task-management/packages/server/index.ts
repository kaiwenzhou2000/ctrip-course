import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001;

mongoose.connect("mongodb://localhost:27017/test");

// 定义用户模型
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
  })
);

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    id: String,
    name: String,
    createTime: Date,
    importance: Number,
    status: String,
    people: [String],
  })
);

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // 检查用户名是否已存在
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ code: -1, message: "email already exists" });
  }

  // 对密码进行哈希处理
  const hashedPassword = await bcrypt.hash(password, 10);

  // 创建新用户
  const user = new User({ email, password: hashedPassword });
  await user.save();

  res.json({ code: 0, message: "Registered successfully" });

  // res.send("Registered successfully");
});

app.post("/task", async (req, res) => {
  const Tasks = await Task.find({});

  console.log(Tasks);

  res.json({
    code: 0,
    data: Tasks,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
