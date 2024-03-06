import json

def get_secrets():
    with open("secrets.json") as secrets_file:
        secrets = json.load(secrets_file)
    return secrets