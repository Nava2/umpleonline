# UmpleOnline
[![Build Status](https://travis-ci.org/Nava2/umpleonline.svg?branch=master)](https://travis-ci.org/Nava2/umpleonline)

This is a rewrite of the original UmpleOnline application written many moons ago by the Umple Developers. This is meant to be a moderinzation and feature improvement over the original. 

## Building

The application has been tested and built on Mac OS X and Linux through CI. It has been run and built on Windows, but is not tested via CI. 

### Prerequisites

This is a node.js application, thus it is required. It also utilizes [SASS](http://sass-lang.com/) which requires Ruby. Download and install the following: 

* [node.js 4.2/5.x+](https://nodejs.org/en/download/stable/)
* [Ruby](https://www.ruby-lang.org/en/downloads/)

### Build Instructions

1. Install [nodejs 5.x+](https://nodejs.org/en/download/stable/)
2. Install Sass: `gem install sass`
3. Install TypeScript, tsd, and grunt-cli: `npm install tsd grunt-cli -g`
4. Clone source code: `git clone git@github.com:Nava2/umpleonline.git`
5. Install npm components: `npm install`
6. Run tsd: `tsd install`
7. Run `grunt`
