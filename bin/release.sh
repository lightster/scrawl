#!/bin/sh
# Copied from
# https://github.com/pages-themes/primer/blob/188d405c39f6edbceed04813932517fc61e16cb5/script/release
# Tag and push a release.

set -e

# Make sure we're in the project root.

cd $(dirname "$0")/..

# Make sure the darn thing works

bundle update

# Build a new gem archive.

rm -rf jekyll-theme-*.gem
gem build -q jekyll-theme-*.gemspec

# Make sure we're on the master branch.

(git branch | grep -q 'master') || {
  echo "Only release from the master branch."
  exit 1
}

# Figure out what version we're releasing.

tag=v`ls jekyll-theme-*.gem | sed 's/^jekyll-theme-.*-\(.*\)\.gem$/\1/'`

# Make sure we haven't released this version before.

git fetch -t origin

(git tag -l | grep -q "$tag") && {
  echo "Whoops, there's already a '${tag}' tag."
  exit 1
}

# Tag it and bag it.
gem push jekyll-theme-*.gem
git tag "$tag"
git push origin master
git push origin "$tag"
