import express from "express";
import User from "../models/user";
import user from "../models/user";

const router: express.Router = express.Router();

router.get("/getusers", async (req: express.Request, res: express.Response) => {
  try {
    const users: object[] = await User.find();
    if (users.length != 0) return res.status(200).json({ users: users });
    return res.status(201).json({ users: "there are no users" })
  } catch (e) {
    res.status(500).json({ error: e });
  }


});

router.get("/:email", async (req: express.Request, res: express.Response) => {
  const email = req.params.email
  try {
    const users: object[] = await User.find({ email: email });
    if (users.length != 0) return res.status(200).json({ user: users[0] });
    return res.status(201).json({ users: "there is no user" })
  } catch (e) {
    res.status(500).json({ error: e });
  }


  res.status(200).json({ message: email });
});
router.post("/adduser", async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  try {
    const user:any = new User({ email: email, password: password });
    await user.save()
    return res.status(200).json({ user: user });

  } catch (e) {
    res.status(500).json({ error: e });

  }
});
router.post("/login", async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email: email, password: password });
    await User.updateOne({email:email},{logged:true})
    console.log(user)
    return res.status(200).json({ user: user });

  } catch (e) {
    res.status(500).json({ error: e });

  }
});

router.post("/update", async (req: express.Request, res: express.Response) => {
  try {
    const email = req.body.email;
    console.log(email)
    const user = await User.updateOne({ email: email }, { balance: req.body.balance })
    return res.status(200).json({ user: user });

  } catch (e) {
    res.status(500).json({ error: e });

  }

});
router.post("/delete", async (req: express.Request, res: express.Response) => {
  try {
    const email = req.body.email;
    const user = await User.deleteOne({ email: email });
    return res.status(200).json({ user: user });

  } catch (e) {
    res.status(500).json({ error: e });

  }
});

export default router;
