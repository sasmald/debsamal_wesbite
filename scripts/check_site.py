"""Dependency-free structural and local-link checks for the static website."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import re

ROOT = Path(__file__).resolve().parents[1] / 'ds_website'
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.ids, self.refs, self.stack = set(), [], []
        self.h1 = self.main = 0
        self.feed(source)
        assert not self.stack, f'Unclosed tags: {self.stack}'
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag not in VOID: self.stack.append(tag)
        if 'id' in a:
            assert a['id'] not in self.ids, f'Duplicate ID: {a["id"]}'
            self.ids.add(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'main': self.main += 1
        if tag == 'img': assert a.get('alt'), 'Missing image alt text'
        for attr in ('href', 'src'):
            if a.get(attr): self.refs.append(a[attr])
    def handle_endtag(self, tag):
        assert self.stack and self.stack[-1] == tag, f'Unexpected </{tag}> after {self.stack}'
        self.stack.pop()

pages = {p.name: Page(p.read_text()) for p in ROOT.glob('*.html')}
refs = 0
for name, page in pages.items():
    assert page.h1 == 1 and page.main == 1, f'{name}: expected one H1 and main'
    source = (ROOT/name).read_text()
    assert 'rel="canonical"' in source and 'name="description"' in source
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc: continue
        target = unquote(url.path) or name
        assert (ROOT/target).is_file(), f'{name}: missing {ref}'
        if url.fragment and target in pages:
            assert unquote(url.fragment) in pages[target].ids, f'{name}: missing anchor {ref}'
        refs += 1
for path in (ROOT/'components').glob('*.js'):
    for ref in re.findall(r'href="([^"]+)"', path.read_text()):
        url = urlsplit(ref)
        if not url.scheme: assert (ROOT/url.path).is_file(), f'Missing component link {ref}'
for path in (ROOT/'styles').glob('*.css'):
    if path.name not in ('tokens.css','editorial.css'): continue
    for ref in re.findall(r'url\([\'"]?([^\)\'\"]+)', path.read_text()):
        assert (path.parent/ref).is_file(), f'Missing CSS asset {ref}'
assert {'venture-origination','workflow-investment','platform-exit'} <= pages['work.html'].ids
headline = 'From health-system innovation to businesses built for adoption and scale.'
assert f'<h1>{headline}</h1>' in (ROOT/'index.html').read_text()
assert 'Healthcare Venture Builder | Product + Platform Executive' in (ROOT/'index.html').read_text()
# Explicit publication guardrails for active HTML, not the legacy résumé asset.
copy = '\n'.join(p.read_text() for p in ROOT.glob('*.html'))
for forbidden in ('Johns Hopkins','Mass General Brigham','UCSF','$6','67%','90%','~2%','8 academic health systems','Selected to teach','Trendshelf'):
    assert forbidden not in copy, f'Publication guardrail: {forbidden}'
print(f'PASS: {len(pages)} pages; {refs} local references; shared component links; CSS assets; valid tag nesting; unique IDs; landmarks; metadata; legacy case anchors; positioning; HTML publication guardrails.')
