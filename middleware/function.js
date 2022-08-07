const encrypt = (data) => {
    let encryptedData = '';
    for (let i in data) {
        // console.log(i);
        if (data.charCodeAt(i) == 32) {
            var b = 126;
        } else {
            var b = data.charCodeAt(i)-1; 
        }
        encryptedData+=String.fromCharCode(b);
    }
    return encryptedData;
}

const decrypt = (data) => {
    let decryptedData = '';
    for (let i in data) {
        if (data.charCodeAt(i) == 126) {
            var b = 32;
        } else {
            var b = data.charCodeAt(i)+1;
        }
        decryptedData+=String.fromCharCode(b);
    }
    return decryptedData;
}

const functions = {
    encrypt, decrypt
}

export default functions;