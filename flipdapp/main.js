var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var contractAddress = "0x85d7122496dE5629B933D049Af42813169FE56CA";
var winState;


$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
      console.log("contract instance was ");
      console.log(contractInstance);
      updateStake();
    });
    $("#setStake").click(setStake);
    $("#play").click(playGame);
});

// adds data from form
function playGame(){

  //play the gameplay
  var config = {
    value: 1000000
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
  contractInstance.methods.setStake(newStake).send(newStake).then(function(){
    console.log("Set new stake to "+newStake+" wei");
    updateStake();
  });
}
function updateStake(){
  // fetch and display data
  contractInstance.methods.getStake().call().then(function(stake){
    $("#currentStake").text(stake);
    console.log("current stake is set to "+stake+" wei");
  });
}
