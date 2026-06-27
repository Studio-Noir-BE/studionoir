# Boilerplate
Boilerplate is the starting template used at [Studio Noir](https://studionoir.be). The Boilerplate uses:

- The latest [Craft CMS](https://craftcms.com) v5
- [Vite js](https://vitejs.dev) as buildchain
- [Tailwind css](https://tailwindcss.com) as front-end tooling
- [DDEV](https://ddev.com/]) for local development environment

## Installation
1. Clone this repo
```bash
git clone git@github.com:Studio-Noir-BE/boilerplate.git projectName
```
2. Navigate to the new repo and run the make file, this will install everything you need
```bash
cd projectName && make craft
```


### Usage

#### DDEV
Config the server with the **config.yaml** file located @ **.ddev/config.yaml**. This file sould be include in the git repo so every developer can replicate the server configuration.

#### Vite
The **./vite.config.js** file is used to build everything. Some parts are left out since they only increase the **npm run watch** time. Enable them only when you want to run a build for production.

### Tailwind and front-end tooling
Start by setting all the default colors/sizes in **./tailwind.config.js**. This sould generate a good starting point, from there use tailwind and the scss files to style you're website.

### Node version
Build with Node: v16 (should work with v18 to)
