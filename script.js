// Подключаемся к контракту
const contractAddress = "0xA9f1D1Adad50C5A4B1489f09c91b34c76c316E1c"; //Замените вашим контрактом

// Указываем ABI (Application Binary Interface) контракта
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "itemName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "minBid",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "duration",
				"type": "uint256"
			}
		],
		"name": "AuctionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endPrice",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "bidderAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct VipAuctionEngine.Bidder[]",
				"name": "winners",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "bidderAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct VipAuctionEngine.Bidder[]",
				"name": "otherParticipants",
				"type": "tuple[]"
			}
		],
		"name": "AuctionEnded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "bid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidderAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bid",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "bidderAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct VipAuctionEngine.Bidder[]",
				"name": "winners",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "bidderAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "bid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"indexed": false,
				"internalType": "struct VipAuctionEngine.Bidder[]",
				"name": "otherParticipants",
				"type": "tuple[]"
			}
		],
		"name": "BidAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_minBid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_duration",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_item",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_ticketsSupply",
				"type": "uint256"
			}
		],
		"name": "createAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "endAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "auctions",
		"outputs": [
			{
				"internalType": "string",
				"name": "item",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ticketsSupply",
				"type": "uint256"
			},
			{
				"internalType": "contract Ticket",
				"name": "ticket",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "minBid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startAt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endsAt",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "ended",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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


//Вызываем createAuction() в смарт-контракте и показываем пользователю
async function createAuction() {
    const _minBid = document.getElementById("_minBid").value;
   const _duration = document.getElementById("_duration").value;
   const _item = document.getElementById("_item").value;
    const _ticketsSupply = document.getElementById("_ticketsSupply").value;
    const note = await contract.createAuction(_minBid,_duration,_item,_ticketsSupply);
    console.log(createAuction);
    //document.getElementById("result").innerText = note;
  }

  //Вызываем endAuction() в смарт-контракте и показываем пользователю
async function endAuction() {
   const _item2 = document.getElementById("_item2").value;
   const note = await contract.endAuction(_item2);
   console.log(endAuction);
    //document.getElementById("result").innerText = note;
  }

  //Вызываем bid() в смарт-контракте и показываем пользователю
async function bid() {
    const _bid = document.getElementById("_bid").value;
    const note = await contract.endAuction(_bid);
    
     //document.getElementById("result").innerText = note;
	 const note2 = await contract.endAuction(_bid);
	 console.log(endAuction);
	 document.getElementById("result").innerText = note2;

   }