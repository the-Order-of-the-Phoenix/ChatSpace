# Data Structure

## User

| Field         | Type     | Restrict              | Example |
| ------------- | -------- | --------------------- | ------- |
| _id           | ObjectId | unique, indexed       |         |
| username      | String   | unique, indexed       |         |
| password      | String   | 6-12位                |         |
| name          | String   | 4-32位, indexed       |         |
| nickname      | String   | 4-128位, indexed      |         |
| phone         | String   | 11位, indexed         |         |
| email         | String   | email format, indexed |         |
| gender        | int      | 0\|1                  |         |
| birthday      | date     |                       |         |
| avator        | String   | path                  |         |
| city          | String   | 城市名                |         |
| friends       | String   | foreign               |         |
| last_modified | date     |                       |         |
| last_login    | date     |                       |         |
| created_at    | date     |                       |         |

## Message

| Field      | Type     | Restrict                      | Example |
| ---------- | -------- | ----------------------------- | ------- |
| _id        | ObjectId | unique, indexed               |         |
| sender     | ObjectId | unique, indexed               |         |
| receiver   | ObjectId | unique, indexed               |         |
| type       | String   | text\|pic\|file\|audio\|video |         |
| content    | String   |                               |         |
| path       | String   |                               |         |
| created_at | date     | indexed                       |         |
|            |          |                               |         |

## Friends

| Field        | Type     | Restrict        | Example |
| ------------ | -------- | --------------- | ------- |
| _id          | ObjectId | unique, indexed |         |
| member       | ObjectId |                 |         |
| created_at   | date     |                 |         |
| requesting   | ObjectId |                 |         |

## Files

| Field      | Type     | Restrict        | Example |
| ---------- | -------- | --------------- | ------- |
| _id        | ObjectId | unique, indexed |         |
| path       | String   |                 |         |
| expired_at | date     |                 |         |

