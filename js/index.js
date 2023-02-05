const stroyUnitCnt = 5;
const eventUnitCnt = 1;
const nomalUnitCnt = 23;
const limitUnitCnt = 7;
const seasonalUnitCnt = 1;
const collabUnitCnt = 3;
const monsterCnt = 10;;
const rlArkCnt = 0;
const rcArkCnt = 0;
const rArkCnt = 25;
const rArkTcnt = rArkCnt + rcArkCnt + rlArkCnt;
const srArkCnt = 22;
const srlArkCnt = 0;
const srcArkCnt = 1;
const srArkTcnt = srcArkCnt + srlArkCnt + srArkCnt;
const ssrArkCnt = 27;
const ssrlArkCnt = 1;
const ssrcArkCnt = 2;
const ssrArkTCnt = ssrArkCnt + ssrcArkCnt + ssrlArkCnt;
const urArkCnt = 0;
const lrArkCnt = 0;
const maxUnitCnt = stroyUnitCnt + eventUnitCnt + nomalUnitCnt + limitUnitCnt + seasonalUnitCnt + collabUnitCnt + monsterCnt;
const maxArkCnt  = rArkTcnt + srArkTcnt + ssrArkTCnt + urArkCnt + lrArkCnt;     
const unitInfo = {
    collab :    { rate : "collab",   cnt : collabUnitCnt,   title : "콜라보(" + collabUnitCnt + ")"      }, 
    limit  :    { rate : "limit",    cnt : limitUnitCnt,    title : "영웅 강림(" + limitUnitCnt + ")"    }, 
    seasonal  : { rate : "seasonal", cnt : seasonalUnitCnt, title : "계절 한정(" + seasonalUnitCnt + ")" }, 
    nomal  :    { rate : "nomal",    cnt : nomalUnitCnt,    title : "통상(" + nomalUnitCnt + ")"         }, 
    event  :    { rate : "event",    cnt : eventUnitCnt,    title : "이벤트(" + eventUnitCnt + ")"       }, 
    story  :    { rate : "story",    cnt : stroyUnitCnt,    title : "스토리(" + stroyUnitCnt + ")"       }, 
    monster :   { rate : "monster",  cnt : monsterCnt,      title : "몬스터(" + monsterCnt + ")"         }, 
};
const arkInfo = {
    ur :  { rate : "ur",  cnt : urArkCnt, title : "UR(" + urArkCnt +")"}, 
    lr :  { rate : "lr",  cnt : lrArkCnt, title : "LR(" + lrArkCnt +")"}, 
    ssr : { rate : "ssr", cnt : ssrArkCnt, limitCnt : ssrlArkCnt, collabCnt : ssrcArkCnt, title : "SSR(" + ssrArkTCnt +")" }, 
    sr :  { rate : "sr",  cnt : srArkCnt,  limitCnt : srlArkCnt,  collabCnt : srcArkCnt,  title : "SR(" + srArkTcnt +")"   }, 
    r :   { rate : "r",   cnt : rArkCnt,   limitCnt : rlArkCnt,   collabCnt : rcArkCnt,   title : "R(" + rArkTcnt +")"     },
};

let unitHtml = "";
let arkHtml = "";
let entireHtml = "";

function fncRenderHtml(){
    const div_unit = document.querySelector("#unit");
    const div_ark = document.querySelector("#ark");
    const div_entire = document.querySelector("#scDiv");
    let index = 0;

    document.querySelector("#maxUnit").innerHTML = maxUnitCnt;
    document.querySelector("#maxArk").innerHTML = maxArkCnt;            
    document.querySelector("#maxEntire").innerHTML = maxUnitCnt + maxArkCnt;            
    
    for(let key in unitInfo){ unitHtml += fncCreateUnitHtml(unitInfo[key], index); index++; }
    index = 0;
    entireHtml += '<br/>';
    for(let key in arkInfo) { arkHtml += fncCreateArkHtml(arkInfo[key], index); index++; }

    div_unit.insertAdjacentHTML('beforeend', unitHtml);
    div_ark.insertAdjacentHTML('beforeend', arkHtml);   
    div_entire.insertAdjacentHTML('beforeend', entireHtml);   
    document.querySelector("#currunit").innerHTML = document.querySelectorAll('#unit .iactive').length;
    document.querySelector("#currark").innerHTML = document.querySelectorAll('#ark .iactive').length;
    document.querySelector("#currentire").innerHTML = document.querySelectorAll('#entire .iactive').length;
}

function fncCreateTitleHtml(index, title){
    let returnHtml = "";   
    returnHtml += '<div class="container-fluid">'+
                        '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">'+
                            '<div class="panel panel-default">'+
                                '<div class="panel-heading mt-3 mb-3" role="tab" style="border-bottom: 3px solid white;">'+
                                    '<a class="brancht" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+index+'" aria-expanded="false">'+title+'</a>'+                                            
                                '</div>'+
                            '<div id="collapse'+index+'" class="panel-collapse collapse show" role="tabpanel">'+
                        '<div class="panel-body">'; 
    return returnHtml;                                    
}

function fncCreateUnitHtml(item, index){                        
    let returnHtml = "";  
    let isIactive = "";
    if(item.cnt > 0){                
        returnHtml += fncCreateTitleHtml(index, item.title);                            
        for(let i = 1; i <= item.cnt; ++i){
            isIactive = localStorage.getItem("unit" + (item.rate + i)) !== null;
            returnHtml += '<img class="unit '+ (isIactive ? "iactive" : "") + '" id="unit'+(item.rate + i)+'" src="./unit/'+item.rate+'/'+i+'.png" onclick="fncSelect(unit'+(item.rate + i)+',0)">'; 

            isIactive = localStorage.getItem("entire" + (item.rate + i)) !== null;
            entireHtml += '<img class="unit '+ (isIactive ? "iactive" : "") + '" id="entire'+(item.rate + i)+'" src="./unit/'+item.rate+'/'+i+'.png" onclick="fncSelect(entire'+(item.rate + i)+',2)">'; 
        }
        returnHtml += '</div></div></div></div></div>';
    }         
    return returnHtml;
}

function fncCreateArkHtml(item, index){            
    let returnHtml = "";               
    if(item.cnt > 0){
        returnHtml += fncCreateTitleHtml("A" + index, item.title); 
        returnHtml += '<p class="pst">통상</p>';
        for(let i = 1; i <= item.cnt; ++i){ 
            isIactive = localStorage.getItem("ark" + (item.rate + i)) !== null;
            returnHtml += '<img class="'+ (isIactive ? "iactive" : "") + '" id="ark'+(item.rate+ i)+'" src="./ark/'+ item.rate +'/'+i+'.png" onclick="fncSelect('+("ark"+item.rate+i)+',1)">'; 

            isIactive = localStorage.getItem("entire" + (item.rate + i)) !== null;
            entireHtml += '<img class="'+ (isIactive ? "iactive" : "") + '" id="entire'+(item.rate+ i)+'" src="./ark/'+ item.rate +'/'+i+'.png" onclick="fncSelect('+("entire"+item.rate+i)+',2)">';
        }
        if(item.limitCnt > 0){ 
            returnHtml += '<br><p class="pst">계절 한정</p>';
            for(let i = 1; i <= item.limitCnt; ++i){ 
                isIactive = localStorage.getItem("arkl" + (item.rate + i)) !== null;
                returnHtml += '<img class="'+ (isIactive ? "iactive" : "") + '" id="arkl'+(item.rate+ i)+'" src="./ark/'+ item.rate +'/l/'+i+'.png" onclick="fncSelect('+("arkl"+item.rate+i)+',1)">';  

                isIactive = localStorage.getItem("entirel" + (item.rate + i)) !== null;                       
                entireHtml += '<img class="'+ (isIactive ? "iactive" : "") + '" id="entirel'+(item.rate+ i)+'" src="./ark/'+ item.rate +'/l/'+i+'.png" onclick="fncSelect('+("entirel"+item.rate+i)+',2)">';                                                 
            }
        }
        if(item.collabCnt > 0){ 
            returnHtml += '<br><p class="pst">콜라보</p>';
            for(let i = 1; i <= item.collabCnt; ++i){ 
                isIactive = localStorage.getItem("arkc" + (item.rate + i)) !== null;
                returnHtml += '<img class="'+ (isIactive ? "iactive" : "") + '" id="arkc'+(item.rate+i)+'" src="./ark/'+ item.rate +'/c/'+i+'.png" onclick="fncSelect('+("arkc"+item.rate+i) + ',1)">'; 

                isIactive = localStorage.getItem("entirec" + (item.rate + i)) !== null;                       
                entireHtml += '<img class="'+ (isIactive ? "iactive" : "") + '" id="entirec'+(item.rate+i)+'" src="./ark/'+ item.rate +'/c/'+i+'.png" onclick="fncSelect('+("entirec"+item.rate+i) + ',2)">'; 
            }
        }
        returnHtml += '</div></div></div></div></div>';
    }
    return returnHtml;
}

function fncSelect(target, isType){        
    let branch = "#curr" + (isType == 0 ? "unit" : isType == 1 ? "ark" : "entire");
    let currCnt = Number(document.querySelector(branch).innerHTML);
    if(localStorage.getItem(target.id) !== null){
        target.style.opacity = 0.3;
        document.querySelector(branch).innerHTML = currCnt-1;
        localStorage.removeItem(target.id);
    }   
    else{
        target.style.opacity = 1;
        document.querySelector(branch).innerHTML = currCnt+1;
        localStorage.setItem(target.id, "");
    }       
    return false;
}

function fncAllSelect(type){
    let saveType = type == "entire" ?  "scDiv" : type;            
    document.querySelector("#curr" + type).innerHTML = (saveType === "unit" ? maxUnitCnt :  saveType === "ark" ? maxArkCnt : maxUnitCnt + maxArkCnt);
    document.querySelectorAll("#" +  type + " img").forEach(function(item){ item.style.opacity = 1 }); 
    document.querySelectorAll("#" + saveType + " img").forEach(function(e){ console.log(e.id); localStorage.setItem(e.id, ""); })
    return false;
}
function fncReset(type){
    let saveType = type == "entire" ?  "scDiv" : type;     
    document.querySelector("#curr" + type).innerHTML = 0;
    document.querySelectorAll("#" +  type + " img").forEach(function(item){ item.style.opacity = 0.3 }); 
    document.querySelectorAll("#" + saveType + " img").forEach(function(e){ localStorage.removeItem(e.id); })
    return false;
}

function fncDownload(div){
    domtoimage.toBlob(document.getElementById(div)).then(function (blob) {
        window.saveAs(blob, 'LastCloudia_KR_CheckList.png');
    });
    return false;
}
