const app = require("./index")
const connect = require("./configs/db.js")

// app.listen(7765, async function () {
//     await connect();
//     console.log("listening on port 7765");
// })

app.listen(process.env.PORT || 7765, async function(){
    await connect();
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });