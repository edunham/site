"""
I constantly forget to commit master.rst when I commit a post. Seems like the
workflow should not require this extra step. Only drawback here will be that
pages muts be listed in alphabetical order. Too fucking bad.
"""

import os
import re

preamble = """Sitemap
=======

.. toctree::
       :maxdepth: 1


"""

years = []
posts = []

for d in os.listdir('.'):
    if re.match(r'\d{4}$', d):  # let's assume a 4-digit number is a year
        years.append(d)

"""
sample output of os.walk

('2015/', ['01'], [])
('2015/01', ['28', '27', '13', '15', '31', '21', '14', '19', '29'], [])
('2015/01/28', [], ['what_makes_a_good_post.rst'])
('2015/01/27', [], ['those_funny_characters_in_vim.rst'])
...
"""

for y in years:
    for p in os.walk(y):
        if p[1] == []:
            # build name, stripping .rst from filename
            posts.append(p[0]+'/'+p[2][0][:-4])

posts = sorted(posts, key=lambda p: int(p[:4] + p[5:7] + p[8:10]), reverse=True)

try:
    os.remove('master.rst')
except OSError:
    pass
f = open('master.rst', 'w')

f.write(preamble)
for p in posts:
    f.write('    ' + p + '\n')
for page in sorted(os.listdir('pages')):
    f.write('    pages/' + page[:-4] + '\n')
f.close()

