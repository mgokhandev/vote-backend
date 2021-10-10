const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

let lastVoteOne = 0;
let lastVoteTwo = 0;

io.on("connection", (socket) => {
  console.log("bir kullanıcı bağlandı!");

  socket.emit("lastVoteOne", lastVoteOne);
  socket.emit("lastVoteTwo", lastVoteTwo);

  socket.on("newVoteOne", (voteOne) => {
    console.log(voteOne);

    lastVoteOne++;
    io.emit("lastVoteOne", lastVoteOne);
  });

  socket.on("newVoteTwo", (voteTwo) => {
    console.log(voteTwo);

    lastVoteTwo++;
    io.emit("lastVoteTwo", lastVoteTwo);
  });

  socket.on("disconnect", () => {
    console.log("Bir kullanıcı ayrıldı.");
  });
});

http.listen(3000, () => console.log("Server is up 🚀 🚀"));
