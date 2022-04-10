#!/usr/bin/env node
import chalk from 'chalk'
import clipboard from 'clipboardy'
import inquirer from 'inquirer'
import meow from 'meow'
import fetch from 'node-fetch'
import { log } from 'node:console'
import { stringify } from 'node:querystring'
import open from 'open'
import ora from 'ora'

const cli = meow(
	`
  Usage
    $ spotify-rtoken
  
  Options
    --no-mask  Don't hide/mask credentials

  Examples
    $ spotify-rtoken
    $ spotify-rtoken --no-mask
  `,
	{
		importMeta: import.meta,
		booleanDefault: undefined,
		flags: {
			mask: {
				type: 'boolean',
				default: true,
			},
		},
	}
)

const modifyOnlyScopes = [
	'ugc-image-upload',
	'user-modify-playback-state',
	'user-follow-modify',
	'playlist-modify-public',
	'playlist-modify-private',
	'app-remote-control',
	'streaming',
	'user-library-modify',
	'user-library-read',
]

const readOnlyScopes = [
	'user-read-playback-state',
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-read-playback-position',
	'user-top-read',
	'playlist-read-collaborative',
	'playlist-read-private',
	'user-read-email',
	'user-read-private',
	'user-follow-read',
]

const formatAuthUrl = ({ clientId, redirectUri, scopes }) => {
	const query = stringify({
		client_id: clientId,
		redirect_uri: redirectUri,
		redirect_uri: redirectUri,
		redirect_uri: redirectUri,
		scope: scopes.join(','),
	})
	const callbackUrl = `https://accounts.spotify.com/authorize?${query}&response_type=code`
	return callbackUrl
}

const getRefreshToken = async ({ clientId, clientSecret, redirectUri, callbackCode }) => {
	const encodedAuthToken = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
	const params = stringify({
		grant_type: 'authorization_code',
		code: callbackCode,
		redirect_uri: redirectUri,
	})
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${encodedAuthToken}`,
			'Content-type': 'application/x-www-form-urlencoded',
		},
		body: params,
	})
	const { refresh_token } = await response.json()
	return refresh_token
}

const commaToArray = (string) => string.split(',').map((str) => str.trim())

const determineMasks = cli.flags.mask && { type: 'password', mask: '*' }

inquirer
	.prompt([
		{
			name: 'clientId',
			message: 'Add client_id:',
			...determineMasks,
		},
		{
			name: 'clientSecret',
			message: 'Add client_secret:',
			...determineMasks,
		},
		{
			name: 'redirectUri',
			message: 'Add redirect_uri:',
		},
		{
			name: 'scopes',
			message: 'Add scopes:',
			type: 'list',
			choices: [
				{
					name: 'read-only scopes (recommended)',
					value: readOnlyScopes,
					short: readOnlyScopes,
				},
				{
					name: 'all scopes (be careful)',
					value: [...readOnlyScopes, ...modifyOnlyScopes],
					short: [...readOnlyScopes, ...modifyOnlyScopes],
				},
				{
					name: 'I will add scopes myself',
					value: 'custom',
				},
			],
		},
		{
			name: 'customScope',
			message: 'Add your needed scopes (comma separated):',
			when: (answers) => answers.scopes === 'custom',
		},
		{
			name: 'callbackCode',
			message: 'Copy and paste the code from the redirect URL:',
			...determineMasks,
			when: async (answers) => {
				const { clientId, redirectUri, scopes, customScope } = answers
				const callbackUrl = formatAuthUrl({
					clientId,
					redirectUri,
					scopes: Array.isArray(scopes) ? scopes : commaToArray(customScope),
				})
				await open(callbackUrl)
				return true
			},
		},
	])
	.then(async (answers) => {
		const spinner = ora({ text: 'Fetching refresh_token...', color: 'green' })
		spinner.start()
		const { clientId, clientSecret, redirectUri, callbackCode } = answers
		const refreshToken = await getRefreshToken({
			clientId,
			clientSecret,
			redirectUri,
			callbackCode,
		})
		clipboard.writeSync(refreshToken)
		spinner.succeed(chalk.green('refresh_token has been copied to the clipboard'))
	})
	.catch((error) => {
		if (error.isTtyError) {
			log(chalk.red("Prompt couldn't be rendered in the current environment"))
		} else {
			log(chalk.red('Something went wrong.\n'), error)
		}
	})
