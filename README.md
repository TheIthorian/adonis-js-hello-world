## Example Project With AdonisJS

This is a sample project using AdonisJS.

### How to run

1. Clone this repository 

```bash
git clone https://github.com/TheIthorian/adonis-js-hello-world.git
```

2. Start api

```bash
cd api
npm run build
```

3. Copy `.env` to `build/.env`. Add database info

4. Run migrations

```bash
cd build && node ace migration:run
npm start
```

5. Start ui

```bash
cd ui
npm run build && npm start
```

6. Open `http://localhost:3000` in your browser
