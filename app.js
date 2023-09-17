window.addEventListener("load", async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      const connectedWallet = document.getElementById("connectedWallet");
      const walletAddress = document.getElementById("walletAddress");
      walletAddress.textContent = accounts[0];
      connectedWallet.style.display = "block";

      const abi = [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_rate",
              type: "uint256",
            },
            {
              internalType: "contract IST20",
              name: "_token",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_max",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "purchaser",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "beneficiary",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "TokenPurchase",
          type: "event",
        },
        {
          stateMutability: "payable",
          type: "fallback",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_weiAmount",
              type: "uint256",
            },
          ],
          name: "_getTokenAmount",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_beneficiary",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_weiAmount",
              type: "uint256",
            },
          ],
          name: "_preValidatePurchase",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_beneficiary",
              type: "address",
            },
          ],
          name: "buyTokens",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_beneficiary",
              type: "address",
            },
          ],
          name: "maxCore",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "purchasedCore",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "rate",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_rate",
              type: "uint256",
            },
          ],
          name: "setPresaleRate",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "token",
          outputs: [
            {
              internalType: "contract IST20",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "weiMaxPurchaseCore",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "weiRaised",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdrawCoins",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "tokenAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "tokens",
              type: "uint256",
            },
          ],
          name: "withdrawTokens",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ];

      const contractAddress = "0x0E5C0BF1CB897929920BaB9E51c425a7548C5bc2";

      const contract = new web3.eth.Contract(abi, contractAddress);

      const presaleRateWei = await contract.methods.rate().call();

      const presaleRate = web3.utils.fromWei(presaleRateWei, "ether");
      document.getElementById("presaleRate").textContent = presaleRate;

      const weiRaisedWei = await contract.methods.weiRaised().call();

      const weiRaised = web3.utils.fromWei(weiRaisedWei, "ether");
      document.getElementById("weiRaised").textContent = weiRaised;

      const maxPurchaseWei = await contract.methods.maxCore(accounts[0]).call();

      const maxPurchase = web3.utils.fromWei(maxPurchaseWei, "ether");
      document.getElementById("maxPurchase").textContent = maxPurchase;

      const tokenContractAddress = "0xb62FdF96Ee7483F6B930aDF4191E2259536f9868";
      const tokenContractAbi = [
        { inputs: [], stateMutability: "nonpayable", type: "constructor" },
        {
          inputs: [
            {
              indexed: true,
              name: "owner",
              internalType: "address",
              type: "address",
            },
            {
              indexed: true,
              name: "spender",
              internalType: "address",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              internalType: "uint256",
              type: "uint256",
            },
          ],
          name: "Approval",
          anonymous: false,
          type: "event",
        },
        {
          inputs: [
            {
              indexed: true,
              name: "previousOwner",
              internalType: "address",
              type: "address",
            },
            {
              indexed: true,
              name: "newOwner",
              internalType: "address",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          anonymous: false,
          type: "event",
        },
        {
          inputs: [
            {
              indexed: true,
              name: "from",
              internalType: "address",
              type: "address",
            },
            {
              indexed: true,
              name: "to",
              internalType: "address",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              internalType: "uint256",
              type: "uint256",
            },
          ],
          name: "Transfer",
          anonymous: false,
          type: "event",
        },
        {
          outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
          inputs: [
            { name: "owner", internalType: "address", type: "address" },
            { name: "spender", internalType: "address", type: "address" },
          ],
          name: "allowance",
          stateMutability: "view",
          type: "function",
        },
        {
          outputs: [{ name: "", internalType: "bool", type: "bool" }],
          inputs: [
            { name: "spender", internalType: "address", type: "address" },
            { name: "amount", internalType: "uint256", type: "uint256" },
          ],
          name: "approve",
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
          inputs: [
            { name: "account", internalType: "address", type: "address" },
          ],
          name: "balanceOf",
          stateMutability: "view",
          type: "function",
        },
        {
          outputs: [],
          inputs: [
            { name: "amount", internalType: "uint256", type: "uint256" },
          ],
          name: "burn",
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          outputs: [],
          inputs: [
            { name: "account", internalType: "address", type: "address" },
            { name: "amount", internalType: "uint256", type: "uint256" },
          ],
          name: "burnFrom",
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          outputs: [{ name: "", internalType: "uint8", type: "uint8" }],
          inputs: [],
          name: "decimals",
          stateMutability: "view",
          type: "function",
        },
        {
          outputs: [{ name: "", internalType: "bool", type: "bool" }],
          inputs: [
            { name: "spender", internalType: "address", type: "address" },
            {
              name: "subtractedValue",
              internalType: "uint256",
              type: "uint256",
            },
          ],
          name: "decreaseAllowance",
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          outputs: [{ name: "", internalType: "bool", type: "bool" }],
          inputs: [
            { name: "spender", internalType: "address", type: "address" },
            { name: "addedValue", internalType: "uint256", type: "uint256" },
          ],
          name: "increaseAllowance",
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          outputs: [],
          inputs: [
            { name: "to", internalType: "address", type: "address" },
            { name: "amount", internalType: "uint256", type: "uint256" },
          ],
          name: "mint",
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          outputs: [{ name: "", internalType: "string", type: "string" }],
          inputs: [],
          name: "name",
          stateMutability: "view",
          type: "function",
        },
        {
          outputs: [{ name: "", internalType: "address", type: "address" }],
          inputs: [],
          name: "owner",
          stateMutability: "view",
          type: "function",
        },
        {
          outputs: [],
          inputs: [],
          name: "renounceOwnership",
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          outputs: [{ name: "", internalType: "string", type: "string" }],
          inputs: [],
          name: "symbol",
          stateMutability: "view",
          type: "function",
        },
        {
          outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
          inputs: [],
          name: "totalSupply",
          stateMutability: "view",
          type: "function",
        },
        {
          outputs: [{ name: "", internalType: "bool", type: "bool" }],
          inputs: [
            { name: "to", internalType: "address", type: "address" },
            { name: "amount", internalType: "uint256", type: "uint256" },
          ],
          name: "transfer",
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          outputs: [{ name: "", internalType: "bool", type: "bool" }],
          inputs: [
            { name: "from", internalType: "address", type: "address" },
            { name: "to", internalType: "address", type: "address" },
            { name: "amount", internalType: "uint256", type: "uint256" },
          ],
          name: "transferFrom",
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          outputs: [],
          inputs: [
            { name: "newOwner", internalType: "address", type: "address" },
          ],
          name: "transferOwnership",
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const tokenContract = new web3.eth.Contract(
        tokenContractAbi,
        tokenContractAddress
      );

      const tokenBalanceElement = document.getElementById("tokenBalance");

      const tokenBalanceWei = await tokenContract.methods
        .balanceOf(accounts[0])
        .call();
      const tokenBalance = web3.utils.fromWei(tokenBalanceWei, "ether");
      tokenBalanceElement.textContent = tokenBalance;

      const coreBalanceElement = document.getElementById("coreBalance");

      const coreBalanceWei = await web3.eth.getBalance(accounts[0]);
      const coreBalance = web3.utils.fromWei(coreBalanceWei, "ether");
      coreBalanceElement.textContent = coreBalance;

      const buyTokensForm = document.getElementById("buyTokensForm");
      buyTokensForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const beneficiaryAddress = accounts[0];
        const buyAmount = document.getElementById("buyAmount").value;

        if (!/^\d+(\.\d+)?$/.test(buyAmount)) {
          alert("Mohon masukkan angka desimal yang valid.");
          return;
        }

        const gasLimit = 200000;
        const gasPrice = web3.utils.toWei("30", "gwei");

        try {
          await contract.methods.buyTokens(beneficiaryAddress).send({
            from: accounts[0],
            value: web3.utils.toWei(buyAmount, "ether"),
            gas: gasLimit,
            gasPrice: gasPrice,
          });

          const operationResult = document.getElementById("operationResult");
          const operationMessage = document.getElementById("operationMessage");
          operationMessage.textContent = "Pembelian token berhasil";
          operationResult.style.display = "block";
        } catch (error) {
          console.error(error);
        }
      });

      const setPresaleRateForm = document.getElementById("setPresaleRateForm");
      setPresaleRateForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const newRate = document.getElementById("newRate").value;
        try {
          await contract.methods
            .setPresaleRate(newRate)
            .send({ from: accounts[0] });
          const operationResult = document.getElementById("operationResult");
          const operationMessage = document.getElementById("operationMessage");
          operationMessage.textContent = "Presale rate set successfully";
          operationResult.style.display = "block";
        } catch (error) {
          console.error(error);
        }
      });

      const withdrawCoinsButton = document.getElementById("withdrawCoins");
      withdrawCoinsButton.addEventListener("click", async () => {
        try {
          await contract.methods.withdrawCoins().send({ from: accounts[0] });
          const operationResult = document.getElementById("operationResult");
          const operationMessage = document.getElementById("operationMessage");
          operationMessage.textContent = "Coins withdrawn successfully";
          operationResult.style.display = "block";
        } catch (error) {
          console.error(error);
        }
      });

      const withdrawTokensForm = document.getElementById("withdrawTokensForm");
      withdrawTokensForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const tokenAddress = document.getElementById("tokenAddress").value;
        const tokenAmount = document.getElementById("tokenAmount").value;
        try {
          await contract.methods
            .withdrawTokens(tokenAddress, tokenAmount)
            .send({ from: accounts[0] });
          const operationResult = document.getElementById("operationResult");
          const operationMessage = document.getElementById("operationMessage");
          operationMessage.textContent = "Tokens withdrawn successfully";
          operationResult.style.display = "block";
        } catch (error) {
          console.error(error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Web3 is not available in your browser.");
  }

  const connectWalletButton = document.getElementById("connectWallet");
  connectWalletButton.addEventListener("click", async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  });
});
