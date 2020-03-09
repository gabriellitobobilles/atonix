# Asset360

Generally follows the [NGRX example application](https://github.com/ngrx/example-app) pattern because it had a nice separation into modules which can later be more easily moved into other directories / libraries. It is also the suggested ngrx architecture by Duncan Hunter and Deborah Kurota on pluralsight, and we get a nice separation of presentational components (think views from WPF's MVVM) and containers, which hold logic and observables. The ngrx sample app label these Components/Containers, which is a nod to what they've been called that in React/Redux for a couple years. It may be we want to name these folders presentational/container to be more explicit.

## Recommended Extensions

- Angular Essentials by John Papa
- Markdown Preview - Allows you to view README files like this with images and proper formatting! Install this extension and open this README file in VS Code, use `ctrl-k v` or right click inside the file and choose `markdown preview enhanced`. You should see a much prettier HTML Readme appear.

## Recommended user settings

Right click on the user settings gear in the bottom left hand corner of the screen, and set these values

```json
    "prettier.tslintIntegration": true,
    "window.titleBarStyle":"custom",
```

## Installing

- You will need the Angular cli available globally, so install it with -g as shown below. From the Atonix.Web.Sites directory run the npm install command.

```node
  npm install -g @angular/cli
  npm install -g @nrwl/schematics
  npm install
  npm run start:local
  npm run test
```

You may want to keep things updated as well. To get a list of what is out of date:

```node
  npm update -g
```

Sometimes you might want to upgrade to a specific version as well:

```node
  npm install @angular/cli@6.2.5
```

- Your backend will be Visual Studio running BV.PowerPlantMD.WebApiServices which you'll probably want to run side by side with VS Code.
- Your Angular port will be 4200. This will can run side by side with our AngularJS project which uses port 8080.

## Running

- See the package.json for the list of scripts.

```powershell
ng config defaultProject workflow-editor
ng config defaultProject asset360
```

then to run with the Visual Studio Asp.Net backend:

```powershell
npm run start:local
```

to run with sii.dev backend:

```powershell
npm run start
```

- If you're not sure where to start try here: `npm run start-workfloweditor-local`

## Linting

- `npm run lint` will run with the rules found in tslint.json
- lint should pass

## Create a new Library

`ng g lib AssetTree --prefix=atx --unit-test-runner=jest`

## Tests
##test3
- `npm run test:coverage` will run test coverage. Look at the console output, and check this html file for a visual look at your test coverage: Atonix.Web.Sites/coverage/index.html
- `npm run test:snapshot` will update all snapshots in the tests. If you are running this command be sure that failing snapshots are the right one now
- `npm run test:watch watch` jest tests
- `npm run test:reset-cache` can be useful if you change configuration settings and need to re-run.

## Debugging

- Use the following launch.json scripts. In VS Code click on the debugging icon, and selecting add configuration will open launch.json for you.
- The json below assumes you've opened the Atonix.Web.Sites folder as your workSpaceFolder in VS Code. If you opened Current Sprint, you'll want to add `\\Atonix.Web.Sites\\` to the `${workspaceFolder}` path below:

```json
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceFolder}\\apps\\workflow-editor"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Test",
      "program": "${workspaceFolder}\\node_modules\\jest\\bin\\jest",
      "args": ["--runInBand", "--config=${workspaceFolder}\\jest.config.js"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
```
