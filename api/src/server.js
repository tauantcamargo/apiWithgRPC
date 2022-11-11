const expressApp = require("./configs/express")
const port = 3333

expressApp.listen(port, () => console.log("api is running on https://localhost:3333"))
