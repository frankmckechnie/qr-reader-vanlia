# Franks simple webpack template for all de projects #

Very simple webpack folder that can be used for small projects. Has a produciton and dev webpack file. 

To clone this repo fork it or do a 

    git clone --bare https://github.com/frankmckechnie/base-webpack.git

  ## Commands ##

 - `npm run lint` check all code against eslint
 - `npm run dev` runs webpack, creates reloadable server
 - `npm run build` removes all files that are not needed in dist folder for prod
 - `npm run test` will rull any unit tests that are stored in the text folder

## Fix linting issues ##

 - `node node_modules\eslint\bin\eslint.js src\js\utils.js --fix`
 - ` npm run lint ----fix `