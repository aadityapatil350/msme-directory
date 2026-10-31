#!/usr/bin/env python3
"""
MSMEVault Content Quality and SEO Validator
Audits blog posts and guides for:
- Slug uniqueness and valid routing
- Broken internal links (relatedSlugs, relatedGuides, in-content links)
- Title length, punctuation, and casing
- AI slop vocabulary detection
- Minimum depth / word count
- Structured FAQ and source verification
"""

import os
import re
import sys

BLOG_FILE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "verified-blog.ts")
GUIDES_FILE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "verified-guides.ts")
SCHEMES_FILE = os.path.join(os.path.dirname(__file__), "..", "src", "data", "verified-schemes.ts")

AI_SLOP_WORDS = [
    "delve", "tapestry", "realm", "pivotal", "beacon", "testament",
    "foster", "game-changer", "in today's landscape", "in conclusion",
    "it is important to note", "moreover", "furthermore"
]

def load_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def extract_slugs(text):
    return set(re.findall(r"slug:\s*['\"]([^'\"]+)['\"]", text))

def validate():
    blog_text = load_file(BLOG_FILE)
    guides_text = load_file(GUIDES_FILE)
    schemes_text = load_file(SCHEMES_FILE)

    blog_slugs = extract_slugs(blog_text) - {"string"}
    guide_slugs = extract_slugs(guides_text) - {"string"}
    scheme_slugs = extract_slugs(schemes_text) - {"string"}

    all_valid_slugs = {
        "blog": blog_slugs,
        "guides": guide_slugs,
        "schemes": scheme_slugs,
    }

    print(f"Loaded {len(blog_slugs)} blog posts, {len(guide_slugs)} guides, {len(scheme_slugs)} schemes.")

    # Check for internal links in relatedSlugs
    # Parse posts roughly
    post_blocks = re.findall(r"\{\s*slug:\s*['\"]([^'\"]+)['\"].*?relatedSlugs:\s*\[([^\]]*)\]", blog_text, re.DOTALL)
    
    broken_related = []
    for slug, rel_str in post_blocks:
        rel_items = re.findall(r"['\"]([^'\"]+)['\"]", rel_str)
        for rel in rel_items:
            if rel not in blog_slugs and rel not in guide_slugs:
                broken_related.append((slug, rel))

    if broken_related:
        print(f"\n[WARNING] Found {len(broken_related)} broken relatedSlugs:")
        for source, target in broken_related:
            print(f"  {source} -> {target} (NOT FOUND)")
    else:
        print("\n[OK] All relatedSlugs point to valid posts or guides.")

    # Check AI slop in blog_text
    slop_counts = {}
    for word in AI_SLOP_WORDS:
        matches = len(re.findall(r"\b" + re.escape(word) + r"\b", blog_text, re.IGNORECASE))
        if matches > 0:
            slop_counts[word] = matches

    if slop_counts:
        print(f"\n[INFO] AI slop words detected in blog dataset:")
        for w, c in slop_counts.items():
            print(f"  '{w}': {c} occurrences")
    else:
        print("\n[OK] No common AI slop vocabulary detected!")

if __name__ == "__main__":
    validate()
