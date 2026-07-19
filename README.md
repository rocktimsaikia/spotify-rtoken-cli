# spotify-rtoken-cli

![CI](https://github.com/rocktimsaikia/spotify-rtoken-cli/actions/workflows/ci.yml/badge.svg)
![npm](https://badgen.net/npm/v/spotify-rtoken-cli)

Generate a Spotify refresh_token right from the terminal

![spotify-rtoken](./spotify-rtoken.svg)

## Installation

Requires Node.js 20 or later.

```sh
npm install --global spotify-rtoken-cli
```

## Usage

Grab the `client_id`, `client_secret` and `redirect_uri` of your [Spotify app](https://developer.spotify.com/dashboard/applications), then run the CLI and follow the prompts:

```sh
$ spotify-rtoken
```

The CLI opens the Spotify authorization page in your browser. After you approve, Spotify redirects to your `redirect_uri` with a `code` query parameter - copy that code, paste it back into the terminal, and the generated `refresh_token` is copied straight to your clipboard. No credentials are stored locally.

## Options

| Option      | Default | Description                                                             |
| ----------- | ------- | ----------------------------------------------------------------------- |
| `--no-mask` | `false` | Do not hide/mask credentials i.e. `client_id`, `client_secret`, `code`. |

## Related

- [**spotify-mini**](https://github.com/rocktimsaikia/spotify-mini): Fetch your currently playing, recent and top Spotify tracks in Node.js.

## License

MIT 2022-2026 &copy; [Rocktim Saikia](https://rocktim.dev)
