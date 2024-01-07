import type { NextApiRequest, NextApiResponse } from 'next';
import { Credentials, OAuth2Client } from 'google-auth-library';

type Data = {
  tokens?: Credentials;
  message?: string;
};

const oAuth2Client = new OAuth2Client(
  process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_KEY,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage',
);

//wymaga code - zwraca access_token i pozostałe
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET')
  {
    const code = req.query.code as string;
    if (!code) return res.status(400).json({ message: 'Bad request' });

    const { tokens } = await oAuth2Client.getToken(code);
    return res.status(200).json({tokens});
  } 
  else 
  {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}