const tsConfig = require("./tsconfig.test.json");
const tsNode = require('ts-node');
 
tsNode.register({
  compilerOptions: tsConfig.compilerOptions
});
