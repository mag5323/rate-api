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
        "to": "JPY",
        "cash": {
            "buy": "0.25880",
            "sell": "0.26980"
        },
        "spot": {
            "buy": "0.26530",
            "sell": "0.26930"
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
