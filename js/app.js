
/*********************************  CLAVES KEYS *******************************/
//Hashear nuestras keys (encriptar)
const privada = '745b5e34dc8dbfd68ba1bb8d9ee5511b38b356aa';
const publica = '519eb1362038e44871da07e7549b508b';
const timestamp = Date.now();

const hash = md5(timestamp + privada + publica);
console.log(hash)