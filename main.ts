import{readFileSync as R,writeFileSync as W,mkdirSync as K}from"node:fs";
const IN=process.env.MAKEFUN_INPUT_DIR||"/input",OUT=process.env.MAKEFUN_OUTPUT_DIR||"/output";
const V=new Uint8Array(256);
for(const[r,s]of[[0,7],[16,30],[32,34],[48,52],[64,65],[80,83]])for(let i=r;i<=s;i++)V[i]=1;
for(let n=1;n<41;n++){
 const id="i"+String(n).padStart(3,"0"),P=R(IN+"/"+id+"/program.bin"),Q=R(IN+"/"+id+"/input.bin");
 let S=[],C=[],M=new Int32Array(256),O=[],pc=0,ip=0,t=0,e=0,a=0,b=0,c=0;
 const push=v=>{if(S.length>255)throw 3;S.push(v|0)};
 const pop=()=>{if(!S.length)throw 2;return S.pop()};
 try{
  L:for(;;){
   if(t>999999)throw 10;
   if(pc<0||pc>=P.length)throw 9;
   const op=P[pc];
   if(!V[op])throw 5;
   const ln=op===1?1:op===2?4:op>47&&op<52?2:0;
   if(pc+1+ln>P.length)throw 9;
   t++;
   const np=pc+1+ln;
   const im=op===1?P[pc+1]<<24>>24:op===2?P[pc+1]|P[pc+2]<<8|P[pc+3]<<16|P[pc+4]<<24:ln===2?P[pc+1]|P[pc+2]<<8:0;
   const off=im>32767?im-65536:im;
   switch(op){
    case 0:e=0;break L;
    case 1:case 2:push(im);pc=np;break;
    case 3:pop();pc=np;break;
    case 4:a=pop();push(a);push(a);pc=np;break;
    case 5:b=pop();a=pop();push(b);push(a);pc=np;break;
    case 6:b=pop();a=pop();push(a);push(b);push(a);pc=np;break;
    case 7:c=pop();b=pop();a=pop();push(b);push(c);push(a);pc=np;break;
    case 16:b=pop();a=pop();push(a+b);pc=np;break;
    case 17:b=pop();a=pop();push(a-b);pc=np;break;
    case 18:b=pop();a=pop();push(Math.imul(a,b));pc=np;break;
    case 19:b=pop();a=pop();if(!b)throw 4;push((a/b)|0);pc=np;break;
    case 20:b=pop();a=pop();if(!b)throw 4;push((a%b)|0);pc=np;break;
    case 21:b=pop();a=pop();if(!b)throw 4;push(((a>>>0)/(b>>>0))|0);pc=np;break;
    case 22:b=pop();a=pop();if(!b)throw 4;push(((a>>>0)%(b>>>0))|0);pc=np;break;
    case 23:a=pop();push(-a);pc=np;break;
    case 24:b=pop();a=pop();push(a&b);pc=np;break;
    case 25:b=pop();a=pop();push(a|b);pc=np;break;
    case 26:b=pop();a=pop();push(a^b);pc=np;break;
    case 27:a=pop();push(~a);pc=np;break;
    case 28:b=pop();a=pop();push(a<<(b&31));pc=np;break;
    case 29:b=pop();a=pop();push(a>>(b&31));pc=np;break;
    case 30:b=pop();a=pop();push(a>>>(b&31));pc=np;break;
    case 32:b=pop();a=pop();push(a===b?1:0);pc=np;break;
    case 33:b=pop();a=pop();push(a<b?1:0);pc=np;break;
    case 34:b=pop();a=pop();push((a>>>0)<(b>>>0)?1:0);pc=np;break;
    case 48:pc=np+off;break;
    case 49:a=pop();pc=a?np:np+off;break;
    case 50:a=pop();pc=a?np+off:np;break;
    case 51:if(C.length>63)throw 7;C.push(np);pc=im;break;
    case 52:if(!C.length)throw 8;pc=C.pop();break;
    case 64:a=pop();if(a<0||a>255)throw 6;push(M[a]);pc=np;break;
    case 65:a=pop();b=pop();if(a<0||a>255)throw 6;M[a]=b;pc=np;break;
    case 80:a=pop();{const s=String(a);if(O.length+s.length>65536)throw 11;for(let i=0;i<s.length;i++)O.push(s.charCodeAt(i))}pc=np;break;
    case 81:a=pop();if(O.length>65535)throw 11;O.push(a&255);pc=np;break;
    case 82:push(ip<Q.length?Q[ip++]:-1);pc=np;break;
    case 83:a=pop();e=a&255;break L;
   }
  }
 }catch(x){e=x}
 K(OUT+"/"+id,{recursive:true});
 W(OUT+"/"+id+"/stdout.bin",Buffer.from(O));
 W(OUT+"/"+id+"/exit.txt",String(e));
}
