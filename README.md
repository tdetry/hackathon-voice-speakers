# Hackthon Google Home
Hakathon web-server to enable dialogflow and google action SDK integration for Google Home 



## How Google Action works? 

1. undertand actions and deploy first action 
https://developers.google.com/actions/sdk/

```
curl https://sdk.cloud.google.com | bash
curl -O https://dl.google.com/gactions/updates/bin/linux/amd64/gactions/gactions
chmod +x gactions
./gactions update --action_package ./action.json --project [action project]
```

2. set-up backend
- using REST
https://developers.google.com/actions/reference/rest/conversation-webhook

- using node module
https://developers.google.com/actions/reference/nodejsv2/overview

- serverless 



