# Project Instructions & Integrations

## Google Search Console (GSC) Integration
Live Google Search Console access is enabled for this project.

- **Property**: `sc-domain:msmevault.in`
- **Credentials**: `gsc-credentials.json` (root directory, gitignored for security)
- **CLI Helper**: `scripts/gsc_client.py`

### Usage:
- **List verified properties**:
  ```bash
  python3 scripts/gsc_client.py list-sites
  ```
- **Query top pages (clicks, impressions, CTR, position)**:
  ```bash
  python3 scripts/gsc_client.py query --site sc-domain:msmevault.in --dimension page --limit 50
  ```
- **Query search queries/keywords**:
  ```bash
  python3 scripts/gsc_client.py query --site sc-domain:msmevault.in --dimension query --limit 50
  ```
- **Inspect URL index status**:
  ```bash
  python3 scripts/gsc_client.py inspect --site sc-domain:msmevault.in --url https://msmevault.in/guides/udyam-registration
  ```
