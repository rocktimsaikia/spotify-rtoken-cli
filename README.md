# spotify-rtoken

![spotify-rtoken](./spotify-rtoken.svg)

> Generate a Spotify `refresh_token` right from terminal

## Highlights

1. Easy to use. You just need to call the CLI and follow the prompt
2. Does not store any credentials locally
3. You are aware of every step that is being executed
4. No need to define scopes, unless you want to manually add scopes

## Prerequisites

Below are the Spotify credentials you will need from your [ Spotify app ](https://developer.spotify.com/dashboard/applications) inorder to generate a `refresh_token` with this CLI app:

1. `client_id`
2. `client_secret`
3. `redirect_uri`

## Installation

```sh
$ npm install --global spotify-rtoken-cli
```

## Usage

```sh
$ spotify-rtoken --help

  Usage
    $ spotify-rtoken

  Options
    --no-mask  Do not hide/mask credentials ie, client_id, client_secret, code.

  Examples
    $ spotify-rtoken
    $ spotify-rtoken --no-mask
```

## License

[ MIT ](./LICENSE) License © 2022 [Rocktim Saikia](https://github.com/rocktimsaikia)
