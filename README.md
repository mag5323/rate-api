# rate-api
An Node.js application that can get current exchange rate from Taiwan bank.

# How to use

## Starting
Using `node app.js` command to start the application.

## API usage
Getting URL like this: `http://yourhost/JPY` or replace **JPY** with whatever you want.

And you will get response with json type like this:
```javascript
{
    "rate": {
        "state": "ok",
        "msg": "success",
        "rate": {
            "to": "USD",
            "cash": {
                "buy": "31.15000",
                "sell": "31.69200"
            },
            "spot": {
                "buy": "31.45000",
                "sell": "31.55000"
            }
        }
    }
}
```

## Available currencies
- USD
- HKD
- GBP
- AUD
- CAD
- SGD
- CHF
- JPY
- ZAR
- SEK
- NZD
- THB
- PHP
- IDR
- EUR
- KRW
- VND
- MYR
- CNY

# Where can I deploy?

[heroku](https://www.heroku.com/) is your best friend.
It provides **300 Mb** transfer quota for free!
