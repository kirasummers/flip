var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var contractAddress = "0x85d7122496dE5629B933D049Af42813169FE56CA";
var winState;
var gameStake;


$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
      console.log("contract instance was ");
      console.log(contractInstance);
    });
    setStake();
    updateStake();
    $("#winlose").text("You have not played yet!");
    $("#setStake").click(setStake);
    $("#play").click(playTheGame);
});




// adds data from form
async function playTheGame(){

  //play the gameplay
  var config = {
    value: web3.utils.toWei(gameStake, "ether")
  }

  console.log("\nPlaying game...\n");
  contractInstance.methods.playGame().send(config)
  .on("transactionHash", async function (hash){
      console.log("hash of confirmed transaction was :" + hash);

    //update the outputs
    await contractInstance.getPastEvents(['returnWin'], {fromBlock: 'latest', toBlock: 'latest'},
      async (err, events) => {
      console.log("result of win event was" +events[events.length-1].returnValues.win);
      console.log(events[events.length-1]);
    });
 });

}


function setStake(){
  var newStake = $("#stake_value").val();
  // Set stake value and update page
    console.log("Set new stake to "+newStake+" Ether");
    gameStake = newStake;
    updateStake();

}
function updateStake(){
  // fetch and display data
  $("#currentStake").text(gameStake);
  console.log("current stake is set to "+gameStake+" Ether");
}
