import{d as n}from"./chunks/config.data.4e57d58a.js";import{o as a,c as t,C as s,a as o,t as l,b as p,V as e}from"./chunks/framework.34305d4c.js";const c=e('<h1 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-label="Permalink to &quot;Getting Started&quot;">​</a></h1><h2 id="launch" tabindex="-1">Launch the Plugin <a class="header-anchor" href="#launch" aria-label="Permalink to &quot;Launch the Plugin {#launch}&quot;">​</a></h2><p>Open your local plugin repository (see <a href="./">install step</a>), and click on <code>Run Extension</code> under the <em>Run and Debug</em> tab. This will launch the plugin in a new VS Code window.</p><p>In this new window, open your project folder. If you don&#39;t have a project yet, you can use the <a href="https://github.com/TOPLLab/as-warduino-template" target="_blank" rel="noreferrer">AssemblyScript template</a> for WARDuino to get started quickly.</p><h2 id="vscode-config" tabindex="-1">Project Configuration <a class="header-anchor" href="#vscode-config" aria-label="Permalink to &quot;Project Configuration {#vscode-config}&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">Add <code>launch.json</code> file</p><p>If you use any of our templates, you can skip this configuration step. The template contains the correct launch file.</p></div><p>To use the WARDuino plugin to debug your project, you need to create a <code>launch.json</code> file in the <code>.vscode</code> subfolder of your project root directory <a href="https://code.visualstudio.com/docs/editor/debugging" target="_blank" rel="noreferrer"><sup>[1]</sup></a>. The file should look like this:</p>',7),r={class:"language-json"},_=s("button",{title:"Copy Code",class:"copy"},null,-1),i=s("span",{class:"lang"},"json",-1),D={class:"shiki material-theme-palenight"},u=s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"{")],-1),d={class:"line"},y=e('<span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">version</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span>',7),F={style:{color:"#C3E88D"}},h=s("span",{style:{color:"#89DDFF"}},'"',-1),A=s("span",{style:{color:"#89DDFF"}},",",-1),g=e('<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">configurations</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span></span>',1),C=s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"        "),s("span",{style:{color:"#89DDFF"}},"{")],-1),T=e('<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">WARDuinoDBG</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>',1),f=e('<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">request</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">launch</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>',1),S=e('<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">name</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Debug WARDuino</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>',1),m=e('<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">program</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">${workspaceFolder}/src/main.ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>',1),b=e('<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">stopOnEntry</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true,</span></span>',1),q=e('<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">trace</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">false</span></span>',1),P=s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"        "),s("span",{style:{color:"#89DDFF"}},"}")],-1),V=s("span",{class:"line"},[s("span",{style:{color:"#A6ACCD"}},"    "),s("span",{style:{color:"#89DDFF"}},"]")],-1),I=s("span",{class:"line"},[s("span",{style:{color:"#89DDFF"}},"}")],-1),E=e('<p>The <code>program</code> key within the JSON file specifies the application&#39;s entry file that needs to be debugged.</p><p>Depending on the file extension pointed by the <code>program</code> entry, the plugin will load the required WebAssembly compiler and create source mappers accordingly.</p><h2 id="start-debugging" tabindex="-1">Start Debugging <a class="header-anchor" href="#start-debugging" aria-label="Permalink to &quot;Start Debugging&quot;">​</a></h2><p>By default, the plugin will debug using a local running instance of WARDuino (emulator). This means you don&#39;t need any further configuration. Navigate to the <em>Run and Debug</em> tab, and click on <code>Debug WARDuino</code>.</p><p>The next tutorial goes through the steps needed to debug on real hardware.</p>',5),j=JSON.parse('{"title":"Getting Started","description":"","frontmatter":{},"headers":[],"relativePath":"guide/plugin/get-started.md","filePath":"guide/plugin/get-started.md","lastUpdated":null}'),k={name:"guide/plugin/get-started.md"},x=Object.assign(k,{setup(R){return(B,N)=>(a(),t("div",null,[c,s("div",r,[_,i,s("pre",D,[s("code",null,[u,o(`
`),s("span",d,[y,s("span",F,l(p(n).plugin.version),1),h,A]),o(`
`),g,o(`
`),C,o(`
`),T,o(`
`),f,o(`
`),S,o(`
`),m,o(`
`),b,o(`
`),q,o(`
`),P,o(`
`),V,o(`
`),I])])]),E]))}});export{j as __pageData,x as default};
