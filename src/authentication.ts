import { Request, Response, NextFunction} from 'express';

const OktaJwtVerifier = require('@okta/jwt-verifier');

//enregistrement des parametres d'authentification

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oa3t5666c0Mpuh8p5d7',
  issuer: 'https://dev-4283063.okta.com/oauth2/default'
});

export async function oktaAuth(req:Request, res:Response, next:NextFunction) {
  try {
    const token = (req as any).token;
    if (!token) {
      return res.status(401).send('Vous n/êtes pas autorisé');
    }
    const jwt = await oktaJwtVerifier.verifyAccessToken(token, 'api://default');
    // Identifiants utilisateur
    req.user = {
      uid: jwt.claims.uid,
      email: jwt.claims.sub
    };
    next();
  }
  catch (err) {
    return res.status(401).send(err.message);
  }
}