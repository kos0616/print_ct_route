(function(){"use strict";var t={3147:function(t,e,r){var l=r(9242),a=r(3396);const n={class:"max-w-6xl mx-auto py-5 px-5"},s={class:"print:hidden"},o=(0,a._)("article",{class:"text-center mb-3"},[(0,a._)("h1",{class:"text-2xl font-bold mb-3"},"CT Yeh 路段配速器 小抄產生器"),(0,a._)("p",{class:"mb-2"},[(0,a.Uk)(" 請至 "),(0,a._)("a",{href:"https://www.ctyeh.com/routelist",target:"_blank",class:"hover:underline text-green-700",title:"前往 CT Yeh 公路車基地"}," CT Yeh 公路車基地 "),(0,a.Uk)(" 取得配速小抄， 再進行上傳與列印。 ")]),(0,a._)("p",null,"列印後剪下，經護貝或用膠帶黏貼正反兩面即可防水。")],-1),i={class:"flex gap-x-4 justify-center"},d={key:0,onclick:"window.print()",class:"text-lg text-center px-4 py-3 relative block border rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors",title:"列印小抄",type:"button"},c=(0,a._)("i",{class:"fas fa-print"},null,-1),u=(0,a.Uk)(" 列印小抄 "),p=[c,u],_=(0,a._)("footer",{class:"fixed right-5 bottom-5"},[(0,a._)("a",{href:"https://github.com/kos0616/print_ct_route",title:"作者: kos0616",class:"hover:underline"},[(0,a._)("i",{class:"fa-brands fa-github"})])],-1),b={key:0,class:"px-3 py-2 lg:p-5 print:p-0"};function m(t,e,r,l,c,u){const m=(0,a.up)("uploader"),g=(0,a.up)("preview");return(0,a.wg)(),(0,a.iD)("div",n,[(0,a._)("div",s,[o,(0,a._)("div",i,[(0,a.Wm)(m,{onHandleUpload:t.handleUpload},null,8,["onHandleUpload"]),Array.isArray(t.STEPS)&&t.STEPS.length?((0,a.wg)(),(0,a.iD)("button",d,p)):(0,a.kq)("",!0)]),_]),Array.isArray(t.STEPS)&&t.STEPS.length?((0,a.wg)(),(0,a.iD)("div",b,[(0,a.Wm)(g,{modelValue:t.STEPS},null,8,["modelValue"])])):(0,a.kq)("",!0)])}var g=r(4870);const f={class:"border-green-800 rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors max-w-sm"},v={title:"上傳 ride_plan.csv",class:"text-lg text-center px-4 py-3 relative block cursor-pointer"},h=(0,a._)("i",{class:"fa-solid fa-file-csv text-2xl"},null,-1),w=(0,a._)("strong",null," 上傳 ride_plan.csv ",-1);function y(t,e,r,l,n,s){return(0,a.wg)(),(0,a.iD)("div",f,[(0,a._)("label",v,[h,w,(0,a._)("input",{onChange:e[0]||(e[0]=e=>t.$emit("handleUpload",e)),type:"file",accept:".csv",class:"w-0 h-0 absolute"},null,32)])])}var S=(0,a.aZ)({name:"uploader-tool"}),x=r(89);const k=(0,x.Z)(S,[["render",y]]);var T=k;const P=(0,a._)("p",{class:"print:hidden text-center mb-3"},[(0,a._)("i",{class:"text-blue-500 fas fa-info-circle"}),(0,a.Uk)(" 虛線處可填寫任意內容，虛線不會印出。 ")],-1),E={class:"flex gap-x-4 justify-center items-start"};function D(t,e,r,l,n,s){const o=(0,a.up)("full"),i=(0,a.up)("type_A"),d=(0,a.up)("type_A2"),c=(0,a.up)("type_B"),u=(0,a.up)("type_B2");return(0,a.wg)(),(0,a.iD)("div",null,[(0,a.Wm)(o,{STEPS:t.STEPS,class:"mb-5"},null,8,["STEPS"]),P,(0,a._)("div",E,[(0,a.Wm)(i,{STEPS:t.STEPS,class:"mb-5"},null,8,["STEPS"]),(0,a.Wm)(d,{STEPS:t.STEPS,class:"mb-5"},null,8,["STEPS"]),(0,a.Wm)(c,{STEPS:t.STEPS},null,8,["STEPS"]),(0,a.Wm)(u,{STEPS:t.STEPS},null,8,["STEPS"])])])}var z=r(7139);const U=t=>((0,a.dD)("data-v-40e224cd"),t=t(),(0,a.Cn)(),t),A={class:"table-auto table-striped border border-gray-600 table mx-auto",contenteditable:""},Z=U((()=>(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",{colspan:"2"},"區段"),(0,a._)("th",null,"距離"),(0,a._)("th",null,"累積"),(0,a._)("th",null,"配瓦"),(0,a._)("th",null,"均速"),(0,a._)("th",null,"區段時間"),(0,a._)("th",null,"累積時間")])],-1))),Y={class:"text-center"},C={class:"text-center"},O={class:"text-right font-bold"},H=U((()=>(0,a._)("small",null,"k",-1))),j={class:"text-right font-bold"},W=U((()=>(0,a._)("small",null,"k",-1))),$={class:"text-right font-bold"},F=U((()=>(0,a._)("small",null,"w",-1))),I={class:"text-right font-bold"},K=U((()=>(0,a._)("small",null,"k/h",-1))),B={class:"text-center"},M={class:"text-center"},N={class:"border border-gray-600 border-t-0",style:{"caption-side":"bottom"}},V={class:"flex w-full py-1 px-3"},q=U((()=>(0,a._)("span",null,null,-1))),R={class:"ml-auto"};function G(t,e,r,l,n,s){return(0,a.wg)(),(0,a.iD)("table",A,[Z,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.STEPS,((t,e)=>((0,a.wg)(),(0,a.iD)("tr",{key:`step_${e}`},[(0,a._)("td",Y,(0,z.zw)(t.start),1),(0,a._)("td",C,(0,z.zw)(t.end),1),(0,a._)("td",O,[(0,a.Uk)((0,z.zw)(t.distance),1),H]),(0,a._)("td",j,[(0,a.Uk)((0,z.zw)(t.cumulative_distance),1),W]),(0,a._)("td",$,[(0,a.Uk)((0,z.zw)(t.wattage),1),F]),(0,a._)("td",I,[(0,a.Uk)((0,z.zw)(t.average_speed),1),K]),(0,a._)("td",B,(0,z.zw)(t.segment_time),1),(0,a._)("td",M,(0,z.zw)(t.cumulative_time),1)])))),128))]),(0,a._)("caption",N,[(0,a._)("div",V,[q,(0,a._)("span",R,(0,z.zw)(t.now),1)])])])}var J=r(5743),L=r.n(J),Q=(0,a.aZ)({props:{STEPS:{type:Array,default:()=>[]}},setup:()=>{const t=L()().format("YYYY/MM/DD");return{now:t}}});const X=(0,x.Z)(Q,[["render",G],["__scopeId","data-v-40e224cd"]]);var tt=X;const et=t=>((0,a.dD)("data-v-802cb424"),t=t(),(0,a.Cn)(),t),rt={class:"table-auto border table-striped table table-sm border-gray-600",contenteditable:""},lt=et((()=>(0,a._)("caption",{class:"border-dashed border border-gray-400 print:border-0"},[(0,a._)("br")],-1))),at={class:"text-right"},nt=et((()=>(0,a._)("small",null,"k",-1))),st={class:"text-right"},ot=et((()=>(0,a._)("small",null,"k/h",-1))),it=et((()=>(0,a._)("caption",{class:"border-dashed border border-gray-400 print:border-0",style:{"caption-side":"bottom"}},[(0,a._)("br")],-1)));function dt(t,e,r,l,n,s){return(0,a.wg)(),(0,a.iD)("table",rt,[lt,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.STEPS,((t,e)=>((0,a.wg)(),(0,a.iD)(a.HY,{key:`step_${e}`},[(0,a._)("tr",null,[(0,a._)("td",null,(0,z.zw)(t.end),1),(0,a._)("td",at,[(0,a.Uk)((0,z.zw)(t.cumulative_distance),1),nt])]),(0,a._)("tr",null,[(0,a._)("td",null,(0,z.zw)(t.cumulative_time),1),(0,a._)("td",st,[(0,a.Uk)((0,z.zw)(t.average_speed),1),ot])])],64)))),128))]),it])}var ct=(0,a.aZ)({props:{STEPS:{type:Array,default:()=>[]}}});const ut=(0,x.Z)(ct,[["render",dt],["__scopeId","data-v-802cb424"]]);var pt=ut;const _t=t=>((0,a.dD)("data-v-dea106b2"),t=t(),(0,a.Cn)(),t),bt={class:"table-auto border table-striped table table-sm border-gray-600",contenteditable:""},mt=_t((()=>(0,a._)("caption",{class:"border-dashed border border-gray-400 print:border-0"},[(0,a._)("br")],-1))),gt={class:"text-right"},ft=_t((()=>(0,a._)("small",null,"k",-1))),vt={class:"text-right"},ht=_t((()=>(0,a._)("small",null,"w",-1))),wt=_t((()=>(0,a._)("caption",{class:"border-dashed border border-gray-400 print:border-0",style:{"caption-side":"bottom"}},[(0,a._)("br")],-1)));function yt(t,e,r,l,n,s){return(0,a.wg)(),(0,a.iD)("table",bt,[mt,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.STEPS,((t,e)=>((0,a.wg)(),(0,a.iD)(a.HY,{key:`step_${e}`},[(0,a._)("tr",null,[(0,a._)("td",null,(0,z.zw)(t.end),1),(0,a._)("td",gt,[(0,a.Uk)((0,z.zw)(t.cumulative_distance),1),ft])]),(0,a._)("tr",null,[(0,a._)("td",null,(0,z.zw)(t.cumulative_time),1),(0,a._)("td",vt,[(0,a.Uk)((0,z.zw)(t.wattage),1),ht])])],64)))),128))]),wt])}var St=(0,a.aZ)({props:{STEPS:{type:Array,default:()=>[]}}});const xt=(0,x.Z)(St,[["render",yt],["__scopeId","data-v-dea106b2"]]);var kt=xt;const Tt=t=>((0,a.dD)("data-v-7d6ec31c"),t=t(),(0,a.Cn)(),t),Pt={class:"table-auto border table-striped table table-sm border-gray-600",contenteditable:""},Et=Tt((()=>(0,a._)("caption",{class:"border-dashed border border-gray-400 print:border-0"},[(0,a._)("br")],-1))),Dt={class:"text-right"},zt=Tt((()=>(0,a._)("small",null,"k",-1))),Ut={class:"text-right"},At=Tt((()=>(0,a._)("small",null,"k/h",-1))),Zt=Tt((()=>(0,a._)("caption",{class:"border-dashed border border-gray-400 print:border-0",style:{"caption-side":"bottom"}},[(0,a._)("br")],-1)));function Yt(t,e,r,l,n,s){return(0,a.wg)(),(0,a.iD)("table",Pt,[Et,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.STEPS,((t,e)=>((0,a.wg)(),(0,a.iD)("tr",{key:`step_${e}`},[(0,a._)("td",Dt,[(0,a.Uk)((0,z.zw)(t.cumulative_distance),1),zt]),(0,a._)("td",Ut,[(0,a.Uk)((0,z.zw)(t.average_speed),1),At]),(0,a._)("td",null,(0,z.zw)(t.cumulative_time),1)])))),128))]),Zt])}var Ct=(0,a.aZ)({props:{STEPS:{type:Array,default:()=>[]}}});const Ot=(0,x.Z)(Ct,[["render",Yt],["__scopeId","data-v-7d6ec31c"]]);var Ht=Ot;const jt=t=>((0,a.dD)("data-v-9e5d5b62"),t=t(),(0,a.Cn)(),t),Wt={contenteditable:"",class:"table-auto border table-striped table table-sm border-gray-600"},$t=jt((()=>(0,a._)("caption",{class:"border-dashed border border-gray-400 print:border-0"},[(0,a._)("br")],-1))),Ft={class:"text-right"},It=jt((()=>(0,a._)("small",null,"k",-1))),Kt={class:"text-right"},Bt=jt((()=>(0,a._)("small",null,"w",-1))),Mt=jt((()=>(0,a._)("caption",{class:"border-dashed border border-gray-400 print:border-0",style:{"caption-side":"bottom"}},[(0,a._)("br")],-1)));function Nt(t,e,r,l,n,s){return(0,a.wg)(),(0,a.iD)("table",Wt,[$t,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.STEPS,((t,e)=>((0,a.wg)(),(0,a.iD)("tr",{key:`step_${e}`},[(0,a._)("td",Ft,[(0,a.Uk)((0,z.zw)(t.cumulative_distance),1),It]),(0,a._)("td",Kt,[(0,a.Uk)((0,z.zw)(t.wattage),1),Bt]),(0,a._)("td",null,(0,z.zw)(t.cumulative_time),1)])))),128))]),Mt])}var Vt=(0,a.aZ)({props:{STEPS:{type:Array,default:()=>[]}}});const qt=(0,x.Z)(Vt,[["render",Nt],["__scopeId","data-v-9e5d5b62"]]);var Rt=qt,Gt=(0,a.aZ)({name:"print preview",components:{full:tt,type_A:pt,type_A2:kt,type_B:Ht,type_B2:Rt},props:{modelValue:{type:Array,default:()=>[]}},setup(t){const e=t=>{switch(t){case"最高小七":return"小七";default:return t}},r=(0,a.Fl)((()=>t.modelValue.map((t=>({...t,start:e(t.start),end:e(t.end),distance:Number(t.distance).toFixed(1),cumulative_distance:Number(t.cumulative_distance).toFixed(1),wattage:t.wattage,average_speed:Math.floor(Number(t.average_speed)),segment_time:l(t.segment_time),cumulative_time:l(t.cumulative_time)}))))),l=t=>{const e=t.split(":");return e[0]+":"+e[1]};return{STEPS:r,formatPlaceName:e}}});const Jt=(0,x.Z)(Gt,[["render",D]]);var Lt=Jt,Qt=(0,a.aZ)({name:"App",components:{uploader:T,preview:Lt},setup(){const t=(0,g.iH)([]),e=t=>{const e=t.target,l=e.files;if(!l?.length)return;const a=l[0];r(a)},r=e=>{const r=new FileReader;r.readAsText(e),r.onload=function(){const e=r.result;if(!e)return;const a=e.split("\r\n");if(!a||0===a.length)return void alert("檔案格式錯誤");const n=a.slice(1),s=n.map((t=>t.split(","))).filter((t=>t.length>1));t.value=l(s),console.log(t.value)}},l=t=>t.map((t=>({start:t[0].split("-")[0],end:t[0].split("-")[1],distance:t[1],cumulative_distance:t[2],wattage:t[3],average_speed:t[4],segment_time:t[5],cumulative_time:t[6]})));return{handleUpload:e,STEPS:t}}});const Xt=(0,x.Z)(Qt,[["render",m]]);var te=Xt;(0,l.ri)(te).mount("#app")}},e={};function r(l){var a=e[l];if(void 0!==a)return a.exports;var n=e[l]={exports:{}};return t[l].call(n.exports,n,n.exports,r),n.exports}r.m=t,function(){var t=[];r.O=function(e,l,a,n){if(!l){var s=1/0;for(c=0;c<t.length;c++){l=t[c][0],a=t[c][1],n=t[c][2];for(var o=!0,i=0;i<l.length;i++)(!1&n||s>=n)&&Object.keys(r.O).every((function(t){return r.O[t](l[i])}))?l.splice(i--,1):(o=!1,n<s&&(s=n));if(o){t.splice(c--,1);var d=a();void 0!==d&&(e=d)}}return e}n=n||0;for(var c=t.length;c>0&&t[c-1][2]>n;c--)t[c]=t[c-1];t[c]=[l,a,n]}}(),function(){r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,{a:e}),e}}(),function(){r.d=function(t,e){for(var l in e)r.o(e,l)&&!r.o(t,l)&&Object.defineProperty(t,l,{enumerable:!0,get:e[l]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};r.O.j=function(e){return 0===t[e]};var e=function(e,l){var a,n,s=l[0],o=l[1],i=l[2],d=0;if(s.some((function(e){return 0!==t[e]}))){for(a in o)r.o(o,a)&&(r.m[a]=o[a]);if(i)var c=i(r)}for(e&&e(l);d<s.length;d++)n=s[d],r.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return r.O(c)},l=self["webpackChunkprint_ct_route"]=self["webpackChunkprint_ct_route"]||[];l.forEach(e.bind(null,0)),l.push=e.bind(null,l.push.bind(l))}();var l=r.O(void 0,[998],(function(){return r(3147)}));l=r.O(l)})();