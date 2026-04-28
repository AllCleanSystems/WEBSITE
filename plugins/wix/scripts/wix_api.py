#!/usr/bin/env python
"""
Minimal Wix API helper.

Auth:
  - Set WIX_API_TOKEN in your environment.

Usage:
  - python scripts/wix_api.py list-sites
  - python scripts/wix_api.py query-data --collection-id <collection-id>
  - python scripts/wix_api.py query-products
  - python scripts/wix_api.py custom --method GET --path /site-properties/v4/properties
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from urllib import error, parse, request


DEFAULT_BASE = "https://www.wixapis.com"


def _require_token() -> str:
    token = os.environ.get("WIX_API_TOKEN", "").strip()
    if not token:
        raise RuntimeError("Missing WIX_API_TOKEN. Set it before running this script.")
    return token


def _base_url() -> str:
    return os.environ.get("WIX_API_BASE", DEFAULT_BASE).rstrip("/")


def _default_headers(token: str) -> dict[str, str]:
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
    }
    site_id = os.environ.get("WIX_SITE_ID", "").strip()
    account_id = os.environ.get("WIX_ACCOUNT_ID", "").strip()
    if site_id:
        headers["wix-site-id"] = site_id
    if account_id:
        headers["wix-account-id"] = account_id
    return headers


def _call_json(
    method: str,
    path: str,
    *,
    token: str,
    query: dict[str, str] | None = None,
    body: dict | None = None,
) -> dict:
    url = f"{_base_url()}/{path.lstrip('/')}"
    if query:
        url = f"{url}?{parse.urlencode(query)}"

    data = None
    headers = _default_headers(token)
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers["Content-Type"] = "application/json"

    req = request.Request(url=url, method=method.upper(), headers=headers, data=data)
    try:
        with request.urlopen(req, timeout=45) as resp:
            payload = resp.read().decode("utf-8")
            return json.loads(payload) if payload else {}
    except error.HTTPError as exc:
        details = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {exc.code} from {url}: {details}") from exc
    except error.URLError as exc:
        raise RuntimeError(f"Request failed for {url}: {exc.reason}") from exc


def list_sites(token: str) -> dict:
    return _call_json("POST", "/site-list/v2/sites/query", token=token, body={})


def query_data_items(token: str, collection_id: str) -> dict:
    return _call_json(
        "POST",
        "/wix-data/v2/items/query",
        token=token,
        body={"dataCollectionId": collection_id, "query": {}},
    )


def query_products(token: str) -> dict:
    return _call_json(
        "POST",
        "/stores-reader/v1/products/query",
        token=token,
        body={"query": {}},
    )


def custom_call(
    token: str,
    method: str,
    path: str,
    query: str | None,
    body_json: str | None,
) -> dict:
    parsed_query = None
    if query:
        parsed_query = dict(parse.parse_qsl(query, keep_blank_values=True))
    parsed_body = None
    if body_json:
        parsed_body = json.loads(body_json)
    return _call_json(method, path, token=token, query=parsed_query, body=parsed_body)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Wix API helper.")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("list-sites", help="List Wix sites available for this account.")

    qd = sub.add_parser("query-data", help="Query items from a Wix CMS collection.")
    qd.add_argument("--collection-id", required=True, help="Wix data collection ID.")

    sub.add_parser("query-products", help="Query products from Wix Stores.")

    custom = sub.add_parser("custom", help="Make a custom Wix API call.")
    custom.add_argument("--method", required=True, help="HTTP method, e.g. GET/POST.")
    custom.add_argument("--path", required=True, help="API path like /site-properties/v4/properties.")
    custom.add_argument(
        "--query",
        help="Optional query string, e.g. key1=value1&key2=value2",
    )
    custom.add_argument(
        "--body-json",
        help="Optional JSON object string for request body.",
    )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        token = _require_token()
        if args.command == "list-sites":
            result = list_sites(token)
        elif args.command == "query-data":
            result = query_data_items(token, args.collection_id)
        elif args.command == "query-products":
            result = query_products(token)
        elif args.command == "custom":
            result = custom_call(
                token,
                args.method,
                args.path,
                args.query,
                args.body_json,
            )
        else:
            parser.error(f"Unsupported command: {args.command}")
            return 2

        print(json.dumps(result, indent=2))
        return 0
    except Exception as exc:  # noqa: BLE001
        print(str(exc), file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
