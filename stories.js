window.renderTemplate=function(a,e){return a in templates?templates[a](e):"Template not found"};const templates={activity,chart,diagram,leaders,vote};function activity(a){const e=(a,e)=>["activity__map-item",a%2==0?"activity__map-even":"activity__map-odd",e>=1&&e<=2?"activity__map-mid":"",e>=3&&e<=4?"activity__map-max":"",e>=5?"activity__map-extra":""].join(" "),i=Object.values(a.data),t=[];for(let a=0;a<24;a++)i.forEach((i=>{const r=i[a],d=e(a+1,r);t.push(`<div class="${d}"><div class="bar"></div></div>`)}));const r=[];return i.forEach(((a,i)=>{for(let t=0;t<24;t+=2){const d=a[t]+a[t+1],s=e(i+1,d);r.push(`<div class="${s}"><div class="bar"></div></div>`)}})),`<div class="activity">\n    <div class="container">\n        <div class="title activity__title">${a.title}</div>\n        <div class="subtitle activity__subtitle">${a.subtitle}</div>\n        <div class="activity__map activity__map-vertical">\n            ${t.join("")}\n        </div>\n        <div class="activity__wrapper">\n            <div class="activity__content">\n                <div class="activity__map activity__map-horisontal">\n                    ${r.join("")}\n                </div>\n                <div class="activity__measures">\n                    <div class="activity__measures-item">\n                        <div class="activity__measures-scale">\n                            <div class="activity__measures-vertical"></div>\n                            <div class="activity__measures-horisontal"></div>\n                            <div class="activity__measures-vertical"></div>\n                        </div>\n                        <div class="activity__measures-measure">1 час</div>\n                    </div>\n                    <div class="activity__measures-item">\n                        <div class="activity__measures-color activity__measures-lightgray"></div>\n                        <div class="activity__measures-measure">0</div>\n                    </div>\n                    <div class="activity__measures-item">\n                        <div class="activity__measures-color activity__measures-gray"></div>\n                        <div class="activity__measures-measure">1 — 2</div>\n                    </div>\n                    <div class="activity__measures-item">\n                        <div class="activity__measures-color activity__measures-lightorange"></div>\n                        <div class="activity__measures-measure">3 — 4</div>\n                    </div>\n                    <div class="activity__measures-item">\n                        <div class="activity__measures-color activity__measures-orange"></div>\n                        <div class="activity__measures-measure">5 — 6</div>\n                    </div>\n                </div>\n            </div>\n        </div>  \n    </div>\n</div>`}const elements=document.querySelectorAll(".chart__item"),elemNumbers=document.querySelectorAll(".chart__item-number"),numbers=Array.from(elemNumbers).map((a=>a.textContent)),maxNum=Math.max(...numbers);function chart(a){const{title:e,subtitle:i,values:t,users:r}=a,d=t.findIndex((({active:a})=>a))+3,s=Math.max(0,d-9),c=t.slice(s,d),o=c.map((a=>a.value)),l=Math.max(...o),n=c.map((a=>{const e=100*a.value/l;return`\n        <div class="chart__item ${a.active?"chart__item-max":""}">\n            <div class="chart__item-wrapper">\n                <div class="chart__item-columnwrapper">\n                    <div class="chart__item-number">${a.value>0?a.value:""}</div>\n                    <div class="chart__item-column" style="height: ${e}%"></div>\n                </div> \n            </div>\n            <div class="chart__item-sprint">${a.title}</div>\n        </div>\n    `})),v=r.slice(0,2).map((a=>`\n            <div class="chart__people-item">\n                <img src="/img/2x/${a.avatar}" alt="" class="chart__people-img">\n                <div class="chart__people-info">\n                    <div class="chart__people-name">${a.name}</div>\n                    <div class="chart__people-id">${a.id}</div>\n                </div>    \n            </div>\n        `));return`<div class="chart">\n    <div class="container">\n        <div class="title chart__title">${e}</div>\n        <div class="subtitle chart__subtitle">${i}</div>\n        <div class="chart__content">\n            <div class="chart__wrapper">\n                ${n.join("")}\n            </div>\n            <div class="chart__people">\n                ${v.join('<div class="chart__devider"></div>')}\n            </div>\n        </div>\n        \n    </div>\n</div>`}function diagram(a){const{title:e,subtitle:i,totalText:t,differenceText:r,categories:d}=a;return`\n    <div class="diagram">\n    <div class="container">\n        <div class="title">${e}</div>\n        <div class="subtitle">${i}</div>\n        <div class="diagram__content">\n            <div class="diagram__wrapper">\n                <div id="diagram_dark" class="diagram__diagram diagram__diagram-dark"></div>\n                <div id="diagram_light" class="diagram__diagram diagram__diagram-light"></div>\n\n                <div class="diagram__descr">\n                    <div class="diagram__descr-title">${t}</div>\n                    <div class="diagram__descr-subtitle">${r}</div>\n                </div>\n            </div>\n            <div class="diagram__data">\n                ${d.map(((a,e)=>`\n        <div class="diagram__data-item">\n            <div class="diagram__data-circle diagram__data-circle${e+1}"></div>\n            <div class="diagram__data-interval">${a.title}</div>\n            <div class="diagram__data-change">${a.differenceText.split(" ",1)}</div>\n            <div class="diagram__data-current">${parseInt(a.valueText)}</div>\n        </div>\n        \n        `)).join('<div class="diagram__data-devider"></div>')}\n            </div>\n        </div>\n    </div>\n</div>   `}elements.forEach((a=>{const e=a.querySelector(".chart__item-number").textContent;a.querySelector(".chart__item-column").style.height=100*e/maxNum+"%"}));const lightGradients=[(()=>{let a=new am4core.RadialGradient;return a.addColor(am4core.color("#fec75c"),1,.7),a.addColor(am4core.color("#ffd86f"),1,.8),a.addColor(am4core.color("#ffebb2"),1,.9),a.addColor(am4core.color("#ffdea7"),1,1),a})(),(()=>{let a=new am4core.RadialGradient;return a.addColor(am4core.color("#fee3ab"),1,.7),a.addColor(am4core.color("#feefc4"),1,.8),a.addColor(am4core.color("#fff8dd"),1,.9),a.addColor(am4core.color("#fff3d6"),1,1),a})(),(()=>{let a=new am4core.RadialGradient;return a.addColor(am4core.color("#e6e6e7"),1,.7),a.addColor(am4core.color("#f0f0f1"),1,.8),a.addColor(am4core.color("#fafafb"),1,.9),a.addColor(am4core.color("#ededee"),1,1),a})(),(()=>{let a=new am4core.RadialGradient;return a.addColor(am4core.color("#ededee"),1,.7),a.addColor(am4core.color("#e8e8e9"),1,.8),a.addColor(am4core.color("#f7f7f9"),1,.9),a.addColor(am4core.color("#dcdbdc"),1,1),a})()],darkGradients=[(()=>{let a=new am4core.RadialGradient;return a.addColor(am4core.color("#e99603"),1,.7),a.addColor(am4core.color("#986306"),1,.85),a.addColor(am4core.color("#805405"),1,.9),a.addColor(am4core.color("#805405"),1,.94),a.addColor(am4core.color("#925f05"),1,.98),a.addColor(am4core.color("#cbad78"),1,1),a})(),(()=>{let a=new am4core.RadialGradient;return a.addColor(am4core.color("#7e5205"),1,.7),a.addColor(am4core.color("#352305"),1,.85),a.addColor(am4core.color("#2c1e05"),1,.9),a.addColor(am4core.color("#2c1e05"),1,.94),a.addColor(am4core.color("#523503"),1,.98),a.addColor(am4core.color("#b09e7f"),1,1),a})(),(()=>{let a=new am4core.RadialGradient;return a.addColor(am4core.color("#6d6c6b"),1,.7),a.addColor(am4core.color("#413c31"),1,.85),a.addColor(am4core.color("#363020"),1,.9),a.addColor(am4core.color("#363020"),1,.94),a.addColor(am4core.color("#4c4639"),1,.98),a.addColor(am4core.color("#8a8880"),1,1),a})(),(()=>{let a=new am4core.RadialGradient;return a.addColor(am4core.color("#969696"),1,.7),a.addColor(am4core.color("#32312f"),1,.71),a.addColor(am4core.color("#322d22"),1,.85),a.addColor(am4core.color("#302a1b"),1,.9),a.addColor(am4core.color("#2c2514"),1,.94),a.addColor(am4core.color("#292315"),1,.98),a.addColor(am4core.color("#83817a"),1,1),a})()],initDiagram=(a,e,i=!1)=>{const t=i?lightGradients:darkGradients,r=i?"#fff":"#000",d=am4core.create(a,am4charts.PieChart);d.data=e.map(((a,e)=>({name:a.title,value:parseInt(a.valueText),fill:t[e]})));const s=d.series.push(new am4charts.PieSeries);s.dataFields.value="value",s.dataFields.category="name",s.radius=am4core.percent(110),s.innerRadius=am4core.percent(77),s.ticks.template.disabled=!0,s.labels.template.disabled=!0;const c=s.slices.template;c.stroke=am4core.color(r),c.strokeWidth=2,c.cornerRadius=6,c.propertyFields.fill="fill",c.states.getKey("hover").properties.scale=1,c.states.getKey("active").properties.shiftRadius=0},diagramObserver=new MutationObserver((a=>{const e=document.querySelector(".diagram__data");if(!e||e.classList.contains("processed"))return;const i=e.querySelectorAll(".diagram__data-item"),t=Array.from(i).map((a=>({title:a.querySelector(".diagram__data-interval").textContent,valueText:a.querySelector(".diagram__data-current").textContent})));e.classList.add("processed"),initDiagram("diagram_dark",t),initDiagram("diagram_light",t,!0)}));function leaders(a){const{title:e,subtitle:i,selectedUserId:t,emoji:r,users:d}=a,s=d.slice(0,5),c=d.findIndex((a=>a.id==t));return c>4&&(s[4]=d[c]),`\n    <div class="leaders">\n    <div class="container">\n        <h1 class="title leaders__title">${e}</h1>\n        <h2 class="subtitle leaders__subtitle">${i}</h2>\n        <div class="leaders__wrapper">\n           ${s.map(((a,e)=>{let i="";return 0==e&&(i=r),a.id==t&&(i="👍"),`\n            <div class="leaders__item leaders__item-${e+1} ${t==a.id?"leaders__item-favourite":""}">\n                <div class="leaders__people">\n                <div class="leaders__people-emoji">${i}</div>\n                    <img srcset="img/1x/${a.avatar} 64w,\n                                img/2x/${a.avatar} 128w,\n                                img/3x/${a.avatar}"\n                        sizes="(max-width: 767px) 64px,\n                                (max-width: 1365) 128px,\n                                1366px"\n                        src="img/1x/${a.avatar}" alt="first" class="leaders__people-img">    \n                    <div class="leaders__people-name"><span>${a.name}</span></div>\n                    <div class="leaders__people-id">${t?a.valueText:a.id}</div>\n                </div>\n                <div class="leaders__devider"></div>\n                <div class="leaders__bar">\n                    <div class="leaders__bar-place">${t==a.id?c+1:e+1}</div>\n                </div>\n            </div>\n        `})).join("")}\n        </div>\n    </div>\n</div>`}function vote(a){const{title:e,subtitle:i,selectedUserId:t,offset:r=0,users:d}=a,s=d.slice(r,r+8).map(((a,e)=>{const i=encodeURIComponent(JSON.stringify({alias:"leaders",data:{selectedUserId:a.id}}));return`\n        <div class="vote__item vote__item-${e+1} ${t==a.id?"vote__item-favourite":""}" \n            data-action="update" \n            data-params="${i}">\n            <div class="vote__item-emoji">${a.id==t?"👍":""}</div>\n            <img srcset="img/1x/${a.avatar} 64w,\n                            img/2x/${a.avatar} 128w,\n                            img/3x/${a.avatar}"\n                    sizes="(max-width: 767px) 64px,\n                            (max-width: 1365) 128px,\n                            1366px"\n                    src="img/1x/${a.avatar}" alt="first" class="vote__item-img">\n            <div class="vote__item-name"><span>${a.name}</span></div>\n        </div>\n        `})),c=(a,e)=>{let i="",t=`vote__arrow-${a}${e}`,s=6;"vertical"==e&&(s=8),"up"==a&&(s*=-1);const c=Math.max(r+s,0);if(c>=d.length||0==r&&"up"==a)t+=" vote__arrow-disabled";else{const a={alias:"vote",data:{offset:c}};i=`data-action="update" data-params=${JSON.stringify(a)}`}return`\n        <div class="vote__arrow ${t}" ${i}>\n            <svg fill="none" height="64" viewBox="0 0 64 64" width="64" xmlns="http://www.w3.org/2000/svg">\n                <path clip-rule="evenodd" d="m32 62c16.5685 0 30-13.4315 30-30s-13.4315-30-30-30-30 13.4315-30 30 13.4315 30 30 30zm0 2c17.6731 0 32-14.3269 32-32s-14.3269-32-32-32-32 14.3269-32 32 14.3269 32 32 32zm27-32c0 14.9117-12.0883 27-27 27s-27-12.0883-27-27 12.0883-27 27-27 27 12.0883 27 27zm-33.9393-4.0607c-.5858-.5857-1.5356-.5857-2.1214 0-.5857.5858-.5857 1.5356 0 2.1214l8 8c.5858.5857 1.5356.5857 2.1214 0l8-8c.5857-.5858.5857-1.5356 0-2.1214-.5858-.5857-1.5356-.5857-2.1214 0l-6.9393 6.9394z" fill-rule="evenodd"/>\n            </svg>  \n        </div>\n        `};return`\n    <div class="vote">\n    <div class="container">\n        <div class="title vote__title">${e}</div>\n        <div class="subtitle vote__subtitle">${i}</div>\n        <div class="vote__wrapper">\n            ${c("up","vertical")}\n            ${c("up","horisontal")}\n            ${c("down","vertical")}\n            ${c("down","horisontal")}\n            ${s.join("")}\n        </div>\n    </div>\n</div>\n    `}diagramObserver.observe(document.body,{childList:!0,subtree:!0});