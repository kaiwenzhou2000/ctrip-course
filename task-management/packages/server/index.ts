import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import { getTask, getUser } from "./src/models/index";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001;

mongoose.connect("mongodb://localhost:27017/task-management");

const User = getUser(mongoose);
const Task = getTask(mongoose);

app.post("/register", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  // 检查用户名是否已存在
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ code: -1, message: "email already exists" });
  }

  // 对密码进行哈希处理
  const hashedPassword = await bcrypt.hash(password, 10);

  // 创建新用户
  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  await user.save();

  res.json({ code: 0, message: "Registered successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 检查用户是否存在
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ code: -1, message: "User does not exist" });
  }

  // 检查密码是否正确
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ code: -1, message: "Incorrect password" });
  }

  // 登录成功
  res.json({ code: 0, message: "Logged in successfully", data: user });
});

app.post("/task", async (req, res) => {
  const page = req.body.page || 1; // 默认为第一页
  const limit = req.body.limit || 10; // 默认每页10条数据

  const totalTasks = await Task.countDocuments({}); // 计算总任务数
  const totalPages = Math.ceil(totalTasks / limit); // 计算总页数

  const Tasks = await Task.find({})
    .skip((page - 1) * limit) // 跳过前面的数据
    .limit(limit); // 限制返回的数据数量

  res.json({
    code: 0,
    data: {
      tasks: Tasks,
      totalPages,
    },
  });
});

app.post("/addTask", async (req, res) => {
  const { name, importance, status, description } = req.body;
  await Task.create({
    name,
    createTime: new Date(),
    importance,
    status,
    description,
  });

  res.json({
    code: 0,
    message: "ok",
  });
});

app.post("/deleteTask", async (req, res) => {
  const { id } = req.body;

  await Task.findByIdAndDelete(id);

  res.json({
    code: 0,
    message: "ok",
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
