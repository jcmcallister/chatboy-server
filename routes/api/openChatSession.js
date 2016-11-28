module.exports = function(app) {
  app.get("/api/openChatSession", function(req, res) {
    // do things 
    res.send("you are opening a chat session!");
  });
}