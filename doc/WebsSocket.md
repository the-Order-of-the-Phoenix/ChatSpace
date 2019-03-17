# Protocol

## Actions

### connect

```json
{
    action: "connect",
    body: {
        session: "xxxxxx", // session id (now is base64 encoded userId
    }
}
```



### message

```json
{
    action: "message",
    body: {
        content: "hello world", // message content
        sender: "00000000", // sender user id
        receiver: "0000000", // receiver user id
        friend: "0000000", // via friend
        session: "xxxxxxx"
    }
}
```

### picture

```json
{
    action: "picture",
    body: {
        content: "dsfjasdlfsdka", // base64 encoded image
        session: "xxxxxxxx"
    }
}
```

