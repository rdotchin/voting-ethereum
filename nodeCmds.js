//NOTES FOR COMMAND LINE COMPILE AND DEPLOY OF CONTRACT IN Voting.sol 

/*REQUIRE WEB3 AND SET UP A PROVIDER*/
Web3 = require('web3'); //Ethereum compatible JavaScript API which impliments the Generic JSON RPC spec
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")); //set a web3 provider

/*READ THE CONTRACT AND COMPILE IT*/
code = fs.readFileSync('Voting.sol').toString(); //read contract and load in to a string variable
contract =  web3.eth.compile.solidity(code); //compile the contract to solidity

/*after code and contract type in <contract> to the node console.  Two important fields:
	*contract.code: This is the bytecode you get when the source code in Voting.sol is compiled. This is 
	the code which will be deployed to the blockchain.
	*contract.info.abiDefinition: This is an interface or template of the contract which tells the contract 
	user what methods are available in the contract. Whenever you have to interact with the contract in the 
	future, you will need this abiDefinition.
*/

/*DEPLOY THE CONTRACT*/
VotingContract = web3.eth.contract(contract.info.abiDefinition); //Create the contract object
/*deployedContract: Deploy the voting contract to the blockchain 
	*data: compiled bytecode which we deploy to the blockchain
	*from: Provide blockchain with who deployed the contract
	*gas: money it cost to interact with the blockchain.  Money goes to the miners.*/
deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: contract.code, from: web3.eth.accounts[0], gas: 4700000});

/*CONTRACT INSTANCE*/
contractInstance = VotingContract.at(deployedContract.address); 

/*INTERACT WITH TEH CONTRACT*/
contractInstance.totalVotesFor.call('Rama'); //total votes count
contractInstance.voteForCandidate('Rama', {from: web3.eth.accounts[0]}); //vote for the candidate
