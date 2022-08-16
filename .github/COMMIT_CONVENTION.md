## Git Commit Message Convention

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).

### Examples

Appears under "Features" header, Commands subheader:

```
feat(Commands): add search command

The search command will allow users to search for gifs on Tenor through the bot.
```

Appears under "Bug Fixes" header, Commands subheader, with a link to issue #28:

```
fix(Commands): pass correct url params to tenor

Closes #28
```

Appears under "Performance Improvements" header, and under "Breaking Changes" with the breaking change explanation:

```
perf(Commands): remove search command

BREAKING CHANGE: The search command has been removed. Users can search for gifs on Tenor on its site.
```

The following commit and commit `667ecc1` do not appear in the changelog if they are under the same release. If not, the revert commit appears under the "Reverts" header.

```
revert: feat(Commands): add search command

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

### Commit Message Format

A commit message consists of a **header**, **body** and **footer**. The header has a **type**, **scope** and **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

If the prefix is `feat`, `fix`, `docs`, `perf` or `refactor`, it will appear in the changelog. However if there is any [BREAKING CHANGE](#footer), the commit will always appear in the changelog.

Prefixes for non-changelog related tasks are `build`, `ci`, `chore`, `style`, `test`, `types` and `wip`.

### Scope

The scope could be anything specifying place of the commit change. For example `Client`,
`Managers`, `SlashCommand`, `Events`, `Buttons`, `Modals`, `Util`, etc...

### Subject

The subject contains succinct description of the change:

-   use the imperative, present tense: "change" not "changed" nor "changes"
-   don't capitalize first letter
-   no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this [document](#commit-message-format).

[npm-image]: https://badge.fury.io/js/conventional-changelog-angular.svg
[npm-url]: https://npmjs.org/package/conventional-changelog-angular
[travis-image]: https://travis-ci.org/conventional-changelog/conventional-changelog-angular.svg?branch=master
[travis-url]: https://travis-ci.org/conventional-changelog/conventional-changelog-angular
[daviddm-image]: https://david-dm.org/conventional-changelog/conventional-changelog-angular.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/conventional-changelog/conventional-changelog-angular
[coveralls-image]: https://coveralls.io/repos/conventional-changelog/conventional-changelog-angular/badge.svg
[coveralls-url]: https://coveralls.io/r/conventional-changelog/conventional-changelog-angular
[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
