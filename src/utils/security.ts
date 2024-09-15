import * as crypto from 'crypto';

export default class Security {
    encoding: BufferEncoding = 'hex';
    publicKey: string = process.env.CRYPTO_KEY_PUBLIC || '';

    constructor() {
        if (!this.publicKey) {
            throw new Error('Public key must be provided');
        }
    }

    encrypt(plaintext: string): string {
        try {
            const buffer = Buffer.from(plaintext, 'utf-8');
            const encrypted = crypto.publicEncrypt(this.publicKey, buffer);
            return encrypted.toString('base64');
        } catch (e) {
            console.error(e);
            throw new Error('Encryption failed');
        }
    }
}