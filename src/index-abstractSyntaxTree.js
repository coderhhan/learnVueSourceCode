import parse from './AST/parse'

var templateStr = `<div>
<h3 class="aa add"    id="cc" d="dd">你好</h3>
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>
</div>
`

parse(templateStr)