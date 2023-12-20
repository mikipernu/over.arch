import httpx
import os

from jose import jwt, jwk
from jose.utils import base64url_decode
from fastapi import HTTPException, Security
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_jwks():
    jwks_url = os.environ["AWS_COGNITO_JWKS"]
    response = httpx.get(jwks_url)
    return response.json()


def decode_verify_jwt(token: str):
    jwks = get_jwks()
    unverified_headers = jwt.get_unverified_header(token)

    rsa_key = {}
    for key in jwks["keys"]:
        if key["kid"] == unverified_headers["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"],
                "alg": "RSA256",
            }

    if rsa_key:
        message, encoded_signature = str(token).rsplit(".", 1)
        decoded_signature = base64url_decode(encoded_signature.encode("utf-8"))

        if not jwk.construct(rsa_key, algorithm="RS256").verify(
            message.encode("utf8"), decoded_signature
        ):
            raise HTTPException(status_code=401, detail="Invalid token signature")

        claims = jwt.get_unverified_claims(token)
        return claims


async def get_current_user(token: str = Security(oauth2_scheme)):
    try:
        decode_verify_jwt(token)
    except jwt.JWTError as e:
        print(e)
        raise HTTPException(
            status_code=403, detail="Could not validate credentials"
        ) from e
