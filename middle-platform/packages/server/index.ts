import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import { getTask, getUser } from "./src/models/index";
import jwt from "jsonwebtoken";
import { Request } from "express";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3001;

mongoose.connect("mongodb://localhost:27017/middle-platform");

const User = getUser(mongoose);
const Task = getTask(mongoose);
const secretKey = "middle-platform";

const authenticateToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // 获取请求头中的authorization字段
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // 如果没有token，返回401（未授权）
  }

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403); // 如果token无效，返回403（禁止）
    }

    // console.log(user);

    req.user = user; // 将用户信息添加到请求对象中

    next(); // 继续处理请求
  });
};

app.post("/register", async (req, res) => {
  const { email, password, firstname, lastname, role } = req.body;

  // 检查用户名是否已存在
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ code: -1, message: "账号已经被注册" });
  }

  // 对密码进行哈希处理
  const hashedPassword = await bcrypt.hash(password, 10);

  // 创建新用户
  const user = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    role,
  });

  await user.save();

  // 创建JWT
  const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
    expiresIn: "1h",
  }); // 设置过期时间为1小时

  res.json({ code: 0, message: "Registered successfully", data: { token } });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 检查用户是否存在
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ code: -1, message: "用户不存在" });
  }

  // 检查密码是否正确
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ code: -1, message: "密码错误" });
  }

  // 登录成功，创建一个JWT
  const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
    expiresIn: "1h",
  }); // 设置过期时间为1小时

  res.json({ code: 0, message: "Logged in successfully", data: { token } });
});

app.post("/task", authenticateToken, async (req, res) => {
  const page = req.body.page || 1; // 默认为第一页
  const limit = req.body.limit || 10; // 默认每页10条数据
  const userId = req.user.id; // 从请求对象中获取用户的ID
  const role = req.user.role; // 从请求对象中获取用户的role

  // console.log(req.user);

  if (role === "admin") {
    const totalTasks = await Task.countDocuments(); // 计算该用户的总任务数

    // console.log(totalTasks);
    const totalPages = Math.ceil(totalTasks / limit); // 计算总页数

    const tasks = await Task.find() // 查询该用户的任务
      .skip((page - 1) * limit) // 跳过前面的数据
      .limit(limit); // 限制返回的数据数量

    res.json({
      code: 0,
      data: {
        tasks: tasks,
        totalPages,
      },
    });
    return;
  }

  const totalTasks = await Task.countDocuments({ owner: userId }); // 计算该用户的总任务数
  const totalPages = Math.ceil(totalTasks / limit); // 计算总页数

  const tasks = await Task.find({ owner: userId }) // 查询该用户的任务
    .skip((page - 1) * limit) // 跳过前面的数据
    .limit(limit); // 限制返回的数据数量

  res.json({
    code: 0,
    data: {
      tasks: tasks,
      totalPages,
    },
  });
});

app.post("/addTask", authenticateToken, async (req, res) => {
  const { name, importance, status, description } = req.body;
  const userId = req.user.id; // 从请求对象中获取用户的ID
  await Task.create({
    name,
    createTime: new Date(),
    importance,
    status,
    description,
    owner: userId,
  });

  res.json({
    code: 0,
    message: "ok",
  });
});

app.post("/deleteTask", authenticateToken, async (req, res) => {
  const { id } = req.body;

  await Task.findByIdAndDelete(id);

  res.json({
    code: 0,
    message: "ok",
  });
});

app.post("/updateTask", authenticateToken, async (req, res) => {
  const userId = req.user.id; // 从请求对象中获取用户的ID
  const { id, task } = req.body;

  await Task.findByIdAndUpdate(id, { ...task, owner: userId });

  res.json({
    code: 0,
    message: "ok",
  });
});

app.get("/auth", authenticateToken, async (req, res) => {
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
