javascript:
function filtreAuto(){
  var e=[];
  e["none"]="none";
  e["uptobox"]="http://uptobox.com/";
  e["rapidshare"]="http://rapidshare.com/";
  e["depositfiles"]="http://depositfiles.com/";
  e["filefactory"]="http://www.filefactory.com/";
  e["uploaded"]="http://ul.to/";
  e["filetobox"]="http://filetobox.com/download.php?uid";
  e["subsimple"]="http://subsimple.com/";
  return e;
}
function bookmarklet(){
  var pnd=document.createElement("div");
  pnd.innerHTML='Package Name: ';
  var pnt=document.createElement("input");
  pnt.setAttribute("id","packagename");
  pnt.setAttribute("name","packagename");
  pnt.setAttribute("type","text");
  pnt.setAttribute("value","download");
  pnt.setAttribute("placeholder","Package Name");
  pnd.appendChild(pnt);
  var e=document.createElement("div");
  url=filterUrl();
  e.innerHTML='<h1>URL</h1><input type="checkbox" name="checkboxUrl" id="'+url+'" value="checkbox0"><label for="checkbox0"><a href="'+url+'">'+url+"</a></label><br />";
  var t=document.createElement("div");
  var n=document.createElement("h2");
  n.setAttribute("id","Filter links by keyword:");
  t.appendChild(n);
  var r=document.createElement("input");
  r.setAttribute("id","searchInput");
  r.setAttribute("name","searchInput");
  r.setAttribute("type","text");
  r.setAttribute("placeholder","Filter customize ...");
  t.appendChild(r);
  t.innerHTML=t.innerHTML+"or Auto Filter:";
  var i=document.createElement("select");
  i.setAttribute("id","searchAuto");
  i.onchange=function(){
    win.document.getElementById("searchInput").value=""
  }
  ;
  filtre=filtreAuto();
  for(var s in filtre){
    var o=document.createElement("option");
    o.value=filtre[s];
    o.text=s;
    i.appendChild(o)
  }
  t.appendChild(i);
  var u=document.createElement("button");
  u.onclick=function(){
    findLinks()
  }
  ;
  u.innerHTML="search";
  t.appendChild(u);
  var a=document.createElement("button");
  a.setAttribute("id","check");
  a.onclick=function(){
    linksCheck()
  }
  ;
  a.innerHTML="Check all";
  t.appendChild(a);
  var f=document.createElement("button");
  f.setAttribute("id","pyLoad");
  f.onclick=function(){
    toPyload()
  }
  ;
  f.innerHTML="Send to pyLoad";
  t.appendChild(f);
  var l=document.createElement("div");
  l.setAttribute("id","divList");
  win.document.body.appendChild(pnd);
  win.document.body.appendChild(e);
  win.document.body.appendChild(t);
  win.document.body.appendChild(l);
  findLinks()
}
function linksCheck(){
  var e=win.document.getElementById("check");
  e.innerHTML=="Check all"?e.innerHTML="Check off":e.innerHTML="Check all";
  var t=win.document.getElementById("container").firstChild;
  while(t!=null){
    if(t.getAttribute("type")=="checkbox"){
      test=e.innerHTML=="Check all"?false:true;
      win.document.getElementsByName("checkboxUrl")[0].checked=test;
      win.document.getElementById(t.getAttribute("id")).checked=test
    }
    t=t.nextSibling
  }
  return fals
}
function filterUrl(){
  url=winx.document.URL;
  if(url.lastIndexOf("youtube")!=-1){
    g=new RegExp("v=.{11}");
    idVideo=g.exec(url);
    urlYoutube="http://www.youtube.com/watch?"+idVideo;
    url=urlYoutub
  }
  return url
}
function findLinks(){
  win.document.getElementById("check").innerHTML="Check all";
  var e=win.document.getElementById("searchAuto").value;
  var t=win.document.getElementById("searchInput").value;
  title="<h2> All links "+t+":</h2>";
  if(!t){
    if(e=="none"){
      t="";
      title="<h2> No filter: </ h2>"
    }
    else{
      t=e;
      title="<h2> Filter links:"+t+"</h2>"
    }
  }
  else{
    win.document.getElementById("searchAuto").value="none"
  }
  texte=title+'<div id="container">';
  for(var n=0;n<list_Links.length;n++){
    list_Links[n].lastIndexOf(t)!=-1?texte+='<input type="checkbox" name="checkbox'+n+'" id="'+list_Links[n]+'" value="checkbox'+n+'"><label for="checkbox'+n+'"><a href="'+list_Links[n]+'">'+list_Links[n]+"</a></label><br />":""
  }
  var r=win.document.getElementById("divList");
  r.innerHTML=texte+"</div>"
}
function createListLinks(){
  list_Links=[];
  for(var e=winx.document.links.length-1,t;t=winx.document.links[e];e--){
    if(!t.href.match(/^(javascript:|data:)/)){
      lien=t.href;
      list_Links.push(lien)
    }
  }
  return list_Links
}
function toPyload(){
  var pn=encodeURIComponent(win.document.getElementById("packagename").value);
  list_Pyload=[];
  var e=win.document.getElementsByName("checkboxUrl")[0];
  e.checked?list_Pyload.push(e.id):"";
  var t=win.document.getElementById("container").firstChild;
  while(t!=null){
    if(t.getAttribute("type")=="checkbox"){
      t.checked?list_Pyload.push(t.getAttribute("id")):""
    }
    t=t.nextSibling
  }
  if(list_Pyload==""){
    return fals
  }
  jLinks=encodeURIComponent(JSON.stringify(list_Pyload));
  urlx='http://localhost:8000/api/addPackage?name="'+pn+'"&links='+jLinks;
  winz=window.open(urlx,"","resizable=no, location=no, width=100, height=100, menubar=no, status=no, scrollbars=no, menubar=no");
  setTimeout("winz.close()",3);
  win.close()
}
winx=window;
win=window.open("","_blank","width=800,height=600,scrollbars,resizable,menubar");
list_Links=createListLinks();
bookmarklet()
