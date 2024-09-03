## Для запуска проекта необходимо:
1) Создать папку под проект.
2) Создать подпапку apps.
3) В нее распаковать оба репозитория (api в папку api, front в папку client).
4) В корневой папке создать package.json.
5) {
  "name": "test-app",
  "devDependencies": {
    "turbo": "^2.1.0"
  },
  "scripts": {
    "dev": "turbo run dev"
  },
  "workspaces": [
    "apps/*"
  ],
  "packageManager": "npm@10.8.1",
  "dependencies": {
    "@nestjs/swagger": "^7.4.0",
    "cross-env": "^7.0.3",
    "swagger-ui-express": "^5.0.1"
  }
}
6) Установить пакеты в корневой папке и в папках api и client.
7) Запускать командой npm run dev из корневой папки.
9) !! Для работы необходима PostrgeSQL.
10) Swagger доступен по ссылке http://localhost:7000/api/docs#/


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
