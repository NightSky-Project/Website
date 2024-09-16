import * as crypto from 'crypto';
import { Buffer } from 'buffer';

export default class Security {
    publicKey: string = process.env.CRYPTO_KEY_PUBLIC?.replace(/\\n/g, '\n') || '';
    

    constructor() {
        if (!this.publicKey) {
            throw new Error('Public key must be provided');
        }
    }

    encrypt(plaintext: string, padding: number = crypto.constants.RSA_PKCS1_PADDING): string {
        try {
            const buffer = Buffer.from(plaintext, 'utf8');
            const encrypted = crypto.publicEncrypt(
                {
                    key: this.publicKey,
                    padding: padding
                },
                buffer
            );
            return encrypted.toString('base64');
        } catch (e) {
            console.error('Encryption failed: ', e);
            throw new Error('Encryption failed');
        }
    }
}