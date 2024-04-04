import{i as a}from"./chunks/illustration.f11271bf.js";import{o as l,c as n,J as o,V as s}from"./chunks/framework.34305d4c.js";const p=s('<h1 id="blink" tabindex="-1">Blink <a class="header-anchor" href="#blink" aria-label="Permalink to &quot;Blink&quot;">​</a></h1><p>The blinking LED example is the traditional <em>Hello World</em> program for microcontrollers. The program turns an LED on and off at a regular interval.</p><h2 id="circuit" tabindex="-1">Circuit <a class="header-anchor" href="#circuit" aria-label="Permalink to &quot;Circuit&quot;">​</a></h2><p>For this example you require:</p><ol><li>A microcontroller</li><li>An LED (optional)</li><li>220 ohm resistor (optional)</li></ol><p>The LED and 220 ohm resistor are optional, most microcontrollers come with a built-in LED that you can use for this example.</p>',6),e=s(`<h2 id="program" tabindex="-1">Program <a class="header-anchor" href="#program" aria-label="Permalink to &quot;Program&quot;">​</a></h2><p>Once you have built the circuit, you can write the blinking LED example for WARDuino. First you need to initialize the pin connecting the LED as an output pin.</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-xnELU" id="tab-pZ3oETz" checked="checked"><label for="tab-pZ3oETz">AS</label><input type="radio" name="group-xnELU" id="tab-cNHxTrF"><label for="tab-cNHxTrF">Rust</label></div><div class="blocks"><div class="language-ts active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">pinMode</span><span style="color:#A6ACCD;">(led</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> PinMode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">OUTPUT)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">pin_mode</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">led</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PinMode</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">OUTPUT</span><span style="color:#89DDFF;">);</span></span></code></pre></div></div></div><p>Then in an infinite loop, we want to turn the LED on. In the code we use a variable <code>led</code> that holds the correct pin number.</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-iTq7R" id="tab-dbkvh6X" checked="checked"><label for="tab-dbkvh6X">AS</label><input type="radio" name="group-iTq7R" id="tab-87f5Eib"><label for="tab-87f5Eib">Rust</label></div><div class="blocks"><div class="language-ts active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">digitalWrite</span><span style="color:#A6ACCD;">(led</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> PinVoltage</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">HIGH)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">digital_write</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">led</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PinVoltage</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">HIGH</span><span style="color:#89DDFF;">);</span></span></code></pre></div></div></div><p>Here, the <code>digitialWrite</code> primitive makes the microcontroller supply 5 volts to the LED anode, turning the LED on. Next we want to turn the LED off, by bringing the pin back to 0 volts.</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-clang" id="tab-GlratDH" checked="checked"><label for="tab-GlratDH">AS</label><input type="radio" name="group-clang" id="tab-PhmoxBt"><label for="tab-PhmoxBt">Rust</label></div><div class="blocks"><div class="language-ts active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">digitalWrite</span><span style="color:#A6ACCD;">(led</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> PinVoltage</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">LOW)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">digital_write</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">led</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PinVoltage</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">LOW</span><span style="color:#89DDFF;">);</span></span></code></pre></div></div></div><p>Without a delay between these commands, a person could never observe the change. So we can tell the board to do nothing for a number of milliseconds.</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-ib1i4" id="tab-HZk963Y" checked="checked"><label for="tab-HZk963Y">AS</label><input type="radio" name="group-ib1i4" id="tab-0WyZ-jq"><label for="tab-0WyZ-jq">Rust</label></div><div class="blocks"><div class="language-ts active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">delay</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1000</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">delay</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">1000</span><span style="color:#89DDFF;">);</span></span></code></pre></div></div></div><p>Here is the full code.</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-9Cqpt" id="tab-o_1C9L8" checked="checked"><label for="tab-o_1C9L8">AS</label><input type="radio" name="group-9Cqpt" id="tab-CE2nhjR"><label for="tab-CE2nhjR">Rust</label></div><div class="blocks"><div class="language-ts active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// Blinking LED example</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;">pinMode</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PinMode</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PinVoltage</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">digitalWrite</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">delay</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">as-warduino/assembly</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">():</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">void</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">led</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">u32</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">26</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">pause</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">u32</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">pinMode</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">led</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PinMode</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">OUTPUT</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;"> (</span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">digitalWrite</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">led</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PinVoltage</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">HIGH</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">delay</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">pause</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">digitalWrite</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">led</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">PinVoltage</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">LOW</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">delay</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">pause</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="language-rust"><button title="Copy Code" class="copy"></button><span class="lang">rust</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// Blinking LED example</span></span>
<span class="line"><span style="color:#F78C6C;">use</span><span style="color:#FFCB6B;"> warduino</span><span style="color:#89DDFF;">::{</span><span style="color:#FFCB6B;">delay</span><span style="color:#89DDFF;">,</span><span style="color:#FFCB6B;"> digital_write</span><span style="color:#89DDFF;">,</span><span style="color:#FFCB6B;"> pin_mode</span><span style="color:#89DDFF;">,</span><span style="color:#FFCB6B;"> PinMode</span><span style="color:#89DDFF;">,</span><span style="color:#FFCB6B;"> PinVoltage</span><span style="color:#89DDFF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">#[</span><span style="color:#A6ACCD;">no_mangle</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#F78C6C;">pub</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">fn</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">main</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> led</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">u32</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">26</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">let</span><span style="color:#A6ACCD;"> pause</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">u32</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">pin_mode</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">led</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PinMode</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">OUTPUT</span><span style="color:#89DDFF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">loop</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">digital_write</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">led</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PinVoltage</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">HIGH</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">delay</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">pause</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">digital_write</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">led</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">PinVoltage</span><span style="color:#89DDFF;">::</span><span style="color:#A6ACCD;">LOW</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">delay</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">pause</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></div></div><h2 id="learn-more" tabindex="-1">Learn More <a class="header-anchor" href="#learn-more" aria-label="Permalink to &quot;Learn More&quot;">​</a></h2><p>Also, check out the <a href="./blink-without-delay.html">Blink Without Delay</a> example to learn how to create a delay while doing other things.</p>`,13),D=JSON.parse('{"title":"Blink","description":"","frontmatter":{},"headers":[],"relativePath":"guide/examples/blink.md","filePath":"guide/examples/blink.md","lastUpdated":null}'),t={name:"guide/examples/blink.md"},C=Object.assign(t,{setup(c){return(r,i)=>(l(),n("div",null,[p,o(a,{src:"/images/led-circuit.svg",darkmode:"/images/led-circuit-dark.svg",classes:"circuit"}),e]))}});export{D as __pageData,C as default};
