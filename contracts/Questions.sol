pragma solidity ^0.4.0; // most recent version is ^0.4.19
contract ProduceSwap {

  // each user will only have one string of requested items
  mapping(address => string) public requests;
  address solicitor;
  address solicitee;
  uint confirmSwap = 0;

  enum State { Created, Locked, Inactive, Completed }
  State public state;

  modifier inState(State _state) {
    require(state == _state);
    _; // the single underscore indicates whatever function is to be run when we use the modifier
  }

  event Aborted();
  event SwapApproved();
  event SwapCompleted();

  /// __init__
  function ProduceSwap(string _item) public {
    solicitor = msg.sender;
    requests[solicitor] = _item;
  }

  function requestItem (string _item) public {
    solicitee = msg.sender;
    requests[solicitee] = _item;
  }

  function getCurrentTrade() public constant returns (string, string) {
    return (requests[solicitor], requests[solicitee]);
  }

  function abort() public inState(State.Created) {
    Aborted();
    state = State.Inactive;
  }

  function approveSwap() public inState(State.Created) {
    SwapApproved();
    state = State.Locked;
  }

  // thinking visibility control on front end to limit each user to pressing "complete swap" only contractAddress
  // but we may want to ensure here that solicitor and solicitee can each increment confirmSwap only once
  function completeSwap() public inState(State.Locked) {
    confirmSwap = confirmSwap + 1;
    if (confirmSwap == 2) {
      SwapCompleted();
      state = State.Completed;
    }
  }

}
