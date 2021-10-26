# State-managed polygons workspace

First draft of a workspace for managing multiple project solutions.
## Requirements
To run this project, you’ll need to install [node 14 or greater](https://nodejs.org/en/). The LTS version of Node.js is recommended. 

The dependencies of this project are managed with yarn (see installation guide [here](https://yarnpkg.com/en/)). However you can simply use the node package manager, npm for your dependency management.

## Setting up
+ Clone this project to any folder on your local machine
```bash
git clone https://github.com/temilaj/polygons-workspace <FOLDER_NAME_HERE>
```
+ Navigate into the folder name specified
```bash
cd <FOLDER_NAME_HERE>
```

## Installing Packages
+ with yarn
```bash 
yarn install
```

+ with npm
```bash 
npm install
```

## Environment Variables

Using the `.env.example` file as a guide, add a `.env` . Generate a public access token from [Mapbox](https://account.mapbox.com/access-tokens/)  and assign it to the `REACT_APP_MAPBOX_ACCESS_TOKEN` variable.

## Running the app
Run `yarn start` to intialize and run the webpack development server. Navigate to [http://localhost:3000/](http://localhost:3000).

```bash
 yarn start
```
or
```bash
 npm start
```

## LICENSE

#### [MIT](./License.md) © [Temi Lajumoke](http://temilajumoke.com)