# notification-app-back

Notification app Test: an application to send notifications to all subscribers based on category and create a notificationLog.

## Stack

Node
Typescript
Express
Mongodb
SQLite

Install exact node dependencies:

```bash
npm install
```

Run preversion to format with prettier, chek lint, and run all test:

```bash
npm run preversion
```

Run all tests:

```bash
npm test
```

Run dev test with nodemon

```bash
npm run test:dev
```

Build the app for production:

```bash
npm run build
```

Start server:

```bash
npm start
```

## API

Host:
Open [http://localhost:8000](http://localhost:8000) with your browser.

Send a message to api service

```code
{
    url: 'http://localhost:8000/api/v1/notification',
    method: 'POST',
    ContentType: 'application/json'
    body: {
        category: string
        message: string
    }
}
```

Get one or many message from api service

```code
{
    url: 'http://localhost:8000/api/v1/notifications/?category=Sports',
    method: 'GET',
    contentType: 'application/json'
    query: {
        category: string
        type: string
    }
}
```
