# Публикация OBSIDIAN-6 на GitHub

> **Обновление 21.11.2026:** начиная с Home Assistant 2026.11, HACS встроен в систему под названием **Магазин (Marketplace)**. Новая установка: Настройки → Магазин → Добавить по ссылке → `https://github.com/Antarikfox/obsidian-6-card`. Для версий до 2026.11 действует инструкция HACS ниже.

> Релиз `v7.6.0` выпускается автоматически workflow `.github/workflows/publish-release.yml` после прохождения `npm test`. Для проверки репозитория по правилам HACS включён `.github/workflows/hacs-validation.yml`. Добавь в GitHub Topics хотя бы `home-assistant`, `hacs`, `nixie-clock`, `custom-card`: без тем строгая проверка HACS не пройдёт.

## 1. Создать пустой репозиторий

1. Открой [github.com/new](https://github.com/new) под своим аккаунтом.
2. В поле **Repository name** введи `obsidian-6-card`.
3. В поле **Description** вставь: `OBSIDIAN-6 | Biomechanical Nixie clock for Home Assistant and browsers. By Antarikfox.`
4. Выбери **Public** (для пользовательского репозитория HACS нужен публичный доступ).
5. **Не ставь галочки** Add a README file, Add .gitignore и Choose a license: эти файлы уже подготовлены или лицензия пока не выбрана.
6. Нажми **Create repository**.

## 2. Загрузить подготовленные файлы через браузер

1. Распакуй поставку на ПК. Открой внутреннюю папку `obsidian-6-card`.
2. В новом пустом репозитории выбери **uploading an existing file**, либо **Add file → Upload files**.
3. Перетащи **содержимое** папки `obsidian-6-card` целиком, а не сам внешний ZIP и не папку-обёртку. Нужны корневые `README.md`, `README.ru.md`, `hacs.json`, `package.json`, папки `dist`, `assets`, `docs`, `src`, `scripts`, `standalone` и **скрытая** `.github`.
4. Убедись, что на странице загрузки видны пути вроде `dist/obsidian-6-card.js` и `docs/preview.webp`, а не `obsidian-6-card/dist/...`.
5. Commit message: `Initial release: OBSIDIAN-6 v7.6.0`. Нажми **Commit changes**.

После загрузки GitHub покажет фото часов **перед заголовком** README: строка `![...](docs/preview.webp)` находится первой в `README.md`. Файл изображения должен находиться по пути `docs/preview.webp`.

## 3. Фотография при распространении ссылки

GitHub: **Settings → General → Social preview → Edit → Upload an image**. Выбери `docs/social-preview.jpg` из локального комплекта (1280×640, менее 1 МБ). Это отдельная обложка для соцсетей и мессенджеров, а не фотография внутри README.

## 4. Релиз v7.6.0 опубликован

Релиз [OBSIDIAN-6 v7.6.0](https://github.com/Antarikfox/obsidian-6-card/releases/tag/v7.6.0) выпущен с тегом `v7.6.0`; внутри находится самодостаточный модуль `obsidian-6-card.js`.

Действующий workflow `.github/workflows/publish-release.yml` запускается при первом добавлении файла либо вручную через Actions → Publish OBSIDIAN-6 v7.6.0 → Run workflow. Он проверяет `npm test` и публикует JS-модуль. Повторный запуск не создаёт дубликата релиза. Для следующей версии потребуется обновить номер версии в `package.json`, релизных заметках и workflow.

**Проверка HACS для включения в общий каталог:** настрой Topics через значок шестерёнки в About репозитория. Укажи `home-assistant`, `hacs`, `nixie-clock`, `custom-card`. Также HACS требует лицензию, одобренную Open Source Initiative. Пока автор не определил лицензию для исходников и отдельно права на иллюстрации, её намеренно нет, а строгая проверка HACS показывает ошибку. Не выдавай права на графику случайно.

## 5. Проверить HACS

В Home Assistant открой **HACS → ⋮ → Custom repositories**. Вставь URL нового публичного GitHub-репозитория, выбери тип **Dashboard** и нажми **Add**. Установи карточку. Файл `dist/obsidian-6-card.js` и `hacs.json` уже подготовлены для этого варианта. Затем добавь карточку в панель, как описано в `README.ru.md`.

## 6. Проверка исходников (необязательно)

На ПК с Node.js 22, в каталоге проекта:

```sh
npm test
```

Если меняешь исходники, перед загрузкой собери заново:

```sh
npm run build
npm test
```

Исходная поставка v7.6.0 прошла `npm test`: четыре теста без ошибок. Публикация в стандартном каталоге HACS требует отдельной процедуры и не выполняется автоматически.

## 7. Авторские права

В поставку намеренно не добавлена открытая лицензия. Прежде чем разрешать копирование и модификацию кода или авторской графики, выбери подходящие условия. Публичный репозиторий сам по себе не равен разрешению на свободное использование материалов.

Ссылки: [GitHub Upload files](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository) · [Social preview](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview) · [HACS custom repositories](https://hacs.dev/docs/faq/custom_repositories/) · [HACS Dashboard plugins](https://hacs.dev/docs/publish/plugin/).
