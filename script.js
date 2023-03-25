// Подключаемся к контракту
const contractAddress = "0x4015449732bfB9f15615Ff0426732917b0B1e1C5"; //Замените вашим контрактом

// Указываем ABI (Application Binary Interface) контракта
const abi =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "topic",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "options",
				"type": "string[]"
			}
		],
		"name": "addVote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "registerVoter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "option",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getSession",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "topic",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "options",
						"type": "string[]"
					},
					{
						"internalType": "uint256[]",
						"name": "voteCount",
						"type": "uint256[]"
					}
				],
				"internalType": "struct VotingSystem.Session",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSessions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "topic",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "options",
						"type": "string[]"
					},
					{
						"internalType": "uint256[]",
						"name": "voteCount",
						"type": "uint256[]"
					}
				],
				"internalType": "struct VotingSystem.Session[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVoteCount",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Подключаемся к web3 провайдеру (метамаск)
const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;

//Запрашиваем аккаунты пользователя и подключаемся к первому аккаунту
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    //Создаем объект контракта
    contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(contract);
  });
});

//Вызываем registerVoter() в смарт-контракте
async function registerVoter() {
  const voter = document.getElementById("voter").value;
  const registerVoter = await contract.registerVoter(voter);
}

//Вызываем vote() в смарт-контракте и показываем пользователю
async function vote(id) {
    const votetopic = document.getElementById("votetopic").value;
    const votetop = await contract.vote(votetopic);
}
async function vote(option) {
	const voteoption = document.getElementById("voteoption").value;
    const myvote = await contract.vote(option);
}


//Вызываем addVote() в смарт-контракте и показываем пользователю варианты выбора
async function addVote() {
    const topic = document.getElementById("topic").value;
    const settopic = await contract.addVote(topic);
	
}

async function addVote() {
    const options = document.getElementById("options").value;
    const setsetoptions = await contract.addVote(options);
}

async function getVoteCount() {
    const getvoutecount = await contract.getVouteCount();
}