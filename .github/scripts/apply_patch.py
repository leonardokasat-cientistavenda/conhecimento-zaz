#!/usr/bin/env python3
import sys
import re
import yaml

def parse_patch(patch_content):
    """Parse PATCH.md file.
    
    Supports both ``` and ````` as delimiters.
    Use ````` when content contains ``` (e.g., ASCII diagrams).
    """
    parts = patch_content.split('---')
    if len(parts) < 3:
        raise ValueError("Invalid patch format: missing frontmatter")
    
    frontmatter = yaml.safe_load(parts[1])
    body = '---'.join(parts[2:])
    
    edits = []
    
    # Try 5 backticks first (for content with ``` inside)
    find_replace_5 = re.findall(
        r'FIND:\s*`````[^\n]*\n(.*?)`````\s*REPLACE:\s*`````[^\n]*\n(.*?)`````',
        body, re.DOTALL
    )
    for find, replace in find_replace_5:
        edits.append(('replace', find.strip(), replace.strip()))
    
    # Then try 3 backticks (standard)
    find_replace_3 = re.findall(
        r'FIND:\s*```[^\n]*\n(.*?)```\s*REPLACE:\s*```[^\n]*\n(.*?)```',
        body, re.DOTALL
    )
    for find, replace in find_replace_3:
        edits.append(('replace', find.strip(), replace.strip()))
    
    # Parse APPEND_AFTER/ADD blocks (5 backticks)
    append_after_5 = re.findall(
        r'APPEND_AFTER:\s*`````[^\n]*\n(.*?)`````\s*ADD:\s*`````[^\n]*\n(.*?)`````',
        body, re.DOTALL
    )
    for after, add in append_after_5:
        edits.append(('append', after.strip(), add.strip()))
    
    # Parse APPEND_AFTER/ADD blocks (3 backticks)
    append_after_3 = re.findall(
        r'APPEND_AFTER:\s*```[^\n]*\n(.*?)```\s*ADD:\s*```[^\n]*\n(.*?)```',
        body, re.DOTALL
    )
    for after, add in append_after_3:
        edits.append(('append', after.strip(), add.strip()))
    
    return frontmatter, edits

def apply_edits(content, edits):
    """Apply edits to content."""
    for edit_type, pattern, replacement in edits:
        if edit_type == 'replace':
            if pattern in content:
                content = content.replace(pattern, replacement)
                print(f"  Applied replace: found pattern")
            else:
                print(f"  Warning: pattern not found for replace")
        elif edit_type == 'append':
            if pattern in content:
                content = content.replace(pattern, pattern + '\n' + replacement)
                print(f"  Applied append: found pattern")
            else:
                print(f"  Warning: pattern not found for append")
    return content

def main():
    if len(sys.argv) < 2:
        print("Usage: apply_patch.py <patch_file>")
        sys.exit(1)
    
    patch_file = sys.argv[1]
    print(f"Processing patch: {patch_file}")
    
    with open(patch_file, 'r', encoding='utf-8') as f:
        patch_content = f.read()
    
    frontmatter, edits = parse_patch(patch_content)
    target = frontmatter['target']
    
    print(f"Target file: {target}")
    print(f"Edits to apply: {len(edits)}")
    
    with open(target, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = apply_edits(content, edits)
    
    with open(target, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Successfully applied {len(edits)} edits to {target}")

if __name__ == '__main__':
    main()
