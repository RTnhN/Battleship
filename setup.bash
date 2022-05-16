#!/#!/usr/bin/env bash
npm init -y
npm install --save-dev css-loader eslint eslint-config-airbnb-base eslint-plugin-import html-webpack-plugin prettier style-loader webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/polyfill jest
npm install -g json
json -I -f package.json -e "this.scripts.build=\"webpack\""
json -I -f package.json -e "this.scripts.test=\"jest\""
