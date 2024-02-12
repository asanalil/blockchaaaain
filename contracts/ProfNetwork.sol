// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProfNetwork is Ownable, IERC721Receiver {

    struct Profile {
        string name;
        string bio;
        string profilePicture;
        address[] friends;
        uint256 friendCount;
    }

    struct FriendRequest {
        address sender;
        address receiver;
        bool accepted;
    }

    mapping(address => Profile) public profiles;
    mapping(address => mapping(address => bool)) public connections;
    mapping(address => FriendRequest[]) public friendRequests;
    mapping(address => bool) public hasTopWeb3NFT;

    IERC20 public tokenContract; // ERC-20 contract
    IERC721Enumerable public nftContract; // ERC-721 contract

    uint256 public topWeb3NFTId; // ID of the TOPWEB3 NFT

    constructor(address _tokenContractAddress, address _nftContractAddress, uint256 _topWeb3NFTId) {
        tokenContract = IERC20(_tokenContractAddress);
        nftContract = IERC721Enumerable(_nftContractAddress);
        topWeb3NFTId = _topWeb3NFTId;
    }

    function register(string memory _name, string memory _bio, string memory _profilePicture) external {
        require(bytes(profiles[msg.sender].name).length == 0, "Profile already exists");
        profiles[msg.sender] = Profile(_name, _bio, _profilePicture, new address[](0), 0);
    }

    function createProfile(string memory _name, string memory _bio, string memory _profilePicture) external {
        require(bytes(profiles[msg.sender].name).length == 0, "Profile already exists");
        profiles[msg.sender] = Profile(_name, _bio, _profilePicture, new address[](0), 0);
    }

    function sendFriendRequest(address _receiver) external {
        require(bytes(profiles[msg.sender].name).length != 0, "Profile does not exist");
        require(_receiver != msg.sender, "Cannot send request to yourself");
        friendRequests[_receiver].push(FriendRequest(msg.sender, _receiver, false));
    }

    function acceptFriendRequest(address _sender) external {
        require(bytes(profiles[msg.sender].name).length != 0, "Profile does not exist");
        require(friendRequests[msg.sender].length > 0, "No friend requests");

        for (uint256 i = 0; i < friendRequests[msg.sender].length; i++) {
            if (friendRequests[msg.sender][i].sender == _sender) {
                connections[msg.sender][_sender] = true;
                connections[_sender][msg.sender] = true;
                profiles[msg.sender].friends.push(_sender);
                profiles[_sender].friends.push(msg.sender);
                profiles[msg.sender].friendCount++;
                profiles[_sender].friendCount++;
                delete friendRequests[msg.sender][i];
                break;
            }
        }
    }

    function mintNFT() external {
        require(profiles[msg.sender].friendCount >= 5, "Not enough friends");
        require(!hasTopWeb3NFT[msg.sender], "Already has TOPWEB3 NFT");

        nftContract.transferFrom(address(this), msg.sender, topWeb3NFTId);
        hasTopWeb3NFT[msg.sender] = true;
    }

    function receiveNFT(address _from, uint256 _tokenId) external override returns (bytes4) {
        require(msg.sender == address(nftContract), "Only ERC721 contract allowed");
        require(_tokenId == topWeb3NFTId, "Received token is not TOPWEB3 NFT");

        hasTopWeb3NFT[_from] = false;

        return this.onERC721Received.selector;
    }
}
