import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET_KEY || 'my-secret-key-my-secret-key';
const ivLength = 16;

function getKey() {
    return crypto.createHash('sha256').update(String(secretKey)).digest('base64').substr(0, 32);
}

export function encryptToken(token: string) {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, getKey(), iv);
    const encrypted = Buffer.concat([cipher.update(token), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptToken(token: string) {
    const [iv, content] = token.split(':');
    const decipher = crypto.createDecipheriv(algorithm, getKey(), Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrypted.toString();
}
