pragma solidity 0.5.12;
import "./ownable.sol";

contract flip is Ownable {

  uint public balance; //holds account balance

  address payable public player; //holds address of the player

  event returnWin(address indexed _from, bool win);

  function playGame()
  public
  payable
  returns (bool)
  {
    bool win;
    uint winnings;

    uint game_stake = msg.value;
    winnings = game_stake *2;
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

    emit returnWin(msg.sender, win);
    return win;
  }

  //empty balance to owner account
  function withdrawAll()
  public
  payable
  onlyOwner
  returns(uint)
  {
       uint toTransfer = balance;
       balance = 0;
       msg.sender.transfer(toTransfer);
       return toTransfer;
   }

  // 50/50 chance will return bool of true or false
  function getFlip()
  private
  view
  returns (bool)
  {
   if (now % 2 == 1 ) return true;
    else return false;
  }
}
