const flip = artifacts.require("flip");
const truffleAssert = require("truffle-assertions");

contract("flip", async function(accounts){
  let instance;
  var game_stake=1000000;

  // functions before, beforeeach, after and after each help when running tests, to set up before.

  before (async function(){
    instance = await flip.deployed();
  });

  // check check withdraw all removes all money and that it ends up in owner wallet.
  it("should add funds correctly", async function(){

    let oldBalance = parseFloat(await instance.balance());
    let oldAccountBalance = parseFloat(await web3.eth.getBalance(instance.address));

    await instance.playGame(game_stake, {from: accounts[1], value: game_stake});

    let newBalance = parseFloat(await instance.balance());
    let newAccountBalance =parseFloat(await web3.eth.getBalance(instance.address));

    assert(newBalance == (oldBalance + game_stake), "local balance did add stake after gameplay");
    assert(newAccountBalance ==(oldAccountBalance + game_stake), "onChain balance did add stake after gameplay");
  });

  // check check withdraw all removes all money and that it ends up in owner wallet.
  it("should withdraw funds correctly", async function(){
    await instance.playGame(game_stake, {from: accounts[1], value: game_stake});

    let oldBalance = parseFloat(await instance.balance());
    let oldAccountBalance = parseFloat(await web3.eth.getBalance(instance.address));

    await instance.withdrawAll({from: accounts[0]});

    let newBalance = parseFloat(await instance.balance());
    let newAccountBalance =parseFloat(await web3.eth.getBalance(instance.address));

    assert(newBalance == parseFloat(web3.utils.toWei("0", "ether")), "local balance did reset to zero after withdrawal");
    assert(newAccountBalance == parseFloat(web3.utils.toWei("0", "ether")), "onChain balance did not reset to zero after withdrawal");
  });


});
