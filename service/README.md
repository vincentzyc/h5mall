## Installation

```bash
$ npm install
```

根目录下（与src目录同级） 新建 ormconfig.json 文件，写入数据库信息

```
{
  "type": "mysql",
  "host": "xxx",
  "port": xxx,
  "username": "xxx",
  "password": "xxx",
  "database": "xxx",
  "insecureAuth": true,
  "entities": [
    "dist/**/*.entity{.ts,.js}"
  ],
  "synchronize": false
}
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

  Nest is [MIT licensed](LICENSE).
