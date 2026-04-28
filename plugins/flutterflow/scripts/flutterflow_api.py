#!/usr/bin/env python
"""
Minimal FlutterFlow Project API helper.

Auth:
  - Set FLUTTERFLOW_API_TOKEN in your environment.

Usage:
  - python scripts/flutterflow_api.py list-projects
  - python scripts/flutterflow_api.py list-files --project-id <project-id>
  - python scripts/flutterflow_api.py export-project --project-id <project-id> --out-dir .\\ff-export
  - python scripts/flutterflow_api.py validate-file --project-id <project-id> --file-key <file-key> --file-path <yaml-file>
  - python scripts/flutterflow_api.py update-file --project-id <project-id> --file-key <file-key> --file-path <yaml-file>
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import sys
import zipfile
from urllib import error, parse, request


DEFAULT_BASE = "https://api.flutterflow.io/v2"


def _require_token() -> str:
    token = os.environ.get("FLUTTERFLOW_API_TOKEN", "").strip()
    if not token:
        raise RuntimeError(
            "Missing FLUTTERFLOW_API_TOKEN. Set it before running this script."
        )
    return token


def _base_url() -> str:
    return os.environ.get("FLUTTERFLOW_API_BASE", DEFAULT_BASE).rstrip("/")


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
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
    }
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


def list_projects(token: str) -> dict:
    body = {
        "project_type": "ALL",
        "deserialize_response": True,
    }
    last_error: Exception | None = None
    for path in ("/listProjects", "/l/listProjects"):
        try:
            return _call_json("POST", path, token=token, body=body)
        except RuntimeError as exc:
            # FlutterFlow deployments differ; try alternate route on 404.
            if "HTTP 404" in str(exc) or "Route not found" in str(exc):
                last_error = exc
                continue
            raise
    assert last_error is not None
    raise last_error


def list_partitioned_file_names(token: str, project_id: str) -> dict:
    return _call_json(
        "GET",
        "/listPartitionedFileNames",
        token=token,
        query={"projectId": project_id},
    )


def export_project_yamls(
    token: str, project_id: str, out_dir: str, file_name: str | None = None
) -> dict:
    query = {"projectId": project_id}
    if file_name:
        query["fileName"] = file_name

    response = _call_json(
        "GET",
        "/projectYamls",
        token=token,
        query=query,
    )
    value = response.get("value", {})
    b64_zip = value.get("projectYamlBytes")
    if not b64_zip:
        raise RuntimeError("No projectYamlBytes returned from /projectYamls.")

    os.makedirs(out_dir, exist_ok=True)
    zip_path = os.path.join(out_dir, "project-yamls.zip")
    with open(zip_path, "wb") as fh:
        fh.write(base64.b64decode(b64_zip))

    extract_dir = os.path.join(out_dir, "project-yamls")
    os.makedirs(extract_dir, exist_ok=True)
    with zipfile.ZipFile(zip_path, "r") as zf:
        zf.extractall(extract_dir)

    return {
        "success": True,
        "zipPath": zip_path,
        "extractedPath": extract_dir,
    }


def validate_project_yaml(
    token: str, project_id: str, file_key: str, file_content: str
) -> dict:
    return _call_json(
        "POST",
        "/validateProjectYaml",
        token=token,
        body={
            "projectId": project_id,
            "fileKey": file_key,
            "fileContent": file_content,
        },
    )


def update_project_yaml(
    token: str, project_id: str, file_key: str, file_content: str
) -> dict:
    return _call_json(
        "POST",
        "/updateProjectByYaml",
        token=token,
        body={
            "projectId": project_id,
            "fileKeyToContent": {file_key: file_content},
        },
    )


def _read_text_input(file_path: str | None, inline: str | None) -> str:
    if file_path:
        with open(file_path, "r", encoding="utf-8") as fh:
            return fh.read()
    if inline is not None:
        return inline
    raise RuntimeError("Provide either --file-path or --file-content.")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="FlutterFlow Project API helper.")
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("list-projects", help="List projects available for this account.")

    files = sub.add_parser(
        "list-files",
        help="List partitioned file names for a specific project.",
    )
    files.add_argument("--project-id", required=True, help="FlutterFlow project ID.")

    export = sub.add_parser(
        "export-project",
        help="Download and extract project YAML files.",
    )
    export.add_argument("--project-id", required=True, help="FlutterFlow project ID.")
    export.add_argument(
        "--out-dir",
        required=True,
        help="Directory where the export ZIP and extracted files are written.",
    )
    export.add_argument(
        "--file-name",
        help="Optional single file name to export (for example: app-state).",
    )

    validate = sub.add_parser(
        "validate-file",
        help="Validate YAML content for a file key before update.",
    )
    validate.add_argument("--project-id", required=True, help="FlutterFlow project ID.")
    validate.add_argument("--file-key", required=True, help="Target file key.")
    validate.add_argument(
        "--file-path",
        help="Local path to YAML content file to validate.",
    )
    validate.add_argument(
        "--file-content",
        help="Inline YAML content string to validate.",
    )

    update = sub.add_parser(
        "update-file",
        help="Update a single FlutterFlow file key with YAML content.",
    )
    update.add_argument("--project-id", required=True, help="FlutterFlow project ID.")
    update.add_argument("--file-key", required=True, help="Target file key.")
    update.add_argument(
        "--file-path",
        help="Local path to YAML content file to update with.",
    )
    update.add_argument(
        "--file-content",
        help="Inline YAML content string to update with.",
    )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        token = _require_token()
        if args.command == "list-projects":
            result = list_projects(token)
        elif args.command == "list-files":
            result = list_partitioned_file_names(token, args.project_id)
        elif args.command == "export-project":
            result = export_project_yamls(
                token, args.project_id, args.out_dir, args.file_name
            )
        elif args.command == "validate-file":
            content = _read_text_input(args.file_path, args.file_content)
            result = validate_project_yaml(
                token, args.project_id, args.file_key, content
            )
        elif args.command == "update-file":
            content = _read_text_input(args.file_path, args.file_content)
            result = update_project_yaml(token, args.project_id, args.file_key, content)
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
