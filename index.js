const server = require("./api/server");
const port =  process.env.PORT || 10000;

server.listen(port, () => {
  console.log(`API ONLINE ON PORT ${port}`);
});