(this.webpackJsonpchip8=this.webpackJsonpchip8||[]).push([[0],[,,,,,,,,,,,,function(e,t,a){e.exports=a(29)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i),r=a(8),s=a.n(r),o=(a(17),a(11)),c=a(1),l=a(2),u=a(4),h=a(3),d=a(5);a(18);function m(e){return 4095&e}function y(e){return 255&e}function p(e){return 15&e}function f(e){return(3840&e)>>8}function v(e){return(240&e)>>4}var k=[240,144,144,144,240,32,96,32,32,112,240,16,240,128,240,240,16,240,16,240,144,144,240,16,16,240,128,240,16,240,240,128,240,144,240,240,16,32,64,64,240,144,240,144,240,240,144,240,16,240,240,144,240,144,144,224,144,224,144,224,240,128,128,128,240,224,144,144,144,224,240,128,240,128,240,240,128,240,128,128],C=function(){function e(t){Object(c.a)(this,e),t=t||{},this.MEM_SIZE=t.memSize||4096,this.PC_START=t.pcStart||512,this.STACK_SIZE=t.stackSize||16,this.DISPLAY_SIZE=t.displaySize||2048,this.screen={draw:function(){}},this.reset()}return Object(l.a)(e,[{key:"reset",value:function(){var e=this;this.memory=new Uint8Array(this.MEM_SIZE),k.forEach((function(t,a){e.memory[a]=t})),this.V=new Uint8Array(16),this.I=0,this.DT=0,this.ST=0,this.PC=this.PC_START,this.SP=0,this.stack=new Uint16Array(this.STACK_SIZE),this.display=new Array(this.DISPLAY_SIZE).fill(0),this.keys={},this.waitingKey=!1,this.waitingKeyTarget=-1,this.screen.draw(this.display)}},{key:"pressKey",value:function(e){this.keys[15&e]=!0,this.waitingKey&&(this.V[this.waitingKeyTarget]=e,this.waitingKey=!1)}},{key:"releaseKey",value:function(e){this.keys[15&e]=!1}},{key:"delayTimerTick",value:function(){this.DT>0&&(this.DT-=1)}},{key:"soundTimerTick",value:function(){this.ST>0&&(this.ST-=1),this.ST&&console.log("Stop sound!")}},{key:"writeWord",value:function(e,t){return this.writeByte(e,t>>8&255),this.writeByte(e+1,255&t),this}},{key:"writeByte",value:function(e,t){this.memory[e]=t}},{key:"cycle",value:function(){if(!this.waitingKey){var e=this.memory[this.PC]<<8|this.memory[this.PC+1];this.executeOpCode(e),this.shouldDraw&&(this.shouldDraw=!1,this.screen.draw(this.display))}}},{key:"throwInvalidOpCode",value:function(e){throw new Error("Invalid instruction opCode=".concat(e.toString(16)))}},{key:"executeOpCode",value:function(e){switch(this.PC+=2,(61440&e)>>12){case 0:return void this.opCodeFamily_0x0(e);case 1:return void this.opCodeFamily_0x1(e);case 2:return void this.opCodeFamily_0x2(e);case 3:return void this.opCodeFamily_0x3(e);case 4:return void this.opCodeFamily_0x4(e);case 5:return void this.opCodeFamily_0x5(e);case 6:return void this.opCodeFamily_0x6(e);case 7:return void this.opCodeFamily_0x7(e);case 8:return void this.opCodeFamily_0x8(e);case 9:return void this.opCodeFamily_0x9(e);case 10:return void this.opCodeFamily_0xA(e);case 11:return void this.opCodeFamily_0xB(e);case 12:return void this.opCodeFamily_0xC(e);case 13:return void this.opCodeFamily_0xD(e);case 14:return void this.opCodeFamily_0xE(e);case 15:return void this.opCodeFamily_0xF(e);default:return void this.throwInvalidOpCode(e)}}},{key:"opCodeFamily_0x0",value:function(e){switch(e){case 224:this.display.fill(0);break;case 238:this.SP-=1,this.PC=this.stack[this.SP]}}},{key:"opCodeFamily_0x1",value:function(e){var t=m(e);this.PC=t}},{key:"opCodeFamily_0x2",value:function(e){var t=m(e);this.stack[this.SP]=this.PC,this.SP+=1,this.PC=t}},{key:"opCodeFamily_0x3",value:function(e){var t=f(e),a=y(e);this.V[t]===a&&(this.PC+=2)}},{key:"opCodeFamily_0x4",value:function(e){var t=f(e),a=y(e);this.V[t]!==a&&(this.PC+=2)}},{key:"opCodeFamily_0x5",value:function(e){var t=f(e),a=v(e);0!==p(e)&&this.throwInvalidOpCode(e),this.V[t]===this.V[a]&&(this.PC+=2)}},{key:"opCodeFamily_0x6",value:function(e){var t=f(e),a=y(e);this.V[t]=a}},{key:"opCodeFamily_0x7",value:function(e){var t=f(e),a=y(e);this.V[t]=this.V[t]+a&255}},{key:"opCodeFamily_0x8",value:function(e){var t=p(e),a=f(e),i=v(e);switch(t){case 0:this.V[a]=this.V[i];break;case 1:this.V[a]=this.V[a]|this.V[i];break;case 2:this.V[a]=this.V[a]&this.V[i];break;case 3:this.V[a]=this.V[a]^this.V[i];break;case 4:var n=this.V[a]+this.V[i];this.V[15]=n>255,this.V[a]=255&n;break;case 5:var r=this.V[a]-this.V[i];this.V[15]=this.V[a]>=this.V[i],this.V[a]=255&r;break;case 6:this.V[15]=1&this.V[i],this.V[a]=this.V[i]=this.V[i]>>1;break;case 7:var s=this.V[i]-this.V[a];this.V[15]=this.V[i]>=this.V[a],this.V[a]=255&s;break;case 14:this.V[15]=(128&this.V[i])>>7,this.V[a]=this.V[i]=this.V[i]<<1;break;default:return void this.throwInvalidOpCode(e)}}},{key:"opCodeFamily_0x9",value:function(e){var t=f(e),a=v(e);0!==p(e)&&this.throwInvalidOpCode(e),this.V[t]!==this.V[a]&&(this.PC+=2)}},{key:"opCodeFamily_0xA",value:function(e){var t=m(e);this.I=t}},{key:"opCodeFamily_0xB",value:function(e){var t=m(e);this.PC=t+this.V[0]}},{key:"opCodeFamily_0xC",value:function(e){var t=f(e),a=y(e);this.V[t]=256*Math.random()&a}},{key:"opCodeFamily_0xD",value:function(e){var t=f(e),a=v(e),i=p(e);this.shouldDraw=!0,this.V[15]=0;for(var n=0;n<i;n++)for(var r=this.memory[this.I+n],s=0;s<8;s++){if(r&128>>s){var o=(this.V[t]+s)%64+64*((this.V[a]+n)%32);0!==this.display[o]&&(this.V[15]=1),this.display[o]^=1}}}},{key:"opCodeFamily_0xE",value:function(e){var t=f(e);switch(y(e)){case 158:var a=this.V[t];this.keys[a]&&(this.PC+=2);break;case 161:var i=this.V[t];this.keys[i]||(this.PC+=2);break;default:return void this.throwInvalidOpCode(e)}}},{key:"opCodeFamily_0xF",value:function(e){var t=f(e);switch(y(e)){case 7:this.V[t]=this.DT;break;case 10:this.waitingKey=!0,this.waitingKeyTarget=t;break;case 21:this.DT=this.V[t];break;case 24:this.ST=this.V[t];break;case 30:this.I=this.I+this.V[t]&65535;break;case 41:this.I=5*(15&this.V[t]);break;case 51:this.memory[this.I]=Math.floor(this.V[t]/100)%10,this.memory[this.I+1]=Math.floor(this.V[t]/10)%10,this.memory[this.I+2]=this.V[t]%10;break;case 85:for(var a=0;a<=t;a++)this.memory[this.I]=this.V[a],this.I=this.I+1&65535;break;case 101:for(var i=0;i<=t;i++)this.V[i]=this.memory[this.I],this.I=this.I+1&65535;break;default:return void this.throwInvalidOpCode(e)}}}]),e}(),b=(a(19),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).containerRef=n.a.createRef(),a.canvasRef=n.a.createRef(),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"resizeCanvas",value:function(){var e=this.containerRef.current.offsetWidth,t=this.containerRef.current.offsetHeight,a=Math.floor(Math.min(e/64,t/32));this.canvasWidth=this.canvasRef.current.width=64*a,this.canvasHeight=this.canvasRef.current.height=32*a}},{key:"draw",value:function(){var e=getComputedStyle(document.documentElement);this.drawColor=e.getPropertyValue("--main-color"),this.shadowColor="rgba(".concat(e.getPropertyValue("--main-color-rgb"),", ").concat(.4*Math.random(),")"),this.backgroundColor=e.getPropertyValue("--main-bg-color"),this.shadowBlur=20*Math.random(),this.ctx.fillStyle=this.backgroundColor,this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);var t=this.canvasHeight/32;this.ctx.fillStyle=this.drawColor;for(var a=this.props.displayData,i=0;i<a.length;i++){var n=Math.floor(i/64),r=i%64;if(0!==a[i]){var s=r*t,o=n*t;this.ctx.shadowBlur=this.shadowBlur,this.ctx.shadowColor=this.shadowColor,this.ctx.fillRect(s,o,t,t)}}this.requestFrameId=window.requestAnimationFrame(this.draw.bind(this))}},{key:"componentDidMount",value:function(){this.ctx=this.canvasRef.current.getContext("2d"),this.canvasWidth=this.canvasRef.current.width,this.canvasHeight=this.canvasRef.current.height,this.resizeCanvas(),this.requestFrameId=window.requestAnimationFrame(this.draw.bind(this)),window.addEventListener("resize",this.resizeCanvas.bind(this))}},{key:"componentWillUnmount",value:function(){window.cancelAnimationFrame(this.requestFrameId),window.removeEventListener("resize",this.resizeCanvas.bind(this))}},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){return n.a.createElement("div",{ref:this.containerRef,className:"ScreenContainer"},n.a.createElement("canvas",{ref:this.canvasRef,className:"ScreenCanvas"}))}}]),t}(n.a.Component));b.defaultProps={displayData:new Array(2048).fill(0)};var w=b,S=(a(20),function(e,t){return void 0===t&&(t=1),e.toString(16).padStart(2*t,"0").toUpperCase()}),g=function(e){return n.a.createElement("li",{className:"Word "+e.className},n.a.createElement("label",{className:"Label","data-testid":"label"},e.label),void 0!==e.old?n.a.createElement("span",{className:"Old","data-testid":"old"},S(e.old,e.bytes)):null,n.a.createElement("span",{className:"Current","data-testid":"current"},S(e.current,e.bytes)))};g.defaultProps={current:0,bytes:1};var E=n.a.memo(g),V=(a(21),function(e){return n.a.createElement("section",{className:"VRegisters"},n.a.createElement("h1",{"data-testid":"title"},"V Registers"),n.a.createElement("ul",{className:"RegistersList","data-testid":"registers-list"},Array.from(e.current).map((function(t,a){var i=e.old[a];return n.a.createElement(E,{key:a,label:"V".concat(a.toString(16).toUpperCase()),old:i,current:t})}))))});V.defaultProps={current:[],old:[]};var P=V,T=(a(22),function(e){var t=e.old,a=e.current;return n.a.createElement("section",{id:"stack",className:"Stack"},n.a.createElement("h1",{"data-testid":"title"},"Stack"),n.a.createElement(E,{label:"SP",old:t.SP,current:a.SP,bytes:1,"data-testid":"sp"}),n.a.createElement("ul",{className:"StackList","data-testid":"stack-list"},Array.from(a.stack).map((function(e,a){var i=t.stack[a];return n.a.createElement(E,{key:a,label:"SP".concat(a.toString(16).toUpperCase()),bytes:2,old:i,current:e})}))))});T.defaultProps={old:{SP:0,stack:[]},current:{SP:0,stack:[]}};var I=T,x=(a(23),function(e){var t=e.breakpoint,a=e.old,i=e.current,r=e.onChange;return n.a.createElement("section",{className:"Debug"},n.a.createElement("h1",{"data-testid":"title"},"Debug"),n.a.createElement("div",{className:"Breakpoint"},n.a.createElement("label",{className:"BreakpointLabel",htmlFor:"breakpoint"},"Breakpoint"),n.a.createElement("input",{type:"text",onChange:r,value:t,className:"BreakpointInput",id:"breakpoint"})),n.a.createElement("ul",{className:"MemoryList","data-testid":"memory-list"},n.a.createElement(E,{label:"PC ",old:a.PC,current:i.PC,bytes:2}),Array.from(i.memorySlice).filter((function(e,t){return t%2!==0})).map((function(e,a){var r,s=2*a+i.PC,o=i.memorySlice[2*a]<<8|i.memorySlice[2*a+1];return s===Number.parseInt(t,16)&&(r="BreakpointMarker"),n.a.createElement(E,{key:s,label:S(s,2),current:o,className:r,bytes:2})}))))});x.defaultProps={breakpoint:0,old:{PC:0,memorySlice:[]},current:{PC:0,memorySlice:[]}};var R=x,F=(a(24),function(e){var t=e.old,a=e.current;return n.a.createElement("section",{className:"OtherRegisters"},n.a.createElement("h1",{"data-testid":"title"},"Other Registers"),n.a.createElement("ul",{className:"OtherRegistersList"},n.a.createElement(E,{label:"I",old:t.I,current:a.I,bytes:2}),n.a.createElement(E,{label:"DT",old:t.DT,current:a.DT,bytes:1}),n.a.createElement(E,{label:"ST",old:t.ST,current:a.ST,bytes:1})))});F.defaultProps={old:{I:0,DT:0,ST:0},current:{I:0,DT:0,ST:0}};var _=F,O=a(10),D=a(6),A=a.n(D),N=a(9),M=(a(26),a(27),function(e){return n.a.createElement("div",{role:"button","aria-label":e.children,className:"Button",onClick:e.onClick,onMouseUp:e.onMouseUp,onMouseDown:e.onMouseDown,tabIndex:"0"},e.children)}),K=function(e){var t=e.playing?"Reset":"Start";return n.a.createElement(M,{onClick:e.onClick},t)},L=function(e){var t=e.roms.map((function(e,t){return n.a.createElement("option",{className:"RomListOption",key:t,value:e.value},e.label)}));return n.a.createElement("select",{className:"RomList",onChange:e.onChange},t)},j=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).onPlayClick=Object(N.a)(A.a.mark((function e(){var t,i,n,r;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.setState({playing:!0}),!(t=a.state.roms.find((function(e){return e.value===a.state.rom}))).rom){e.next=7;break}return a.props.onPlay(t.rom),e.abrupt("return");case 7:return e.next=9,fetch("./"+t.value);case 9:return i=e.sent,e.next=12,i.arrayBuffer();case 12:n=e.sent,r=new Uint8Array(n),a.props.onPlay(r);case 15:case"end":return e.stop()}}),e)}))),a.onLoadRom=function(){a.inputRef.current.click()},a.onRomSelectChange=function(e){a.setState({rom:e.target.value})},a.onFileChange=function(e){e.preventDefault();var t=e.target.files[0];if(t){var i=new FileReader;i.onload=function(e){var i=e.target.result;a.setState({roms:[].concat(Object(O.a)(a.state.roms),[{label:t.name,value:t.name,rom:new Uint8Array(i)}])}),a.inputRef.current.blur()},i.readAsArrayBuffer(t)}},a.inputRef=n.a.createRef(),a.state={playing:!1,rom:"Airplane.ch8",roms:[{value:"Airplane.ch8",label:"Airplane"},{value:"LunarLander.ch8",label:"Lunar Lander"},{value:"Pong.ch8",label:"Pong"},{value:"Maze.ch8",label:"Maze"}]},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"SelectROM"},n.a.createElement("input",{ref:this.inputRef,type:"file",onChange:this.onFileChange,className:"SelectROMInput"}),n.a.createElement(L,{roms:this.state.roms,onChange:this.onRomSelectChange}),n.a.createElement(K,{playing:this.state.playing,onClick:this.onPlayClick}),n.a.createElement("span",null,"or"),n.a.createElement(M,{onClick:this.onLoadRom},"Upload ROM"))}}]),t}(n.a.Component),B=(a(28),{1:1,2:2,3:3,4:12,q:4,w:5,e:6,r:13,a:7,s:8,d:9,f:14,z:10,x:0,c:11,v:15}),U=[1,2,3,12,4,5,6,13,7,8,9,14,10,0,11,15],H=function(e){var t=function(e,t){a(B[e],t)},a=function(t,a){a?e.onKeydown(t):e.onKeyup(t)},r=function(e){return t(e.key,!0)},s=function(e){return t(e.key,!1)};return Object(i.useEffect)((function(){return document.addEventListener("keydown",r),document.addEventListener("keyup",s),function(){document.removeEventListener("keydown",r),document.removeEventListener("keyup",s)}})),n.a.createElement("section",{className:"Keypad"},n.a.createElement("h1",null,"Keypad"),n.a.createElement("div",{className:"Keys"},U.map((function(e){return n.a.createElement(M,{key:e,onMouseUp:function(){return function(e){return a(e,!1)}(e)},onMouseDown:function(){return function(e){return a(e,!0)}(e)}},e.toString(16).toUpperCase())}))))},z=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).onPlay=function(e){a.stopClock(),a.chip8.reset();var t=512;e.forEach((function(e){a.chip8.writeByte(t,e),t++})),a.startClock()},a.cycle=function(){for(var e=a.cyclesPerTick;e>0;){if(a.chip8.PC===Number.parseInt(a.state.debug.breakpoint,16))return a.stopClock(),void a.updateChip8State(!0);a.chip8.cycle(),e--}a.chip8.soundTimerTick(),a.chip8.delayTimerTick(),a.updateChip8State()},a.onKeydown=function(e){a.chip8.pressKey(e)},a.onKeyup=function(e){a.chip8.releaseKey(e)},a.onContinue=function(){a.startClock()},a.onStep=function(){a.chip8.cycle(),a.chip8.soundTimerTick(),a.chip8.delayTimerTick(),a.updateChip8State(!0)},a.onBreakpointChange=function(e){a.setState({debug:Object(o.a)({},a.state.debug,{breakpoint:e.target.value})})},a.state={breakpointHit:!1,displayData:new Array(0).fill(0),otherRegisters:{old:{I:0,DT:0,ST:0,PC:0},current:{I:0,DT:0,ST:0,PC:0}},V:{old:new Uint8Array(16).fill(0),current:new Uint8Array(16).fill(0)},stack:{old:{SP:0,stack:new Uint16Array(16)},current:{SP:0,stack:new Uint16Array(16)}},debug:{breakpoint:0,old:{PC:512,memorySlice:new Uint8Array(14)},current:{PC:512,memorySlice:new Uint8Array(14)}}},a.myRef=n.a.createRef(),a.intervalHandle=null,a.cyclesPerTick=10,a.chip8=new C,a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"stopClock",value:function(){this.intervalHandle&&clearInterval(this.intervalHandle)}},{key:"startClock",value:function(){this.intervalHandle=setInterval(this.cycle,1e3/60)}},{key:"updateChip8State",value:function(e){var t=this;setTimeout((function(){t.setState({breakpointHit:e||!1,displayData:t.chip8.display,otherRegisters:{old:t.state.otherRegisters.current,current:{I:t.chip8.I,DT:t.chip8.DT,ST:t.chip8.ST}},V:{old:t.state.V.current,current:t.chip8.V},stack:{old:t.state.stack.current,current:{SP:t.chip8.SP,stack:t.chip8.stack}},debug:{breakpoint:t.state.debug.breakpoint,old:t.state.debug.current,current:{PC:t.chip8.PC,memorySlice:t.memorySlice(t.chip8.PC,t.chip8.memory)}}})}),0)}},{key:"memorySlice",value:function(e,t){return t.slice(e,e+14)}},{key:"renderControls",value:function(){return this.state.breakpointHit?n.a.createElement("div",{className:"DebugControls"},n.a.createElement(M,{onClick:this.onContinue},"Continue"),n.a.createElement(M,{onClick:this.onStep},"Step")):n.a.createElement(j,{onPlay:this.onPlay})}},{key:"render",value:function(){var e=this.state.otherRegisters,t=this.state.V,a=this.state.stack,i=this.state.debug,r=this.state.debug.breakpoint;return n.a.createElement("div",{className:"App"},n.a.createElement("header",{className:"Header"},n.a.createElement("h1",null,"Chip-8"),this.renderControls()),n.a.createElement("main",{className:"DisplayView"},n.a.createElement(w,{displayData:this.state.displayData})),n.a.createElement("footer",{className:"MemoryView"},n.a.createElement(H,{onKeydown:this.onKeydown,onKeyup:this.onKeyup}),n.a.createElement(_,{old:e.old,current:e.current}),n.a.createElement(P,{old:t.old,current:t.current}),n.a.createElement(I,{old:a.old,current:a.current}),n.a.createElement(R,{breakpoint:r,old:i.old,current:i.current,onChange:this.onBreakpointChange})))}}]),t}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[12,1,2]]]);
//# sourceMappingURL=main.824603ec.chunk.js.map