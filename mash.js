nil=function(){
  var dfe = document.forms[0].elements
  var mashIt = function() {
    Crypto_scrypt(
      dfe["hash"].value,
      dfe["pass"].value,
      32, 8, 1, 64, function(result){
        mash = String.fromCharCode.apply(null, result).replace(/[^\x20-\x70]/g, "");
    		dfe["mash"].value = mash
        if (dfe["pass"].value != "") dfe["mash"].select();
        pf = function(e){
          dfe["mash"].select();
          document.execCommand("Copy");
          setTimeout(function(e){
            dfe["mash"].select();
            dfe["mash"].selectionStart=0;
            dfe["mash"].selectionEnd=mash.length;
            document.execCommand("Copy");
          },60)
        };
        dfe["mash"].onclick = pf;
        dfe["mash"].ontouchend = pf;
      }
    );
  }
  dfe["submit"].style.display = 'none';
  dfe["hash"].onchange = mashIt;
  dfe["pass"].onchange = mashIt;
}()