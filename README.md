# Tes Code

## Instalation

Clone github repository

```bash
git clone https://github.com/michaeldavidvinc1/tes-code-jasamedika.git
```

## Install package

Install composer

```bash
composer install
```

Install node package

```bash
npm install
```

Copy and paste .env.example, change name to .env and generate key 

```bash
php artisan key:generate
```

Setting database and migrate

```bash
php artisan migrate:fresh --seed
```

Run project

```bash
php artisan serve
npm run dev
```