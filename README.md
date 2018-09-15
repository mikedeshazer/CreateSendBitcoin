<p align="center">
  <img src="https://i.imgur.com/nW3OKhj.png" alt="C/S B (CreateSendBitcoin)" width="30">
  <br>
 
</p>

<p align="center">
A MyEtherWallet-like Experience for Bitcoin Users. CreateSendBitcoin helps you create secure Bitcoin paper wallets, send Bitcoin and encrypt existing naked private keys.</p>

<p align="center"><img src="https://i.imgur.com/gXSPWZ0.png" width=500 alt="Screenshot of CreateSendBitcoin"></p>

<p align="center"><em>The screenshot above is C/S B. Check it out at <a href="https://www.createsendbitcoin.com">createsendbitcoin.com</a>.</em></p>

Features
------------

* **Create Secure Bitcoin Wallets** — With CreateSendBitcoin you can create bitcoin wallets with the ease-of-use that MyEtherWallet offers Ethereum users.

* **Send Bitcoin by Creating the Transaction on Your Computer** — No need to trust third-parties to handle your bitcoin. There are other interfaces out there like Coinb.in and Bitaddress.org; however, for people new to bitcoin and also for people who want less hassle, C/S B offers an easy alternative.

* **Secure & Encrypt Existing Wallets** — Most paper wallets are generated in BitAddress; however, these private keys are not encrypted. If someone discovers them, they can easily take your bitcoins. We offer a completely offline solution for encrypting those keys securely for more peace of mind.

* **Modeled After MyEtherWallet** — You might have noticed that the user-flow is very similar to MyEtherWallet. That is no coincidence. We modeled the design after MyEtherWallet and added a dark theme to easily identify which platform you are on. We will continue in this way as we add new features like Multisig wallet generation, multi-sig wallet bitcoin transactions, and the addition of other bitcoin blockchains (like Bitcoin Cash, Bitcoin Gold, etc).

Getting started with CreateSendBitcoin is super easy! Simply fork this repository and follow the instructions below. Or, if you'd like to check out what CreateSendBitcoin is capable of, take a look at the [website](https://www.createsendbitcoin.com).

Getting Started with CreateSendBitcoin
------------------------------

### Prerequisites

You're going to need:

 - **Chrome of Firefox Browser (IE9+ works but is not recommended)
 - **Python or PHP on your computer


### Getting Set Up

1. Fork this repository on GitHub.
2. Clone *your forked repository* (not our original one) to your hard drive with `git clone https://github.com/YOURUSERNAME/createsendbitcoin.git`
3. `cd createsendbitcoin`
4. Initialize and start CreateSendBitcoin. You can either do this locally:

```shell
# run this to run locally
python -m SimpleHTTPServer 3388


# OR run this 
php -S localhost:3388
```

You can now see the docs at http://localhost:3388. Whoa! That was fast!

Now that CreateSendBitcoin is all set up on your machine, you'll probably want to learn more about [how it works](https://www.createsendbitcoin.com/#faq)



Questions? Need Help? Found a bug?
--------------------

If you've got questions about setup, deploying, special feature implementation in your fork, or just want to chat, please feel free to email us at support@createsendbitcoin.com!

Found a bug with upstream CreateSendBitcoin? Go ahead and [submit an issue](https://github.com/mikedeshazer/createsendbitcoin/issues). And, of course, feel free to submit pull requests with bug fixes or changes to the `develop` branch.

Contributors
--------------------

CreateSendBitcoin was built by [Mike De'Shazer](https://github.com/mikedeshazer) while working at [Proofsuite](https://www.proofsuite.com/).

Special thanks to the following people:

- [@kerstentw](https://github.com/kerstentw)
- [@Dvisacker](https://github.com/Dvisacker)


You are invited to contribute! Again, feel free to submit pull requests with bug fixes or changes to the `develop` branch. Added features with Lightning and Cosmos Hub should be submitted to the `experimental` branch


Special Thanks
--------------------
- [Crypto-JS](https://github.com/brix/crypto-js)
- [MyEtherWallet](https://myetherwallet.com): The design is based off of the userflow developed by MyEtherWallet
- [Greeva](https://themeforest.net/item/greeva-responsive-admin-dashboard-template/22226768): If you use publish your version of CreateSendBitcoin make sure to pay the licensing fee
- [jQuery Foundation](https://jquery.org/)
- [Material Icons](https://material.io/tools/icons/?style=baseline)
- [toastr](https://github.com/CodeSeven/toastr)
