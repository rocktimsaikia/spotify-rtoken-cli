# spotify-rtoken-cli

> Generate a Spotify `refresh_token` right from terminal

![spotify-rtoken](./spotify-rtoken.svg)

> In step 5, you will be redirected to your browser for confirming permissions. Then you will be redirected to the specified `callback_url` with the code. Copy that `code`, paste in the terminal.

> ![partial_blur](https://user-images.githubusercontent.com/33410545/162616418-d5d907cb-cb6f-4712-875c-2f1493920cc8.jpg)

## Highlights

1. Easy to use. You just need to call the CLI and follow the prompt
2. Does not store any credentials locally
3. Directly copies the `refresh_token` to cliboard :sparkles:
4. You are aware of every step that is being executed
5. No need to define scopes, unless you want to manually add scopes. Recommended option is `read-only` scopes.

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

## Related

- [spotify-mini](https://github.com/rocktimsaikia/spotify-mini) - Simple Spotify client for Nodejs exposing some useful methods

## License

[ MIT ](./LICENSE) License © 2022 [Rocktim Saikia](https://github.com/rocktimsaikia)
