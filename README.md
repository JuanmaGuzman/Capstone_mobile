# React Native + Expo

## Node version
`Expo` does not work with the latest version of `node` so its recommended to
run this application with node `v16.17.0`. An `.nvmrc` file is provided so `nvm
use` can be used to switch versions locally (provided this version has been
installed before hand).

## TODO:
- Configure API implementation (Find decent solution for automatic generation
	with openapi similar to the one in the Web project).
- Figure out a way to handle consumption of REST API. (Are CSRF tokens required
	in web development?!)
- Manage user session (Maybe react-keychain?)
