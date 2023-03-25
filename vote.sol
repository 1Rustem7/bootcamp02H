// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Session {
        uint id;
        string topic;
        string[] options;
        uint[] voteCount;
    }

    Session[] sessions;
    mapping(uint => mapping(address => bool)) voters;
    mapping(address => bool) whiteList;

    address owner;

    constructor() {
        owner = msg.sender;
        whiteList[owner] = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    modifier correctSessionId(uint id) {
        require(sessions.length > id, "Invalid ID");
        _;
    }

    modifier empty() {
        require(sessions.length > 0, "Sessions empty");
        _;
    }

    modifier correctOption(uint id, uint option) {
        require(sessions[id].options.length > option, "Invalid option");
        _;
    }

    modifier onlyOne(uint id, address voter) {
        require(!voters[id][voter], "Only one");
        _;
    }

    modifier onlyWhiteList() {
        require(whiteList[msg.sender], "Only White List");
        _;
    }

    function addVote(
        string calldata topic,
        string[] calldata options
    ) public onlyOwner {
        uint id = sessions.length;

        Session memory session;
        session.id = id;
        session.topic = topic;
        session.options = options;
        session.voteCount = new uint[](options.length);

        sessions.push(session);
    }

    function registerVoter(address addr) public onlyOwner {
        whiteList[addr] = true;
    }

    function vote(
        uint id,
        uint option
    )
        public
        onlyWhiteList
        correctSessionId(id)
        correctOption(id, option)
        onlyOne(id, msg.sender)
    {
        sessions[id].voteCount[option] += 1;
    }

    function getVoteCount()
        public
        view
        empty
        returns (string[] memory, uint[] memory)
    {
        uint id = sessions.length - 1;
        return (sessions[id].options, sessions[id].voteCount);
    }

    function getSessions() public view returns (Session[] memory) {
        return sessions;
    }

    function getSession(
        uint id
    ) public view correctSessionId(id) returns (Session memory) {
        return sessions[id];
    }
}
