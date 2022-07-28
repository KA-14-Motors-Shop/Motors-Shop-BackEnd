import app from "./app";
import { AppDataSource } from "./data-source";

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.send("App is running!")
})

app.listen(port, async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source Initialized");
    })
    .catch((err) => {
      console.error("Error during Data Source Initialization");
    });
  console.log(`app running on port ${port}`);
});
