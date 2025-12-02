---
nome: 00_O_1_2_6_Patch_System
versao: "1.0"
tipo: Metodo
classe_ref: Metodo
origem: interno
status: Draft
---

# 00_O_1_2_6_Patch_System

## 1. Definição

Sistema para aplicar edições parciais em arquivos do repositório via GitHub Actions.

Resolve o problema: API do GitHub exige envio do arquivo completo, não permite patch parcial.

---

## 2. I/O

| Campo | Valor |
|-------|-------|
| Input | Arquivo de instruções (PATCH.md) |
| Output | Arquivo original atualizado |

---

## 3. Estrutura do PATCH.md

```markdown
---
target: genesis/GENESIS.md
version_from: "0.1"
version_to: "0.2"
commit_message: "[C2] feat: estabiliza Camada 2"
---

## EDITS

### EDIT 1
FIND:
```
| 2 | Infraestrutura | Persistência e contexto | GitHub, Claude Instructions, Estrutura Pastas | Pendente | Camada 1 |
```
REPLACE:
```
| 2 | Infraestrutura | Persistência e contexto | GitHub, Claude Instructions, Estrutura Pastas | Estável | Camada 1 |
```

### EDIT 2
FIND:
```
versao: "0.1"
```
REPLACE:
```
versao: "0.2"
```

### EDIT 3
APPEND_AFTER:
```
| 0.1 | 2025-12-02 | Criação. Seções 0-7 definidas. Stub inicial. |
```
ADD:
```
| 0.2 | 2025-12-02 | Camada 2 estabilizada. Infraestrutura funcional. |
```
```

---

## 4. GitHub Action

Criar arquivo `.github/workflows/apply-patch.yml`:

```yaml
name: Apply Patch

on:
  push:
    paths:
      - '_patches/*.md'

jobs:
  apply-patch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Get new patch files
        id: patches
        run: |
          echo "files=$(git diff --name-only HEAD~1 HEAD | grep '_patches/.*\.md$' | tr '\n' ' ')" >> $GITHUB_OUTPUT
      
      - name: Apply patches
        run: |
          for patch_file in ${{ steps.patches.outputs.files }}; do
            python3 .github/scripts/apply_patch.py "$patch_file"
          done
      
      - name: Commit changes
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add .
          git commit -m "Auto-apply patches" || echo "No changes"
          git push
```

---

## 5. Script Python

Criar arquivo `.github/scripts/apply_patch.py`:

```python
#!/usr/bin/env python3
import sys
import re
import yaml

def parse_patch(patch_content):
    """Parse PATCH.md file."""
    # Split frontmatter and body
    parts = patch_content.split('---')
    frontmatter = yaml.safe_load(parts[1])
    body = '---'.join(parts[2:])
    
    edits = []
    
    # Parse FIND/REPLACE blocks
    find_replace = re.findall(
        r'FIND:\s*```\n(.*?)\n```\s*REPLACE:\s*```\n(.*?)\n```',
        body, re.DOTALL
    )
    for find, replace in find_replace:
        edits.append(('replace', find.strip(), replace.strip()))
    
    # Parse APPEND_AFTER/ADD blocks
    append_after = re.findall(
        r'APPEND_AFTER:\s*```\n(.*?)\n```\s*ADD:\s*```\n(.*?)\n```',
        body, re.DOTALL
    )
    for after, add in append_after:
        edits.append(('append', after.strip(), add.strip()))
    
    return frontmatter, edits

def apply_edits(content, edits):
    """Apply edits to content."""
    for edit_type, pattern, replacement in edits:
        if edit_type == 'replace':
            content = content.replace(pattern, replacement)
        elif edit_type == 'append':
            content = content.replace(pattern, pattern + '\n' + replacement)
    return content

def main():
    patch_file = sys.argv[1]
    
    with open(patch_file, 'r') as f:
        patch_content = f.read()
    
    frontmatter, edits = parse_patch(patch_content)
    target = frontmatter['target']
    
    with open(target, 'r') as f:
        content = f.read()
    
    new_content = apply_edits(content, edits)
    
    with open(target, 'w') as f:
        f.write(new_content)
    
    print(f"Applied {len(edits)} edits to {target}")

if __name__ == '__main__':
    main()
```

---

## 6. Uso

1. Criar arquivo em `_patches/001_nome_descritivo.md`
2. Seguir estrutura da Seção 3
3. Commit e push
4. GitHub Action aplica automaticamente

---

## 7. Diagrama

```
┌─────────────────────────────────────────────────────────────────┐
│                       PATCH SYSTEM                              │
│                                                                 │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐   │
│   │ _patches/    │────►│ GitHub       │────►│ Arquivo      │   │
│   │ 001_edit.md  │     │ Action       │     │ Atualizado   │   │
│   └──────────────┘     └──────────────┘     └──────────────┘   │
│                              │                                  │
│                              ▼                                  │
│                        apply_patch.py                           │
│                        - parse PATCH.md                         │
│                        - find/replace                           │
│                        - append_after                           │
│                        - commit                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Referências

| Documento | Relação |
|-----------|---------|
| 00_O_1_2_Pipeline_Documentacao | Pai |
| 00_O_1_2_1_GitHub | Irmão |
| 00_O_1_2_2_GitHub_Actions | Irmão |

---

## Histórico

| Versão | Data | Alteração |
|--------|------|-----------|
| 1.0 | 2025-12-02 | Criação |
