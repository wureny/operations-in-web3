//生成24个助记词
const bip39 = require('bip39');
const crypto_ts = require('crypto');

// 1. 生成 256 位随机熵
const entropy = crypto_ts.randomBytes(32); // 256 位是 32 字节
console.log("entropy: "+entropy)

// 2. 计算校验和 (SHA-256)
const hash = crypto_ts.createHash('sha256').update(entropy).digest();
const checksum = hash[0] >> 8; // 取前 8 位

// 3. 组合熵和校验和
let bits = '';
for (let i = 0; i < entropy.length; i++) {
    //补全为1字节
    bits += entropy[i].toString(2).padStart(8, '0');
}
console.log("bits: "+bits)
//补全为8位
bits += checksum.toString(2).padStart(8, '0');

// 4. 分割为助记词索引
const indices = [];
for (let i = 0; i < bits.length; i += 11) {
    const index = parseInt(bits.slice(i, i + 11), 2);
    indices.push(index);
}

// 5. 映射为助记词
const wordlist = bip39.wordlists.english;
const mnemonic = indices.map(index => wordlist[index]).join(' ');

console.log(mnemonic)
