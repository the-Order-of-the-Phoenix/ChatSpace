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
        friend: "0000000", // via friend
        session: "xxxxxxx",
        friend: "xxxxxx", // friend id
        created_at: "2018-01-01" // only needed in communication from server to client
    }
}
```

### picture

```json
{
    action: "picture",
    body: {
        content: "dsfjasdlfsdka", // base64 encoded image
        session: "xxxxxxxx",
        receiver: "000000",
        sender: "xxxxxx",
        friend: "xxxxxxx"
    }
}
```

