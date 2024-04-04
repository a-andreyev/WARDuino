import{i as n}from"./chunks/illustration.f11271bf.js";import{o as a,c as l,J as p,V as s}from"./chunks/framework.34305d4c.js";const o=s('<h1 id="button" tabindex="-1">Button <a class="header-anchor" href="#button" aria-label="Permalink to &quot;Button&quot;">​</a></h1><p>Push-buttons and switches connect two points in a circuit when you press them. This example turns on an LED when you press the button.</p><h2 id="circuit" tabindex="-1">Circuit <a class="header-anchor" href="#circuit" aria-label="Permalink to &quot;Circuit&quot;">​</a></h2><p>For this example you require:</p><ol><li>A microcontroller</li><li>A momentary button or switch</li><li>10K ohm resistor</li><li>An LED</li><li>220 ohm resistor</li></ol>',5),e=s(`<h2 id="program" tabindex="-1">Program <a class="header-anchor" href="#program" aria-label="Permalink to &quot;Program&quot;">​</a></h2><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-_4nkN" id="tab-t3ji-Th" checked="checked"><label for="tab-t3ji-Th">AS</label><input type="radio" name="group-_4nkN" id="tab-2OMtNPi"><label for="tab-2OMtNPi">Rust</label></div><div class="blocks"><div class="language-ts active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">delay</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">digitalRead</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">digitalWrite</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">InterruptMode</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">interruptOn</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">pinMode</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">PinMode</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">PinVoltage</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">as-warduino/assembly</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> button </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">25</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> led </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">26</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">invert</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">voltage</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PinVoltage</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PinVoltage</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">switch</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">voltage</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">case</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PinVoltage</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">LOW</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PinVoltage</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">HIGH</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">case</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PinVoltage</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">HIGH</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PinVoltage</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">LOW</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">toggleLED</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">_topic</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">_payload</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">):</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// Get current status of LED</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">status</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">digitalRead</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">led</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// Toggle LED</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">digitalWrite</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">led</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">invert</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">status</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">pinMode</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">button</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PinMode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">INPUT</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">pinMode</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">led</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PinMode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">OUTPUT</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">interruptOn</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">button</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">InterruptMode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">FALLING</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">toggleLED</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;"> (</span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">delay</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1000</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#F78C6C;">use</span><span style="color:#FFCB6B;"> warduino</span><span style="color:#89DDFF;">::{</span><span style="color:#FFCB6B;">delay</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#FFCB6B;">               digital_read</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#FFCB6B;">               digital_write</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#FFCB6B;">               InterruptMode</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#FFCB6B;">               pin_mode</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#FFCB6B;">               PinMode</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#FFCB6B;">               PinVoltage</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#FFCB6B;">               sub_interrupt</span><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> BUTTON</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">u32</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">25</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> LED</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">u32</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">26</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">callback</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">_topic</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">str</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> _payload</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;</span><span style="color:#FFCB6B;">str</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> _length</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">u32</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> voltage </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">digital_read</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">LED</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">match</span><span style="color:#A6ACCD;"> voltage </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#FFCB6B;">PinVoltage</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">HIGH </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">digital_write</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">LED</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PinVoltage</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">LOW</span><span style="color:#89DDFF;">),</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#FFCB6B;">PinVoltage</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">LOW </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">digital_write</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">LED</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PinVoltage</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">HIGH</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">#[</span><span style="color:#A6ACCD;">no_mangle</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#F78C6C;">pub</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">pin_mode</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">BUTTON</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PinMode</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">INPUT</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">pin_mode</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">LED</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PinMode</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">OUTPUT</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">sub_interrupt</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">BUTTON</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">InterruptMode</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">FALLING</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> callback</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">loop</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">delay</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">1000</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="vp-code-group"><div class="tabs"></div><div class="blocks"></div></div></div></div>`,2),C=JSON.parse('{"title":"Button","description":"","frontmatter":{},"headers":[],"relativePath":"guide/examples/button.md","filePath":"guide/examples/button.md","lastUpdated":null}'),t={name:"guide/examples/button.md"},i=Object.assign(t,{setup(c){return(r,F)=>(a(),l("div",null,[o,p(n,{src:"/images/button-circuit.svg",darkmode:"/images/button-circuit-dark.svg",classes:"circuit"}),e]))}});export{C as __pageData,i as default};
