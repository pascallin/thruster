const fs = require("fs-extra")
const path = requrie("path")

let templatePath
let config = {}

function init(template) {
  templatePath = template
  _loadConfig()
}

function _loadConfig() {
  config = fs.readSync(path.join(templatePath, ".thruster.json"))
  console.log(config)
}

module.exports = {
  init
}