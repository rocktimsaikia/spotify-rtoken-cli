import { execFileSync } from 'node:child_process'
import assert from 'node:assert/strict'
import test from 'node:test'

test('--help prints usage', () => {
	const output = execFileSync(process.execPath, ['cli.js', '--help'], {
		encoding: 'utf8',
	})
	assert.match(output, /Usage/)
	assert.match(output, /\$ spotify-rtoken/)
	assert.match(output, /--no-mask/)
})
