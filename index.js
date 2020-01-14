const server = require("./api/server");
const port = 10000;

server.listen(port, () => {
  console.log(`API ONLINE ON PORT ${port}`);
});