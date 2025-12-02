#!/usr/bin/env python3
import sys
import re
import yaml

def parse_patch(patch_content):
    """Parse PATCH.md file."""
    parts = patch_content.split('---')
    if len(parts) < 3:
        raise ValueError("Invalid patch format: missing frontmatter")
    
    frontmatter = yaml.safe_load(parts[1])
    body = '---'.join(parts[2:])
    
    edits = []
    
    # Parse FIND/REPLACE blocks
    find_replace = re.findall(
        r'FIND:\s*```[^\n]*\n(.*?)```\s*REPLACE:\s*```[^\n]*\n(.*?)```',
        body, re.DOTALL
    )
    for find, replace in find_replace:
        edits.append(('replace', find.strip(), replace.strip()))
    
    # Parse APPEND_AFTER/ADD blocks
    append_after = re.findall(
        r'APPEND_AFTER:\s*```[^\n]*\n(.*?)```\s*ADD:\s*```[^\n]*\n(.*?)```',
        body, re.DOTALL
    )
    for after, add in append_after:
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
