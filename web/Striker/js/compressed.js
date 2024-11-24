function StrikerImageList(){this.images=[];for(var a=0;a<StrikerImageList.arguments.length;++a)this.add(StrikerImageList.arguments[a])}StrikerImageList.prototype.add=function(a){var b=this.images.length;this.images[b]=new Image;this.images[b].src=a};StrikerImageList.prototype.isComplete=function(){for(var a=0;a<this.images.length;++a)if(!this.images[a].complete)return false;return true};
StrikerImageList.prototype.getImage=function(){var a=0;if(this.getImage.arguments.length>0&&(a=this.getImage.arguments[0])>=0&&a>=this.images.length)a=0;return this.images[a]};
function StrikerObject(){this.flags={};this.images={};this.active=false;this.power=this.agility=this.vectorY=this.vectorX=this.h=this.w=this.y=this.x=0;this.ceaseFire=16;this.div=this.exploding=this.ceasingFire=0;var a=document.getElementsByTagName("div").length,b=document.createElement("div");b.id="StrikerObject"+a;b.style.position="absolute";b.style.visibility="hidden";document.body.appendChild(b);this.div=b.style}
StrikerObject.prototype.isComplete=function(){for(var a in this.images)if(!this.images[a].isComplete())return false;return true};StrikerObject.prototype.activate=function(){this.reset();this.reposition(this.x,this.y);this.setImage(this.images.fly.getImage());this.active=true;this.ceasingFire=this.exploding=0;this.div.visibility="visible"};StrikerObject.prototype.deactivate=function(){this.active=false;this.div.visibility="hidden";this.div.left="0px";this.div.top="0px"};
StrikerObject.prototype.setCourse=function(a,b){if(b>Striker.pageHeight)b=Striker.pageHeight;else if(b<0)b=0;this.vectorX=(a-this.x)/this.agility;this.vectorY=(b-this.y)/this.agility};StrikerObject.prototype.fly=function(){this.x+=this.vectorX;this.y+=this.vectorY;if(this.inRange()){this.reposition(this.x,this.y);this.ceasingFire>0&&this.ceasingFire--;if(this.power<=0&&this.exploding==0)this.killed();else if(this.exploding>0){this.setImage(this.images.explode.getImage(this.exploding>>2));this.exploding--}}else this.killed()};
StrikerObject.prototype.damage=function(a){if(!(this.exploding>0||(this.power-=a)>0)){this.exploding=this.images.explode.images.length<<2;this.ceasingFire=65535}};StrikerObject.prototype.fire=function(a,b){if(!(this.ceasingFire>0)){this.ceasingFire=this.ceaseFire;a.x=this.x+(this.w>>1);a.y=this.y+(this.h>>1);a.vectorY=this.vectorY+b;a.activate()}};StrikerObject.prototype.overlaps=function(a){if(this.x>a.x-this.w&&this.x<a.x+a.w&&this.y>a.y-this.h&&this.y<a.y+a.h)return true;return false};
StrikerObject.prototype.inRange=function(){if(this.y<-200||this.y>Striker.pageHeight+200)return false;return true};StrikerObject.prototype.reset=function(){this.x=Math.random()*Striker.pageWidth;this.y=Math.random()*Striker.pageHeight};StrikerObject.prototype.killed=function(){this.deactivate()};StrikerObject.prototype.reposition=function(a,b){if(!isNaN(a))this.div.left=Math.round(a)+"px";if(!isNaN(b))this.div.top=Math.round(b)+"px"};
StrikerObject.prototype.setImage=function(a){this.w=a.width;this.h=a.height;this.div.width=a.width+"px";this.div.height=a.height+"px";this.div.backgroundImage="url("+a.src+")"};
var Striker={pageWidth:0,pageHeight:0,playerShots:2,enemyShots:8,enemies:6,score:0,objects:{},timerId:0,init:function(){var a,b;if(self.innerWidth){a=self.innerWidth;b=self.innerHeight}else if(document.documentElement&&document.documentElement.clientWidth){a=document.documentElement.clientWidth;b=document.documentElement.clientHeight}else{a=document.body.clientWidth;b=document.body.clientHeight}Striker.pageWidth=a;Striker.pageHeight=b;Striker.enemies=Math.floor(Striker.pageWidth/200);Striker.enemyShots=
Striker.enemies+2;Striker.playerShots=Striker.enemies>>1;Striker.objects={};a=new StrikerObject;a.images.fly=new StrikerImageList("css/images/background0.gif");a.reset=function(){var c=this.images.fly.getImage(),d=c.width>>2;c=c.height>>2;this.x=Math.round(Math.random()*(Striker.pageWidth+d))-d;this.y=Math.round(Math.random()*(Striker.pageHeight+c))-c};a.fly=function(){};Striker.objects.background=a;for(b=Striker.enemyShots;b--;){a=new StrikerObject;a.flags.enemy=a.flags.shot=true;a.images.fly=new StrikerImageList("css/images/enemy-missile.gif");
a.images.explode=new StrikerImageList("css/images/impact.gif");a.reset=function(){this.agility=10;this.power=30};a.setLock=function(c){this.vectorX=(c-this.x)/this.agility};Striker.objects["enemyShot"+b]=a}for(b=Striker.enemies;b--;){a=new StrikerObject;a.flags.enemy=true;a.images.fly=new StrikerImageList("css/images/enemy.gif");a.images.explode=new StrikerImageList("css/images/enemy-explode2.gif","css/images/enemy-explode1.gif","css/images/enemy-explode0.gif");a.reset=function(){this.x=Math.floor(Math.random()*
(Striker.pageWidth-this.images.fly.getImage().width));this.y=-this.images.fly.getImage().height;this.vectorX=Math.random()-0.5;this.vectorY=10+Math.random()*6;this.agility=20;this.power=90};a.killed=function(){this.activate()};Striker.objects["enemy"+b]=a}for(b=Striker.playerShots;b--;){a=new StrikerObject;a.flags.shot=true;a.images.fly=new StrikerImageList("css/images/player-missile.gif");a.images.explode=new StrikerImageList("css/images/impact.gif");a.reset=function(){this.agility=10;this.power=
30};Striker.objects["playerShot"+b]=a}a=new StrikerObject;a.images.fly=new StrikerImageList("css/images/player.gif");a.images.pitchLeft=new StrikerImageList("css/images/player-pitch-left.gif");a.images.pitchRight=new StrikerImageList("css/images/player-pitch-right.gif");a.images.explode=new StrikerImageList("css/images/player-explode2.gif","css/images/player-explode1.gif","css/images/player-explode0.gif");a.reset=function(){this.x=Striker.pageWidth>>1;this.y=Striker.pageHeight-this.images.fly.getImage().height;
this.agility=12;this.power=90;this.ceaseFire=0};a.setCourse=function(c,d){this.vectorX=(c-this.x)/this.agility;this.vectorY=(d-this.y)/this.agility;if(!(this.power<=0))if(this.vectorX<-2)this.setImage(this.images.pitchLeft.getImage());else this.vectorX>2?this.setImage(this.images.pitchRight.getImage()):this.setImage(this.images.fly.getImage())};Striker.objects.player=a},start:function(){if(Striker.isComplete()){document.layers&&document.captureEvents(Event.MOUSEMOVE|Event.KEYUP);document.onmousemove=
Striker.mouseMove;document.onkeyup=Striker.keyUp;document.onmousedown=Striker.keyUp;Striker.score=0;for(var a in Striker.objects)Striker.objects[a].flags.shot||Striker.objects[a].activate();Striker.run()}else Striker.timerId=setTimeout(Striker.start,100)},stop:function(){for(var a in Striker.objects)Striker.objects[a].deactivate();document.onmousemove=null;document.onkeyup=null;document.onmousedown=null;clearTimeout(Striker.timerId);Striker.timerId=0},mouseMove:function(a){var b;if(window.opera){b=
event.clientX;a=event.clientY}else if(document.all)if(document.documentElement&&document.documentElement.scrollTop){b=event.clientX+document.documentElement.scrollLeft;a=event.clientY+document.documentElement.scrollTop}else{b=event.clientX+document.body.scrollLeft;a=event.clientY+document.body.scrollTop}else{b=a.pageX;a=a.pageY}Striker.objects.player.setCourse(b-(Striker.objects.player.w>>1),a-(Striker.objects.player.h>>1))},keyUp:function(){for(var a=Striker.playerShots;a--;)if(!Striker.objects["playerShot"+
a].active){Striker.objects.player.fire(Striker.objects["playerShot"+a],-32);return}},isComplete:function(){for(var a in Striker.objects)if(!Striker.objects[a].isComplete())return false;return true},run:function(){for(var a in Striker.objects){a=Striker.objects[a];if(a.active){if(a.flags.enemy){if(a.flags.shot)a.y<Striker.objects.player.y&&a.setLock(Striker.objects.player.x+(Striker.objects.player.w>>1));else if(a.ceasingFire==0&&Math.abs(a.x-Striker.objects.player.x)<128&&a.y<Striker.objects.player.y)for(var b=
Striker.enemyShots;b--;)if(!Striker.objects["enemyShot"+b].active){++Striker.score;Striker.objects["enemyShot"+b].setLock(Striker.objects.player.x+(Striker.objects.player.w>>1));a.fire(Striker.objects["enemyShot"+b],8);break}for(b=Striker.playerShots;b--;)if(Striker.objects["playerShot"+b].active&&a.overlaps(Striker.objects["playerShot"+b])){a.damage(65535);Striker.objects["playerShot"+b].damage(65535);Striker.score+=50}if(a.active&&a.power>0&&a.overlaps(Striker.objects.player)){Striker.objects.player.damage(a.power);
a.damage(65535)}}a.fly()}}if(Striker.objects.player.active)Striker.timerId=setTimeout(Striker.run,25);else{Striker.stop();Striker.restore()}}},App={briefing:null,load:function(){App.briefing=document.getElementById("Briefing");if(App.briefing){Striker.restore=App.restore;Striker.init()}},play:function(){App.briefing.style.display="none";document.body.style.overflow="hidden";Striker.start();return false},restore:function(){App.briefing.style.display="block";document.body.style.overflow="auto";if(Striker.score>
0){for(var a="",b=0,c=document.getElementById("Scale"),d=0;d<c.childNodes.length;++d)c.childNodes[d].tagName=="LI"&&++b;var e=Math.ceil(b/2E4*Striker.score);if(e<1)e=1;if(e>b)e=b;e="L"+e;for(d=0;d<c.childNodes.length;++d)if(c.childNodes[d].tagName=="LI")if(c.childNodes[d].id==e){b=c.childNodes[d].getElementsByTagName("a");if(b.length>0){b=b[0].innerHTML.split(" ");if(b.length>0)a=b[0]}c.childNodes[d].className="Highlight"}else c.childNodes[d].className="";document.getElementById("Score").innerHTML=
"You made <strong>"+Striker.score+"</strong> points, "+a+"!"}}};window.onload=function(){App.load()};
