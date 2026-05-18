# Purewater Efluentes

Static website. Jekyll theme built with Bootstrap.

## Run locally (Docker — recommended)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
docker compose up
```

Browse to http://localhost:4000. The server watches for file changes and rebuilds automatically.

First run will take a few minutes while Docker pulls the image and installs gems. Subsequent runs are fast because gems are cached in a named volume.

To stop: `Ctrl+C`, then `docker compose down`.

## Run locally (native Ruby)

Requires Ruby 3.0+ and Bundler.

```bash
bundle install
bundle exec jekyll serve --watch --drafts
```

## Deploy

Push to `master` — GitHub Pages builds and deploys automatically.

## SEO uplift tasks

See `uplift/seo-audit.md` for the ongoing list of SEO and marketing improvements.
