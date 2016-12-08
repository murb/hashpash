# HashPash

These days it is best practice to have one unique password per site, because whenever you leave a copy of your password somewhere your chances increase of someone getting it who shouldn't get it.

But it is difficult. Especially when you're using different devices. Most solutions rely on a central 'cloud-storage' to store your passwords. HashPash works differently.

HashPash uses the cryptographic power of [scrypt](https://en.wikipedia.org/wiki/Scrypt) to securely mash the name of the site (or whatever *hash* you like) with your own very secret password. HashPash can run offline, even from a local folder when JavaScript is present.

## Relation to the 10k apart

I've been using HashPash for quite a while (first using the not recommended (for this purpose) SHA1 hashing algorithm, then bcrypt and now scrypt) myself, but managed to squeeze it only recently into 10k for the 10k apart contest. I saw it was doable when I discovered [Joey Hewitt](https://github.com/scintill/)'s scrypt implementation in Javascript (the [EMscripten](https://github.com/kripken/emscripten) [script implementation I used before](https://github.com/tonyg/js-scrypt) was minifided still about 100k(!)).

## Node server

A very simple Node server has been added as a fallback to clients not running javascript, just run `node index.js` (only default packages are being used)

## Tested on

* Chrome
* Firefox
* Safari (copying by clicking doesn't work)
* IE10, IE11 & EDGE
* iOS
* lynx (requires the node fallback server)

## Attributions

The script.js is made by Joey Hewitt, based on the work of Intalio Pte, who released their work under the MIT license (see [copyright.md](copyright.md)). I made some very minor tweaks here and there to [save the last few bytes](https://github.com/murb/scrypt).

## Alternatives

The idea is not unique, since 2005 we already have [PwdHash](https://www.pwdhash.com/). HashPash improves on this with its size, encryption method and its ability to run standalone. Recently I also found out about [LessPass](https://lesspass.com/#/). It has better visual design than hashpash and comes with browser plugins. It is not as easy to self-host it, though and it uses SHA256-HMAC, which [may be considered less secure](http://stackoverflow.com/questions/26311686/bcrypt-vs-pbkdf2withhmacsha1)
