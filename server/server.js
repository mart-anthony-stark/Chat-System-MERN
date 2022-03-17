const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await mongoose.connect(process.env.DATABASE);
  console.log(`Database connected`);
});
