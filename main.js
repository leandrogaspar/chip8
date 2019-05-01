!function(t){var e={};function i(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(r,s,function(e){return t[e]}.bind(null,s));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";function r(t){return 4095&t}function s(t){return 255&t}function a(t){return 15&t}function o(t){return(3840&t)>>8}function n(t){return(240&t)>>4}i.r(e);var h=[240,144,144,144,240,32,96,32,32,112,240,16,240,128,240,240,16,240,16,240,144,144,240,16,16,240,128,240,16,240,240,128,240,144,240,240,16,32,64,64,240,144,240,144,240,240,144,240,16,240,240,144,240,144,144,224,144,224,144,224,240,128,128,128,240,224,144,144,144,224,240,128,240,128,240,240,128,240,128,128];function c(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var l=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e=e||{},this.MEM_SIZE=e.memSize||4096,this.PC_START=e.pcStart||512,this.STACK_SIZE=e.stackSize||16,this.DISPLAY_SIZE=e.displaySize||2048,this.screen={draw:function(t){}},this.reset()}var e,i,l;return e=t,(i=[{key:"reset",value:function(){var t=this;this.memory=new Uint8Array(this.MEM_SIZE),h.forEach(function(e,i){t.memory[i]=e}),this.V=new Uint8Array(16),this.I=0,this.DT=0,this.ST=0,this.PC=this.PC_START,this.SP=0,this.stack=new Uint16Array(this.STACK_SIZE),this.display=new Array(this.DISPLAY_SIZE).fill(0),this.keys={},this.waitingKey=!1,this.waitingKeyTarget=-1,this.screen.draw(this.display)}},{key:"pressKey",value:function(t){this.keys[15&t]=!0,this.waitingKey&&(this.V[this.waitingKeyTarget]=t,this.waitingKey=!1)}},{key:"releaseKey",value:function(t){this.keys[15&t]=!1}},{key:"delayTimerTick",value:function(){this.DT>0&&(this.DT-=1)}},{key:"soundTimerTick",value:function(){this.ST>0&&(this.ST-=1),this.ST&&console.log("Stop sound!")}},{key:"writeWord",value:function(t,e){return this.writeByte(t,e>>8&255),this.writeByte(t+1,255&e),this}},{key:"writeByte",value:function(t,e){this.memory[t]=e}},{key:"cycle",value:function(){if(!this.waitingKey){var t=this.memory[this.PC]<<8|this.memory[this.PC+1];this.executeOpCode(t),this.shouldDraw&&(this.shouldDraw=!1,this.screen.draw(this.display))}}},{key:"throwInvalidOpCode",value:function(t){throw new Error("Invalid instruction opCode=".concat(t.toString(16)))}},{key:"executeOpCode",value:function(t){switch(this.PC+=2,(61440&t)>>12){case 0:return void this.opCodeFamily_0x0(t);case 1:return void this.opCodeFamily_0x1(t);case 2:return void this.opCodeFamily_0x2(t);case 3:return void this.opCodeFamily_0x3(t);case 4:return void this.opCodeFamily_0x4(t);case 5:return void this.opCodeFamily_0x5(t);case 6:return void this.opCodeFamily_0x6(t);case 7:return void this.opCodeFamily_0x7(t);case 8:return void this.opCodeFamily_0x8(t);case 9:return void this.opCodeFamily_0x9(t);case 10:return void this.opCodeFamily_0xA(t);case 11:return void this.opCodeFamily_0xB(t);case 12:return void this.opCodeFamily_0xC(t);case 13:return void this.opCodeFamily_0xD(t);case 14:return void this.opCodeFamily_0xE(t);case 15:return void this.opCodeFamily_0xF(t);default:return void this.throwInvalidOpCode(t)}}},{key:"opCodeFamily_0x0",value:function(t){switch(t){case 224:this.display.fill(0);break;case 238:this.SP-=1,this.PC=this.stack[this.SP]}}},{key:"opCodeFamily_0x1",value:function(t){var e=r(t);this.PC=e}},{key:"opCodeFamily_0x2",value:function(t){var e=r(t);this.stack[this.SP]=this.PC,this.SP+=1,this.PC=e}},{key:"opCodeFamily_0x3",value:function(t){var e=o(t),i=s(t);this.V[e]===i&&(this.PC+=2)}},{key:"opCodeFamily_0x4",value:function(t){var e=o(t),i=s(t);this.V[e]!==i&&(this.PC+=2)}},{key:"opCodeFamily_0x5",value:function(t){var e=o(t),i=n(t);0!==a(t)&&this.throwInvalidOpCode(t),this.V[e]===this.V[i]&&(this.PC+=2)}},{key:"opCodeFamily_0x6",value:function(t){var e=o(t),i=s(t);this.V[e]=i}},{key:"opCodeFamily_0x7",value:function(t){var e=o(t),i=s(t);this.V[e]=this.V[e]+i&255}},{key:"opCodeFamily_0x8",value:function(t){var e=a(t),i=o(t),r=n(t);switch(e){case 0:this.V[i]=this.V[r];break;case 1:this.V[i]=this.V[i]|this.V[r];break;case 2:this.V[i]=this.V[i]&this.V[r];break;case 3:this.V[i]=this.V[i]^this.V[r];break;case 4:var s=this.V[i]+this.V[r];this.V[15]=s>255,this.V[i]=255&s;break;case 5:var h=this.V[i]-this.V[r];this.V[15]=this.V[i]>=this.V[r],this.V[i]=255&h;break;case 6:this.V[15]=1&this.V[r],this.V[i]=this.V[r]=this.V[r]>>1;break;case 7:var c=this.V[r]-this.V[i];this.V[15]=this.V[r]>=this.V[i],this.V[i]=255&c;break;case 14:this.V[15]=(128&this.V[r])>>7,this.V[i]=this.V[r]=this.V[r]<<1;break;default:return void this.throwInvalidOpCode(t)}}},{key:"opCodeFamily_0x9",value:function(t){var e=o(t),i=n(t);0!==a(t)&&this.throwInvalidOpCode(t),this.V[e]!==this.V[i]&&(this.PC+=2)}},{key:"opCodeFamily_0xA",value:function(t){var e=r(t);this.I=e}},{key:"opCodeFamily_0xB",value:function(t){var e=r(t);this.PC=e+this.V[0]}},{key:"opCodeFamily_0xC",value:function(t){var e=o(t),i=s(t);this.V[e]=256*Math.random()&i}},{key:"opCodeFamily_0xD",value:function(t){var e=o(t),i=n(t),r=a(t);this.shouldDraw=!0,this.V[15]=0;for(var s=0;s<r;s++)for(var h=this.memory[this.I+s],c=0;c<8;c++){if(h&128>>c){var l=(this.V[e]+c)%64+64*((this.V[i]+s)%32);0!==this.display[l]&&(this.V[15]=1),this.display[l]^=1}}}},{key:"opCodeFamily_0xE",value:function(t){var e=o(t);switch(s(t)){case 158:var i=this.V[e];this.keys[i]&&(this.PC+=2);break;case 161:var r=this.V[e];this.keys[r]||(this.PC+=2);break;default:return void this.throwInvalidOpCode(t)}}},{key:"opCodeFamily_0xF",value:function(t){var e=o(t);switch(s(t)){case 7:this.V[e]=this.DT;break;case 10:this.waitingKey=!0,this.waitingKeyTarget=e;break;case 21:this.DT=this.V[e];break;case 24:this.ST=this.V[e];break;case 30:this.I=this.I+this.V[e]&65535;break;case 41:this.I=5*(15&this.V[e]);break;case 51:this.memory[this.I]=Math.floor(this.V[e]/100)%10,this.memory[this.I+1]=Math.floor(this.V[e]/10)%10,this.memory[this.I+2]=this.V[e]%10;break;case 85:for(var i=0;i<=e;i++)this.memory[this.I]=this.V[i],this.I=this.I+1&65535;break;case 101:for(var r=0;r<=e;r++)this.V[r]=this.memory[this.I],this.I=this.I+1&65535;break;default:return void this.throwInvalidOpCode(t)}}}])&&c(e.prototype,i),l&&c(e,l),t}();function u(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var d,y=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),i=i||{},this.backgroundColor=i.backgroundColor||{r:40,g:40,b:40},this.drawColor=i.backgroundColor||{r:102,g:255,b:102},this.width=i.width||64,this.height=i.height||32,this.canvas=e,this.ctx=this.canvas.getContext("2d")}var e,i,r;return e=t,(i=[{key:"draw",value:function(t){var e=this.canvas.width,i=this.canvas.height,r=i/this.height;this.ctx.fillStyle="rgb(".concat(this.backgroundColor.r,",").concat(this.backgroundColor.g,",").concat(this.backgroundColor.b,")"),this.ctx.fillRect(0,0,e,i);for(var s="rgb(".concat(this.drawColor.r,",").concat(this.drawColor.g,",").concat(this.drawColor.b,")"),a=0;a<t.length;a++){var o=Math.floor(a/this.width),n=a%this.width;0!==t[a]&&this._drawPixel(n,o,r,s)}}},{key:"setBackGroundColor",value:function(t){this.backgroundColor=t}},{key:"setDrawColor",value:function(t){this.drawColor=t}},{key:"_drawPixel",value:function(t,e,i,r){this.ctx.fillStyle=r;var s=t*i,a=e*i;this.ctx.fillRect(s,a,i,i)}}])&&u(e.prototype,i),r&&u(e,r),t}(),v={Digit1:1,Digit2:2,Digit3:3,Digit4:12,KeyQ:4,KeyW:5,KeyE:6,KeyR:13,KeyA:7,KeyS:8,KeyD:9,KeyF:14,KeyZ:10,KeyX:0,KeyC:11,KeyV:15},f=10,m=[],C=new l;C.screen=new y(document.getElementById("screen")),C.screen.draw(C.display),document.querySelector("#start").addEventListener("click",function(){d&&clearInterval(d),C.reset();var t=512;console.log("Rom size ".concat(m.length)),m.forEach(function(e){C.writeByte(t,e),t++}),d=setInterval(function(){var t=f;do{C.cycle(),t--}while(t>0);C.soundTimerTick(),C.delayTimerTick()},1e3/60)}),document.getElementById("file").addEventListener("change",function(t){var e=t.target.files[0],i=new FileReader;i.onload=function(t){var e=t.target.result;m=new Uint8Array(e)},i.readAsArrayBuffer(e)},!1);var p=document.getElementById("cyclesPerTick");p.addEventListener("change",function(t){console.log("New cyclesPerTick=".concat(t.target.value)),f=Number.parseInt(t.target.value)},!1),p.value=f,document.addEventListener("keyup",function(t){C.pressKey(v[t.code])}),document.addEventListener("keydown",function(t){C.releaseKey(v[t.code])})}]);
//# sourceMappingURL=main.js.map