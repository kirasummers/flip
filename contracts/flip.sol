pragma solidity 0.5.12;
import "./ownable.sol";

contract flip is Ownable {

  uint public balance; //holds account balance
  uint public game_stake = 1000000; // default stake

  address payable public player; //holds address of the player

  modifier costs(uint cost){
      require(msg.value >= cost);
      _;
  }

  function playGame() public payable costs(game_stake) returns (bool){
    bool win;
    uint winnings = game_stake *2;

    player = msg.sender ;

    // get win state
    if (balance>= game_stake)win = getFlip();
    else win=false;

    // if win transfer winnings to player
    if (win){
      player.transfer(winnings);
      balance -= game_stake;
    }
    else {
        balance += game_stake;
    }

    return win;
  }


  // getter for game stake vavlue
  function getStake() public view returns (uint){
      return game_stake;
  }

  // setter for game stake vavlue
  function setStake(uint newStake) public {
      game_stake= newStake;
  }

  //empty balance to owner account
  function withdrawAll() public payable onlyOwner returns(uint) {
       uint toTransfer = balance;
       balance = 0;
       msg.sender.transfer(toTransfer);
       return toTransfer;
   }

  // 50/50 chance will return bool of true or false
  function getFlip() private view returns (bool) {
   if (now % 2 == 1 ) return true;
    else return false;
  }
}
