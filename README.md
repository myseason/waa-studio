# WAA Studio

## Quickstart
```bash
pnpm dev:infra
pnpm setup
pnpm -w dev
```

## Verify (recommended)
Run a full local sanity check:
```bash
pnpm verify
```

## If you still see: "Ignored build scripts: ..."
```bash
pnpm approve-builds
pnpm setup:after-approve
```

## URLs
- Web: http://localhost:3000
- API: http://localhost:4000/health
- MinIO Console: http://localhost:9001
