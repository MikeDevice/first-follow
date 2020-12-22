# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.0.6] - 2020-12-22
### Fixed
- Fixed `CHANGELOG.md`.

## [4.0.5] - 2020-12-22
### Changed
- Updated `devDependencies`.

## [4.0.4] - 2020-09-19
### Changed
- Updated `devDependencies`.

## [4.0.3] - 2020-07-12
### Changed
- Updated `devDependencies`.

## [4.0.2] - 2020-07-11
### Changed
- Moved the lib source code from `lib/index.js` to `index.js`. Refactored the source code. Improved spell checking. Decreased library size to 390 bytes. [#28](https://github.com/MikeDevice/first-follow/pull/28)

### Removed
- Removed some helpers and `helpers` file. [#28](https://github.com/MikeDevice/first-follow/pull/28)
- Removed unused documentation.
- Removed `.npmignore` file.

## [4.0.1] - 2020-07-05
### Changed
- Updated `devDependencies`.

## [4.0.0] - 2020-05-03
### Changed
- Changed API. Replaced class with function. [#26](https://github.com/MikeDevice/first-follow/pull/26)

### Removed
- Removed `getFirstSets`, `getFollowSets` and `getPredictSets` methods. [#26](https://github.com/MikeDevice/first-follow/pull/26)

## [3.3.0] - 2020-05-02
### Changed
- Changed back internal representation of `firstSets`, `followSets` and `predictSets` by Sets to arrays.
- Updated `devDependencies`.

## [3.2.1] - 2020-03-21
### Fixed
- Fixed script for [Coveralls](https://coveralls.io).

### Changed
- Updated `devDependencies`.

## [3.2.0] - 2020-01-07
### Changed
- Changed internal representation of `firstSets`, `followSets` and `predictSets` by arrays to Sets.

## [3.1.0] - 2020-01-02
### Added
- Added documentation and spell checking.

## [3.0.1] - 2020-01-01
### Added
- Added [Coveralls](https://coveralls.io) integration.

### Changed
- Decreased library size to 762 bytes.

## [3.0.0] - 2020-01-01
### Added
- Added `.editorconfig`.
- Added [lint-staged](https://www.npmjs.com/package/lint-staged).
- Added [Travis CI](https://travis-ci.org) integration.
- Added [Size Limit](https://github.com/ai/size-limit). Library size is 765 bytes.

### Changed
- Changed the [eslint config](https://github.com/eslint/eslint#configuration). Now [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) is used.
- Improved `README.md`.
- Changed library format from `umd` to `commonjs`.
- Updated source code to `ES6`.
- Updated `devDependencies`.

### Removed
- Remove `underscore` dependency.

## [2.0.0] - 2018-04-04
### Changed
- Renamed `getFirstSetHash` method to `getFirstSets`.
- Renamed `getFollowSetHash` method to `getFollowSets`.
- Updated `devDependencies`.

## [1.2.0] - 2017-01-22
### Changed
- `getPredictSets` method returns object instead of array.

## [1.1.0] - 2016-10-13
### Changed
- Changed library format to `umd`.

## [1.0.0] - 2016-10-10


[Unreleased]: https://github.com/MikeDevice/first-follow/compare/v4.0.6...HEAD
[4.0.6]: https://github.com/MikeDevice/first-follow/compare/v4.0.5...v4.0.6
[4.0.5]: https://github.com/MikeDevice/first-follow/compare/v4.0.4...v4.0.5
[4.0.4]: https://github.com/MikeDevice/first-follow/compare/v4.0.3...v4.0.4
[4.0.3]: https://github.com/MikeDevice/first-follow/compare/v4.0.2...v4.0.3
[4.0.2]: https://github.com/MikeDevice/first-follow/compare/v4.0.1...v4.0.2
[4.0.1]: https://github.com/MikeDevice/first-follow/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/MikeDevice/first-follow/compare/v3.3.0...v4.0.0
[3.3.0]: https://github.com/MikeDevice/first-follow/compare/v3.2.1...v3.3.0
[3.2.1]: https://github.com/MikeDevice/first-follow/compare/v3.2.0...v3.2.1
[3.2.0]: https://github.com/MikeDevice/first-follow/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/MikeDevice/first-follow/compare/v3.0.1...v3.1.0
[3.0.1]: https://github.com/MikeDevice/first-follow/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/MikeDevice/first-follow/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/MikeDevice/first-follow/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/MikeDevice/first-follow/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/MikeDevice/first-follow/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/MikeDevice/first-follow/releases/tag/v1.0.0
