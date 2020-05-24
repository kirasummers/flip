var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var contractAddress = "0x6B42E7772b964dc55E12AcBf322C5D505c85d137";
var winState;
var gameStake = 1000000;


$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
      console.log("contract instance was ");
      console.log(contractInstance);
      updateStake();
    });
    $("#setStake").click(setStake);
    $("#play").click(playTheGame);
});

// adds data from form
function playTheGame(){

  //play the gameplay
  var config = {
    value: gameStake
  }

  console.log("\nPlaying game...\n");
  winsState=contractInstance.methods.playGame(gameStake).send(config)
  .on("transactionHash", function (hash){
    console.log("hash of confirmed transaction was :" + hash);
    console.log("Win state was "+winState);
  })
  //update the outputs

}


function whatever(){
    var name = $("#name_input").val();
    var age= Number($("#age_input").val());
    var height= Number($("#height_input").val());

    var config = {
      value: web3.utils.toWei("1", "ether")
    }
    contractInstance.methods.createPerson(name, age, height).send(config)
    .on("transactionHash", function (hash){
      console.log("hash of confirmed transaction was :" + hash);
    })
    .on("confirmation", function(confirmationNr){
      console.log("Confirmation number: "+confirmationNr);
    })
    .on("reciept", function(receipt){
      console.log("receipt received: "+ receipt);
    })
}

function setStake(){
  var newStake = $("#stake_value").val();
  // Set stake value and update page
    console.log("Set new stake to "+newStake+" wei");
    gameStake = newStake;
    updateStake();

}
function updateStake(){
  // fetch and display data
  $("#currentStake").text(gameStake);
  console.log("current stake is set to "+gameStake+" wei");
}
