function privKeyToAddress(pKey){
    try{
    var ck = coinkey.fromWif(pKey)
    return ck.publicAddress;
    }   
    catch(err){
        return false;
    }
}


function generateAddress(walletPasscode){
    var newAddress = coinkey.createRandom()
    var privateKey = newAddress.privateWif;
    var publicAddress = newAddress.publicAddress;
    console.log(privateKey)
    var encrypted = CryptoJS.AES.encrypt(privateKey, walletPasscode).toString()

    var wallet = {'privKey':privateKey, 'address':publicAddress, 'encryptedFile':encrypted}
    generateFile(wallet)
    return wallet;

}

function generateFile(walletC){
    var fileName = new Date().getTime() + ".json";
    var fileText = {"version":1, "address": walletC.address, "Crypto":{"cyphertext":walletC.encryptedFile, "cipher":"aes-128-ctr", "lib":'CryptoJS'}};
    fileText = JSON.stringify(fileText);
    download(fileName, fileText);

}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}



function decryptWallet(fileContent, passCode){
    try{
    var bytes  = CryptoJS.AES.decrypt(fileContent, passCode);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
    }
    catch(err){
        return false;
    }
}
