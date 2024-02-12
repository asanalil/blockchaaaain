const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProfessionalNetwork", function () {
    let professionalNetwork;
    let owner;
    let user1;
    let user2;

    beforeEach(async function () {
        const ProfessionalNetwork = await ethers.getContractFactory("ProfessionalNetwork");
        [owner, user1, user2] = await ethers.getSigners();
        professionalNetwork = await ProfessionalNetwork.deploy();
        await professionalNetwork.deployed();
    });

    it("should register user", async function () {
        await professionalNetwork.register("User1", "Bio", "ProfilePicture", { from: user1.address });
        const profile = await professionalNetwork.profiles(user1.address);
        expect(profile.name).to.equal("User1");
    });

    it("should send and accept friend request", async function () {
        await professionalNetwork.register("User1", "Bio", "ProfilePicture", { from: user1.address });
        await professionalNetwork.register("User2", "Bio", "ProfilePicture", { from: user2.address });

        await professionalNetwork.sendFriendRequest(user2.address, { from: user1.address });
        await professionalNetwork.acceptFriendRequest(user1.address, { from: user2.address });

        const areFriends = await professionalNetwork.connections(user1.address, user2.address);
        expect(areFriends).to.be.true;
    });

    // Add more test cases for other functionalities
});
