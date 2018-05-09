# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-scrawl"
  spec.version       = "0.1.3"
  spec.authors       = ["Matt Light"]
  spec.email         = ["matt.light@lightdatasys.com"]

  spec.summary       = "Jekyll theme for written"
  spec.homepage      = "https://github.com/lightster/scrawl"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md)|$)))}i)
  end

  # force included by GitHub Pages
  spec.add_runtime_dependency "jekyll", "~> 3.7"
  spec.add_runtime_dependency 'jekyll-coffeescript', '~> 1.1.1'
  spec.add_runtime_dependency 'jekyll-gist', '~> 1.5.0'
  spec.add_runtime_dependency 'jekyll-github-metadata', '~> 2.9'
  spec.add_runtime_dependency 'jekyll-paginate', '~> 1.1.0'
  spec.add_runtime_dependency 'jekyll-relative-links', '~> 0.5.3'
  spec.add_runtime_dependency 'jekyll-optional-front-matter', '~> 0.3.0'
  spec.add_runtime_dependency 'jekyll-readme-index', '~> 0.2.0'
  spec.add_runtime_dependency 'jekyll-default-layout', '~> 0.1.4'
  spec.add_runtime_dependency 'jekyll-titles-from-headings', '~> 0.5.1'
  # required by {% seo %} tag
  spec.add_runtime_dependency 'jekyll-seo-tag', '~> 2.0'
end
