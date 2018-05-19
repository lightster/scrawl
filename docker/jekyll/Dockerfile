FROM ruby:2.4.2-alpine

RUN apk add --no-cache --virtual .build-deps build-base \
  && apk add --no-cache git \
  && gem install github-pages:183 minitest \
  && apk del --no-cache .build-deps

RUN mkdir -p /jekyll/source /jekyll/destination \
  && addgroup -Sg 1000 jekyll \
  && adduser  -Su 1000 -G jekyll jekyll \
  && chown -R jekyll:jekyll /jekyll/

USER jekyll
EXPOSE 4000

WORKDIR /jekyll/source

CMD jekyll serve \
  --host 0.0.0.0 \
  --source /jekyll/source \
  --destination /jekyll/destination
