import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'my-secret-key';

export function verifyToken(token: string): JwtPayload | string {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}
