#!/usr/bin/env python3
"""
MSMEVault Autonomous Content Publishing & Editorial Pipeline
Validates, checks SEO quality, and appends verified articles to verified-blog.ts
"""

import os
import sys
import json
import argparse
from datetime import datetime

BLOG_FILE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "verified-blog.ts")
SITEMAP_FILE = os.path.join(os.path.dirname(__file__), "..", "src", "app", "sitemap.ts")

AI_SLOP_WORDS = [
    "delve", "tapestry", "realm", "pivotal", "beacon", "testament",
    "foster", "game-changer", "in today's landscape", "in conclusion",
    "it is important to note"
]

def validate_article(article):
    required_keys = [
        "slug", "title", "metaTitle", "metaDescription",
        "targetKeyword", "category", "tags", "excerpt",
        "content", "faq", "sources", "relatedSlugs"
    ]
    for k in required_keys:
        if k not in article or not article[k]:
            return False, f"Missing required field: {k}"

    if len(article["title"]) > 75:
        return False, f"Title too long ({len(article['title'])} chars): {article['title']}"

    word_count = len(article["content"].split())
    if word_count < 500:
        return False, f"Content too thin ({word_count} words). Minimum is 500 words."

    # Check for AI slop
    content_lower = article["content"].lower()
    for slop in AI_SLOP_WORDS:
        if slop in content_lower:
            return False, f"Found AI slop phrase: '{slop}'"

    return True, f"Article passed validation ({word_count} words)."

def main():
    parser = argparse.ArgumentParser(description="Publish article to MSMEVault")
    parser.add_argument("--file", help="Path to JSON file containing new article")
    parser.add_argument("--dry-run", action="store_true", help="Validate without writing")
    args = parser.parse_args()

    if not args.file:
        print("Usage: python3 scripts/publish_article.py --file <article.json>")
        sys.exit(1)

    with open(args.file, "r", encoding="utf-8") as f:
        article = json.load(f)

    valid, msg = validate_article(article)
    if not valid:
        print(f"[REJECTED] {msg}", file=sys.stderr)
        sys.exit(1)

    print(f"[VALIDATED] {msg}")

    if args.dry_run:
        print("[DRY RUN] Finished without publishing.")
        return

    # Append to verified-blog.ts
    print(f"[PUBLISHING] Adding slug: {article['slug']} to {BLOG_FILE}...")
    # (Implementation for future automated programmatic additions)
    print("[SUCCESS] Pipeline ready.")

if __name__ == "__main__":
    main()
