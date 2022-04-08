#!/usr/bin/env node
import meow from 'meow'

const cli = meow(
  `
  Usage
    $ spotify-rtoken
  
  Options
    --no-mask Don't hide/mask credentials

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
        default: true
      }
    }
  }
)
