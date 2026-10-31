#!/usr/bin/env python3
"""
Google Search Console API helper script for msmevault.in
"""

import os
import sys
import json
import argparse
from datetime import datetime, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_FILE = os.path.join(os.path.dirname(__file__), "..", "gsc-credentials.json")
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

def get_service():
    if not os.path.exists(KEY_FILE):
        print(f"Error: Credentials file not found at {KEY_FILE}", file=sys.stderr)
        sys.exit(1)
    creds = service_account.Credentials.from_service_account_file(KEY_FILE, scopes=SCOPES)
    return build("searchconsole", "v1", credentials=creds)

def list_sites(service):
    sites = service.sites().list().execute()
    return sites.get("siteEntry", [])

def query_analytics(service, site_url, start_date=None, end_date=None, dimensions=None, row_limit=50):
    if not dimensions:
        dimensions = ["page"]
    if not end_date:
        end_date = (datetime.now() - timedelta(days=3)).strftime("%Y-%m-%d")
    if not start_date:
        start_date = (datetime.now() - timedelta(days=31)).strftime("%Y-%m-%d")

    body = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": dimensions,
        "rowLimit": row_limit,
    }
    return service.searchanalytics().query(siteUrl=site_url, body=body).execute()

def inspect_url(service, site_url, inspection_url):
    body = {
        "inspectionUrl": inspection_url,
        "siteUrl": site_url,
    }
    return service.urlInspection().index().inspect(body=body).execute()

def main():
    parser = argparse.ArgumentParser(description="Query Google Search Console API")
    subparsers = parser.add_subparsers(dest="command")

    subparsers.add_parser("list-sites", help="List sites with verified access")

    query_parser = subparsers.add_parser("query", help="Query search analytics")
    query_parser.add_argument("--site", required=True, help="Site URL or sc-domain:...")
    query_parser.add_argument("--start", help="Start date YYYY-MM-DD")
    query_parser.add_argument("--end", help="End date YYYY-MM-DD")
    query_parser.add_argument("--dimension", default="page", choices=["page", "query", "country", "device", "date"])
    query_parser.add_argument("--limit", type=int, default=25)

    inspect_parser = subparsers.add_parser("inspect", help="Inspect a URL's index status")
    inspect_parser.add_argument("--site", required=True, help="Site URL or sc-domain:...")
    inspect_parser.add_argument("--url", required=True, help="Full URL to inspect")

    args = parser.parse_args()

    service = get_service()

    if args.command == "list-sites":
        sites = list_sites(service)
        print(json.dumps(sites, indent=2))
    elif args.command == "query":
        res = query_analytics(service, args.site, args.start, args.end, [args.dimension], args.limit)
        print(json.dumps(res, indent=2))
    elif args.command == "inspect":
        res = inspect_url(service, args.site, args.url)
        print(json.dumps(res, indent=2))
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
