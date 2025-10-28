# SecureFlag TODO App

## Features that were implemented
- Add a task (title required, description optional)
- Edit a task inline
- Reorder tasks drag and drop
- Delete a task
- Mark complete / not complete
- Filter views: All, Active, Completed
- Persist to `localStorage` (no backend)
- Routes:
  - `#!/` → All
  - `#!/active` → Only active
  - `#!/completed` → Only completed
- Keyboard UX:
  - **Enter** to add/save
  - **Esc** to cancel edit
- Validation:
  - You can't save/add without a title. A little red message shows up.
- Tests (Karma/Jasmine):
  - `todoStorage` service (persistence)
  - `MainController` (core behavior)
---

## Project structure
todo-angularjs-legacy/
  package.json
  karma.conf.js
  README.md
  src/
    index.html
    styles.css
    app.js
    controllers/
      mainController.js
      navController.js
    services/
      todoStorage.js
    directives/
      autofocus.js
      todoItem.js
    templates/
      todoList.html
  test/
    todoStorage.spec.js
    mainController.spec.js
```
### 1. Install deps
```bash
npm install
```

### 2. Run the local dev server (with live reload)
```bash
npm run dev
```

---

## Run tests (Karma + Jasmine + ChromeHeadless)

```bash
npm test
```
