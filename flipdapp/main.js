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
      setStake();
      updateStake();
    });
    $("#winlose").text("haven't played yet!");
    $("#setStake").click(setStake);
    $("#play").click(playTheGame);
});

// adds data from form
function playTheGame(){

  //play the gameplay
  var config = {
    value: web3.utils.toWei(gameStake, "ether")
  }

  console.log("\nPlaying game...\n");
  winsState=contractInstance.methods.playGame().send(config)
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
    console.log("Set new stake to "+newStake+" Ether");
    gameStake = newStake;
    updateStake();

}
function updateStake(){
  // fetch and display data
  $("#currentStake").text(gameStake);
  console.log("current stake is set to "+gameStake+" Ether");
}
