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

    var encrypted = CryptoJS.AES.encrypt(privateKey, walletPasscode).toString()

    var wallet = {'privKey':privateKey, 'address':publicAddress, 'encryptedFile':encrypted}
    generateFile(wallet)
    return wallet;

}

function generateEncryptedFromKey(key, address, walletPasscode){
    fileName = new Date().getTime() + ".json";
      var encrypted = CryptoJS.AES.encrypt(key, walletPasscode).toString()
   fileText = {"version":1, "address": address, "Crypto":{"cyphertext":encrypted, "cipher":"aes-128-ctr", "lib":'CryptoJS'}};
     fileText = JSON.stringify(fileText);
   // download(fileName, fileText);
    return fileText;

}

function downloadKey(){
    download(fileName, fileText);
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



function generateAndSignTransaction(sendAddr, sendKey, toAddr, amount, walletData){


    inputsGoHere={data:{"unspent":[]}, status:"success"};


    theSendAddress= sendAddr;

    theUserAddress = toAddr;

    running =true;
   
    inputs2 = walletData;

    var r = inputs2;

     var whichNum = 0;

   

    try{
    txId = r.txs[whichNum]['hash'];
}
catch(err){
          toastMsg("Error", "Could not generate Transaction. Your balance is zero.", "danger")
          return;
}
    var newArr = [];

   
    for(pos in r.txs){
      pos = parseInt(pos);
      whichNum  = pos;

      for(i in r.txs[pos]['out']){
        console.log(r.txs[whichNum]['out'][i]['addr'])

        if(typeof r.txs[whichNum]['out'][i]['addr'] !="string"){
          continue;
        }
        if(r.txs[whichNum]['out'][i]['addr'].toLowerCase() == theSendAddress.toLowerCase() ){

          console.log('got inputs')
          console.log(theSendAddress.toLowerCase());
          console.log(parseFloat(r.txs[whichNum]['out'][i]['value'])/100000000)
          r.txs[whichNum]['out'][i]['addr']
          txId = r.txs[pos]['hash'];

          console.log('\n\n');
          if(r.txs[whichNum]['out'][i]['spent'] == false){
             newArr.push({'tx': txId, 'script':r.txs[whichNum]['out'][i]['script'], amount: parseFloat(r.txs[whichNum]['out'][i]['value'])/100000000, 'n':r.txs[whichNum]['out'][i]['n'], "confirmations":0})
          }
        }
      }

    }


    inputs = newArr;
    balance = parseFloat(r.final_balance)/100000000;
    




    data1 = {};


     answer = genTrans(inputs, sendAddr, sendKey, toAddr, amount, balance, data1)[0];

     return answer;

}







function genTrans(inputs, sendAddr, sendKey, toAddr, amount, balance, data2, fee){

    console.log("genTransing")
privatekey=sendKey;
//balance = 0;
/*
    for(i in inputs){
            balance += parseFloat(inputs[i].amount);
    }
            

            */

            balance = parseFloat(balance);      

            
    

            minfee = .000055;
            maxfee =.000055;
            amount= parseFloat(amount);


            if(amount >= balance && amount < (balance + .003) ){
                
                amount = balance - minfee;

            }

            if(amount >= balance+minfee){
                
                amount = amount - minfee - .0001;

            }


            numInputs = inputs.length;
            if(numInputs ==1){
                numInputs=2;
            }

            if(numInputs >3){
                minfee = .00075;
                maxfee =.00075;
            }

            

            numInputs2 = Math.round(parseInt(numInputs/2));
            bitMore = numInputs2 * .00004;

            //minfee = (numInputs2/10000)+ bitMore;
            //maxfee = (numInputs2/10000)+ bitMore;


            if(balance > 0){
                amount = parseFloat(amount);
                //var amount = amount - .0001;

                //amount = amount - minfee;
                
                
                var decode = coinjs.addressDecode(toAddr);
                if(!decode || (decode.version != coinjs.pub && decode.version != coinjs.multisig)){
                    console.log('You entered an invalid address to send to','#sendto');
                    return false;
                }
                
               
                
                    change = sendAddr;
                    decode = coinjs.addressDecode(change);
                    if(!decode || (decode.version != coinjs.pub && decode.version != coinjs.multisig)){
                        console.log('You entered an invalid change address','#change');
                        return false;
                    }
                
                
                inputs.sort(function(x, y){ 
                    if (y.amount < x.amount) {
                        return -1;
                    }
                    if (y.amount > x.amount) {
                        return 1;
                    }
                    return 0;
                });
                
                var a = 0;
                coinjs.compressed = true;
                 tx = coinjs.transaction();
                 tx2 = coinjs.transaction();
                

                $.each(inputs, function(i,v){
                    if(a < (amount + maxfee)){
                        tx.addinput(v.tx, v.n, v.script);
                        tx2.addinput(v.tx, v.n, v.script);
                        a += v.amount;
                    }
                });
                
                tx.addoutput(toAddr, amount);
                //newchange = balance - amount-minfee;
                tx2.addoutput(change, a - maxfee);

                if(typeof data2 == "string"){
                    tx.adddata(data2);
                    tx2.adddata(data2);
                }
                
                
                changeamt = a - amount - minfee;
                if(changeamt > 0){
                    tx.addoutput(change, changeamt);
                }
                
                var txunspent1 = tx.deserialize(tx.serialize()); 
                var txunspent2 = tx.deserialize(tx.serialize()); 
                response = [tx.serialize(),txunspent2.sign(sendKey)]
                // then sign
                return(response );
                //$('#tx2 textarea').val(txunspent2.sign(privatekey));
               // $('#tx1, #tx2').show();
            }else{
                toastMsg("Error", "Could not generate Transaction. Your balance is zero.", "danger")
            }
            return false;
        
}
