#!/usr/bin/env python3
"""Parse Facebook group text output, filtering scattered chars and noise.

Usage: browser get-text | python3 fb-text-parser.py
   or: cat /tmp/browser-get-text-*.txt | python3 fb-text-parser.py

Outputs clean JSON array of posts with seller + body text.
"""
import sys, json, re

def parse_fb_text(raw_text):
    lines = raw_text.split('\n')
    clean_lines = []
    scattered_buf = []
    
    for line in lines:
        stripped = line.strip()
        if len(stripped) <= 2:  # Single/double char = scattered timestamp
            scattered_buf.append(stripped)
        else:
            if scattered_buf:
                joined = ''.join(scattered_buf)
                if len(joined) > 5:
                    clean_lines.append(('scattered', joined))
                scattered_buf = []
            if stripped and stripped != 'Facebook':
                clean_lines.append(('text', stripped))
    
    if scattered_buf:
        joined = ''.join(scattered_buf)
        if len(joined) > 5:
            clean_lines.append(('scattered', joined))
    
    # Now segment into posts: a post starts with a seller name (text line
    # that looks like a name: 2-4 capitalized words, no special chars)
    # followed by scattered timestamp, then body
    NOISE = {
        'Search Results', 'Filters', 'Recent Posts', 'Posts You\'ve Seen',
        'Date Posted', 'Loading...', 'Comment as Ray', 'Answer as Ray',
        'See more', '+ label', 'Shared with Private group',
        'Unread Chats', 'Number of unread notifications',
    }
    NAME_RE = re.compile(r'^[A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?$')
    
    posts = []
    current_seller = None
    current_body = []
    
    for kind, text in clean_lines:
        if kind == 'scattered':
            continue  # Skip scattered timestamps
        
        # Skip noise
        if text in NOISE or text.startswith('in Moda') or text.startswith('Number of'):
            continue
        
        # Detect seller name
        if NAME_RE.match(text) and len(text) < 40:
            # Save previous post
            if current_seller and current_body:
                body = '\n'.join(current_body).strip()
                if body and len(body) > 5:
                    posts.append({
                        'seller': current_seller,
                        'body': body
                    })
            current_seller = text
            current_body = []
        else:
            if current_seller:
                # Skip photo count indicators like "+10", "+2"
                if re.match(r'^\+\s*\d+$', text):
                    continue
                current_body.append(text)
    
    # Last post
    if current_seller and current_body:
        body = '\n'.join(current_body).strip()
        if body and len(body) > 5:
            posts.append({
                'seller': current_seller,
                'body': body
            })
    
    return posts

if __name__ == '__main__':
    raw = sys.stdin.read()
    posts = parse_fb_text(raw)
    print(json.dumps(posts, indent=2))
