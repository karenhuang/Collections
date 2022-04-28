var fcstData = {
  team16:{
    A:[],
    B:[],
    C:[],
    D:[],
    E:[],
    F:[],
    G:[],
    H:[]    
  },
  team8:{
    A:[],
    B:[],
    C:[],
    D:[]
  },
  team4:{
    A:[],
    B:[]
  },
  team3:{
    A:[],
    B:[]
  },
  team2:{
    A:[],
    B:[]
  },
  teamThird:{
    A:[]
  },  
  teamFinals:{
    A:[]
  }
}
var fcstStatus={
  t32:true,
  t16:true,
  t8:true,
  t4:true,
  t3:true,
  t2:true,
  t1:false
}
var clearfcstDate = $.extend(true, {}, fcstData);
var clearfcstStatus = $.extend(true,{},fcstStatus);
var halfFcstData = null;
var copyAllFormDom;
var copyHalfFormDom;
$(function(){
  copyAllFormDom = $('.th-finals .gpmdCont').html();
  copyHalfFormDom = $('.th-finals .forClearHalf').html();
})


$.fn.getForecastForm = function(){
  var element = $(this);
  var block32 = element.find('.block32');
  var block16 = element.find('.block16');
  var block8 = element.find('.block8');
  var block4 = element.find('.block4');
  var block3 = element.find('.block3');
  var block2 = element.find('.block2');
  var block1 = element.find('.block1');
  var b32Country = block32.find(".pt-country");
  var b16Group = block16.find(".pt-group >div");
  var b8Group = block8.find('.pt-group >div');
  var b4Group = block4.find('.pt-group >div');
  var b3Group = block3.find('.pt-group >div');
  var b2Group = block2.find('.pt-group >div');
  var b1Group = block1.find('.pt-group >div');
  var clearAllBtn = element.find('.clearAllBtn');
  var clearBtn = element.find('.clearBtn');


  function setT16Data(group,el){
    var index = fcstData.team16[group].map(function(e){ return e.id;}).indexOf(el.attr('data-id'));
    if(index>=0){
      fcstData.team16[group].splice(index,1);
    }else{
      fcstData.team16[group].push({
        'id':el.attr('data-id'),
        'num':el.attr('data-num'),
        'name':el.find('.name').text(),
        'flag':el.attr('data-flag')
      }); 
    }
  }

  function removeT32NumDom(dom){
    fcstStatus.t32 = false;
    block16.find('.'+dom+'').removeClass('set').find('.setCountry').stop().animate({
      top: block16.find('.'+dom+'').find('.setCountry').attr("data-Y")+'px',
      left: block16.find('.'+dom+'').find('.setCountry').attr("data-X")+'px',
      width: '288px'
    },350,function(){
      var timer = setTimeout(function(){
        block16.find('.'+dom+'').find('.setCountry').remove();
        fcstStatus.t32 = true;
      },200);
    });   
  }

  function removeT32Num(el,pNum){
    var num = pNum/1;
    var country = el.parent().find('.pt-country');
    var groupName = el.attr('data-group').toLowerCase();
    el.attr('data-num',0).find('.num').text(num);
    el.removeClass('selected').siblings().not('.selected').find('.num').text(num);
    el.parent().attr('data-num',num-1).removeClass('finish');
    if(num<3){
      removeT32NumDom((groupName+num)); 
      if(num==1){
        b16Group.removeClass('hover');
        for(var i=0; i<(country.length); i++){  
          if(country.eq(i).attr('data-num')== 2){
            removeT32NumDom((groupName+(num+1)));         
          }
        }
      }
    }  
    setT16Data(groupName.toUpperCase(),el);
    for(var i=0; i<(country.length); i++){    
      for(var j=1; j<=(country.length-num); j++){  
        if(country.eq(i).attr('data-num')== (num+j)){
          setT16Data(country.eq(i).attr('data-group'),country.eq(i));
          country.eq(i).attr('data-num',0).find('.num').text(num);
          country.eq(i).removeClass('selected');
        }
      }
    }
  }

  function moveWinner(el,target,teams,originalW,changeToW){
    var speed = 350;
    var dom;
    var disX = el.offset().left - target.offset().left;
    var disY = el.offset().top - target.offset().top;   
    if(teams=='t3'){
      dom ='<div class="setCountry" data-id="'+el.find('.setCountry').attr('data-id')+'" data-flag="'+el.find('.setCountry').attr('data-flag')+'"' 
            +'data-X="'+ disX +'" data-Y="'+ disY +'" style="position:absolute; left:'+ disX +'px; top:'+ disY +'px;">'
            +'<figure><img src="'+el.find('img').attr('src')+'" alt=""></figure>'
            +'<span class="name">'+ el.parent().find('.unchoose').find('.name').text() +'</span>'
            +'<span class="competition" data-result="1">胜</span>'
            +'</div>'
    }else{
      dom ='<div class="setCountry" data-id="'+el.find('.setCountry').attr('data-id')+'" data-flag="'+el.find('.setCountry').attr('data-flag')+'"' 
            +'data-X="'+ disX +'" data-Y="'+ disY +'" style="position:absolute; left:'+ disX +'px; top:'+ disY +'px;">'
            +'<figure><img src="'+el.find('img').attr('src')+'" alt=""></figure>'
            +'<span class="name">'+ el.parent().find('.active').find('.name').text() +'</span>'
            +'<span class="competition" data-result="1">胜</span>'
            +'</div>'
    }     

    target.addClass('set');
    function getStatus(teams){
      switch(teams){
        case 't16':
          fcstStatus.t16 = true;
          break;
        case 't8':
          fcstStatus.t8 = true;
          break;
        case 't4':
          fcstStatus.t4 = true;
          break; 
        case 't3':
          fcstStatus.t4 = true;
          break; 
        case 't2':
          fcstStatus.t2 = true;
          break;      
      }  
    }


    if(target.find('.setCountry').length>0){
      target.removeClass('set');
      var first = target.find('.setCountry').first();
      if(teams=='t2'){
        target.append(dom).find('.setCountry').css({width:originalW}).stop().animate({top:0,left:0,width:changeToW},speed)
              .end().find('img').css({width:'50px','margin-left':'9px'}).stop().animate({width:'154px','margin-left':'0px'},speed);
        first.find('img').css({width:'154px','margin-left':'0px'}).stop().animate({width:'50px','margin-left':'9px'},speed);    
        first.css({width:changeToW}).stop().animate({top: first.attr("data-Y")+'px',left: first.attr("data-X")+'px',width:originalW},speed,function(){
          var timer = setTimeout(function(){
            first.remove();
            target.addClass('set');
            getStatus(teams)
          },200);
        });
      }else{
        target.append(dom).find('.setCountry').css({width:originalW}).stop().animate({top:0,left:0,width:changeToW},speed); 
        first.css({width:changeToW}).stop().animate({top: first.attr("data-Y")+'px',left: first.attr("data-X")+'px',width:originalW},speed,function(){
          var timer = setTimeout(function(){
            first.remove();
            target.addClass('set');
            getStatus(teams)
          },200);
        });
      }
    }else{
      // 第一次敲
      if(teams=='t2'){
        target.append(dom).find('.setCountry').css({width:originalW}).stop().animate({top:0,left:0,width:changeToW},speed,function(){
          getStatus(teams)
        }).end().find('img').css({width:'50px','margin-left':'9px'}).stop().animate({width:'154px','margin-left':'0px'},speed);   
      }else{
        target.append(dom).find('.setCountry').css({width:originalW}).stop().animate({top:0,left:0,width:changeToW},speed,function(){
          getStatus(teams)
        });       
      }
    }  
  }

  function setWinnerData(group,el,target,teams){
    var array;
    var index;
    switch(teams){
      case 'T8':
        array = fcstData.team8[group];
        break;
      case 'T4':
        array = fcstData.team4[group];
        break;
      case 'T3':
        array = fcstData.team3[group];
        break;
      case 'T2':
        array = fcstData.team2[group];
        break;
      case 'Ttiird':
        array = fcstData.teamThird[group];
        fcstStatus.t3 = true;
        fcstStatus.t2 = true;
        break;
      case 'Tfinals':
        array = fcstData.teamFinals[group];
        break;
    }

    index = array.map(function(e){ return e.groupName;}).indexOf(group+el.parent().attr('data-item'));
    if(index>=0){ array.splice(index,1); }
    array.push({
      'id':target.attr('data-id'),
      'name':target.find('.name').text(),
      'flag':target.attr('data-flag'),
      'session': teams=='T3'? el.parent().attr('data-session')+'Lose': el.parent().attr('data-session')+'Win',
      'groupName': group+el.parent().attr('data-item'),
    }); 
  }

  function removeNonfinish(){
    if($(this).find('.active').length==1 && $(this).find('.unchoose').length==1){
      $(this).removeClass('nonefinish');
    }
  }
  
  function switchNonefinish(){
    if($(this).find('.active').length==1 && $(this).find('.unchoose').length==1){
      $(this).removeClass('nonefinish');
    }else{
      $(this).addClass('nonefinish');
    }
  }

  b32Country.off('click').on('click',function(){
    if(fcstStatus.t32){
      var self = $(this);
      var groupName = self.attr('data-group').toLowerCase();
      var grouplength = self.parent().find('.pt-country').length;
      var nextNum = self.siblings('.selected').length+1;
      if((self.parent().attr('data-num')/1)>=1){ self.parent().removeClass('nonefinish'); }
      if(!self.hasClass('selected')){
        if((self.parent().attr('data-num')/1)<2){  
          self.addClass('selected').attr('data-num', nextNum).find('.num').text(nextNum);  
          self.siblings().not('.selected').find('.num').text(nextNum+1);
          self.parent().attr('data-num',nextNum);
          fcstStatus.t32 = false;  
          var item16 = $(".block16").find('.'+groupName+nextNum+'').addClass('set');
          var disX = self.offset().left - item16.offset().left;
          var disY = self.offset().top - item16.offset().top;
          var dom = '<div class="setCountry" data-id="'+self.attr('data-id')+'" data-flag="'+self.attr('data-flag')+'"' 
                    +'data-X="'+ disX +'" data-Y="'+ disY +'" style="position:absolute; left:'+ disX +'px; top:'+ disY +'px;">'
                    +'<figure><img src="'+self.find('img').attr('src')+'" alt=""></figure>'
                    +'<span class="name">'+ self.find('.name').text() +'</span>'
                    +'<span class="competition" data-result="1">胜</span>'
                    +'</div>'
          item16.append(dom).find('.setCountry').css({width:'288px'}).stop().animate({top:0,left:0,width:'218px'},350,function(){ fcstStatus.t32 = true; });     
          setT16Data(self.attr('data-group'),self);        
        }
        if((self.parent().attr('data-num')/1)==2){
          self.parent().addClass('finish');
        }
      }else{
        removeT32Num(self,self.attr('data-num'));
      }     
    }
  }).hover(function(){
    var group = $(this).parent().attr('data-group').toLowerCase();
    var groupNum = ($(this).parent().attr('data-num')/1)+1;
    if(groupNum<3){
      if($(this).attr('data-num')!=='1'){
        block16.find('.'+group+groupNum+'').addClass('hover');
      }
    }
  },function(){
    var group = $(this).parent().attr('data-group').toLowerCase();
    var groupNum = ($(this).parent().attr('data-num')/1)+1;
    if(groupNum<3){
      block16.find('.'+group+groupNum+'').removeClass('hover');
    }
  });

  b16Group.off('click').on('click',function(){
    var self = $(this);
    var keys = Object.keys(fcstData.team16);
    var g16 = 0;     
    for(var i=0; i<keys.length; i++){
      for(var j=0; j<fcstData.team16[keys[i]].length; j++){
        g16++;
      }
    }  
    if(self.hasClass('set')){
      if(g16==16){
        if(fcstStatus.t16 && self.parent().find('.setCountry').length>1 && !self.hasClass('active')){
          fcstStatus.t32 = false;
          fcstStatus.t16 = false;
          if(halfFcstData==null){
            // copy teams16 data for clear half
            halfFcstData = $.extend(true,{},fcstData);
          }
          var name = self.parent().attr('data-group');
          var num = self.parent().attr('data-item');
          self.siblings().removeClass('active').addClass('unchoose').find('.competition').attr('data-result',0);
          self.removeClass('unchoose').toggleClass('active').find('.competition').attr('data-result',1);
          moveWinner(self,block8.find('.'+name+num+''),'t16','218px','178px');
          setWinnerData(name,self,self.find('.setCountry'),'T8'); 
        }
        b16Group.parent('.pt-group').each(removeNonfinish); 
      }else{
        self.find('.setCountry').removeClass('active'); 
        block32.each(function(){
          if($(this).attr('data-num')!='2'){
            $(this).addClass('nonefinish');
            if($(".nonefinish").length>0){
              $('html, body').stop().animate({scrollTop:$('.th-finals .blockCont').offset().top - 50},500);
              $('.th-finals .md-mask').addClass('show').find('.text').text('请完成32強预测');              
            }
          }else{
            $(this).removeClass('nonefinish');
          }
        });
      }     
    }
  });

  b8Group.off('click').on('click',function(){
    var self = $(this);
    var keys = Object.keys(fcstData.team8);
    var g8 = 0;     
    for(var i=0; i<keys.length; i++){
      for(var j=0; j<fcstData.team8[keys[i]].length; j++){
        g8++;
      }
    } 
    if(g8==8){
      if(fcstStatus.t8  && !self.hasClass('active')){
        fcstStatus.t16 = false;
        fcstStatus.t8 = false;
        var name = self.parent().attr('data-group');
        var num = self.parent().attr('data-item');
        self.siblings().removeClass('active').addClass('unchoose').find('.competition').attr('data-result',0);
        self.removeClass('unchoose').toggleClass('active').find('.competition').attr('data-result',1);
        moveWinner(self,block4.find('.'+name+num+''),'t8','178px','178px');
        setWinnerData(name,self,self.find('.setCountry'),'T4');  
      }
      b8Group.parent('.pt-group').each(removeNonfinish);
    }else{
      if(self.hasClass('set')){
        $('.th-finals .md-mask').addClass('show').find('.text').text('请完成16強预测');  
        b16Group.parent('.pt-group').each(switchNonefinish);
      }
    }
  });

  b4Group.off('click').on('click',function(){
    var self = $(this);
    var keys = Object.keys(fcstData.team4);
    var g4 = 0;     
    for(var i=0; i<keys.length; i++){
      for(var j=0; j<fcstData.team4[keys[i]].length; j++){
        g4++;
      }
    } 
    if(g4==4){
      if(fcstStatus.t4  && !self.hasClass('active')){
        fcstStatus.t8 = false;
        fcstStatus.t4 = false;
        fcstStatus.t2 = false;
        var name = self.parent().attr('data-group');
        var num = self.parent().attr('data-item');
        self.siblings().removeClass('active').addClass('unchoose').find('.competition').attr('data-result',0);
        self.removeClass('unchoose').toggleClass('active').find('.competition').attr('data-result',1);
        moveWinner(self,block2.find('.'+name+num+''),'t4','178px','100px');
        setWinnerData(name,self,self.find('.setCountry'),'T2');  
        moveWinner(self.siblings(), block3.find('.'+name+(num/1+1)+ ''),'t3','178px', '238px');
        setWinnerData(name,self.siblings(),self.siblings().find('.setCountry'),'T3');  
      }
      b4Group.parent('.pt-group').each(removeNonfinish); 
    }else{
      if(self.hasClass('set')){
        $('.th-finals .md-mask').addClass('show').find('.text').text('请完成8強预测');  
        b8Group.parent('.pt-group').each(switchNonefinish);
      }
    }
  });

  b3Group.off('click').on('click',function(){
    var self = $(this);
    var keys = Object.keys(fcstData.team3);
    var g3 = 0;
    for(var i=0; i<keys.length; i++){
      for(var j=0; j<fcstData.team3[keys[i]].length; j++){
        g3++;
      }
    } 
    if(g3==2){
      if(fcstStatus.t3  && !self.hasClass('active')){
        fcstStatus.t4 = false;
        fcstStatus.t3 = false;
        fcstStatus.t2 = false;
        var name = self.parent().attr('data-group');
        var num = self.parent().attr('data-item');
        self.siblings().removeClass('active').addClass('unchoose').find('.competition').attr('data-result',0);
        self.removeClass('unchoose').toggleClass('active').find('.competition').attr('data-result',1);
        setWinnerData(name,self,self.find('.setCountry'),'Ttiird');  
        b3Group.parent('.pt-group').each(removeNonfinish); 
      }
    }else{
      if(self.hasClass('set')){
        $('.th-finals .md-mask').addClass('show').find('.text').text('请完成4強预测');  
        b4Group.parent('.pt-group').each(switchNonefinish);        
      }
    }
  });

  b2Group.off('click').on('click',function(){
    var self = $(this);
    var keys = Object.keys(fcstData.team2);
    var g2 = 0;     
    for(var i=0; i<keys.length; i++){
      for(var j=0; j<fcstData.team2[keys[i]].length; j++){
        g2++;
      }
    } 
    if(g2==2){
      if(fcstStatus.t2){
        if(!self.hasClass('active')){
          fcstStatus.t3 = false;
          fcstStatus.t2 = false;
          fcstStatus.t1 = true;
          $('.md-submitBtn input').get(0).disabled = false;
          var name = self.parent().attr('data-group');
          var num = self.parent().attr('data-item');
          self.siblings().removeClass('active').addClass('unchoose').find('.competition').attr('data-result',0);
          self.removeClass('unchoose').toggleClass('active').find('.competition').attr('data-result',1);
          moveWinner(self,block1.find('.'+name+num+''),'t2','100px','160px');
          setWinnerData(name,self,self.find('.setCountry'),'Tfinals');  
        }
      }else{
        if(!fcstStatus.t1){
          b3Group.parent('.pt-group').addClass('nonefinish');  
          $('.th-finals .md-mask').addClass('show').find('.text').text('请完成半决赛強预测');  
        }
      }
    }else{
      if(self.hasClass('set')){
        $('.th-finals .md-mask').addClass('show').find('.text').text('请完成4強预测');  
        b4Group.parent('.pt-group').each(switchNonefinish);        
      }
    }
  });

  clearAllBtn.off('click').on('click',function(){
    if(element.find('.setCountry').length>0){
      $('.md-submitBtn input').get(0).disabled = true;
      $('html, body').stop().animate({scrollTop:element.find('.gpmdCont').offset().top - 50},500);
      element.find('.gpmdCont').empty().append(copyAllFormDom);
      fcstData = $.extend(true, {}, clearfcstDate);
      fcstStatus = $.extend(true,{},clearfcstStatus);
      element.getForecastForm();
    }  
  });

  clearBtn.off('click').on('click',function(){
    if(halfFcstData!=null){
      $('.md-submitBtn input').get(0).disabled = true;
      $('html, body').stop().animate({scrollTop:element.find('.md-finalsForm').offset().top - 50},500);
      element.find('.forClearHalf').empty().append(copyHalfFormDom);
      b16Group.removeClass('unchoose active').find(".competition").attr('data-result',0);
      fcstData = $.extend(true, {}, halfFcstData);
      fcstStatus = $.extend(true,{},clearfcstStatus);
      halfFcstData = null;
      element.getForecastForm();
    }
  });

  return element;
}




// call form function 
// $('.th-finals').getForecastForm();


// 送出預測資料
function switchFinalsPop() {
  if (!$('.th-finalsPop').hasClass('show')) {
    $('.th-finalsPop').addClass('show');
  } else {
    $('.th-finalsPop').removeClass('show');
  }
}
function getForecastData(){
  if(fcstStatus.t1){
    switchFinalsPop();
    fcstStatus.t2 = false;
    return fcstData;
  }
}
$('.md-submitBtn input').on('click', getForecastData);
$('.th-finalsPop ,.th-finalsPop .pt-close ,.th-finalsPop .btn-close').on('click', switchFinalsPop);
$('.th-finalsPop .md-finalsPop').on('click', function(e) { e.stopPropagation(); });




// ---------------------將使用者已經預測的資料寫回預測表------------------
// 暫用假資料demo
var userData = {
	"team16": {
		"A": [
			{
				"id": "1",
				"num": "1",
				"name": "俄罗斯",
				"flag": "RUS"
			},
			{
				"id": "4",
				"num": "2",
				"name": "乌拉圭",
				"flag": "URU"
			}
		],
		"B": [
			{
				"id": "6",
				"num": "1",
				"name": "西班牙",
				"flag": "ESP"
			},
			{
				"id": "5",
				"num": "2",
				"name": "葡萄牙",
				"flag": "POR"
			}
		],
		"C": [
			{
				"id": "9",
				"num": "1",
				"name": "法国",
				"flag": "FRA"
			},
			{
				"id": "10",
				"num": "2",
				"name": "澳大利亚",
				"flag": "AUS"
			}
		],
		"D": [
			{
				"id": "13",
				"num": "1",
				"name": "阿根廷",
				"flag": "ARG"
			},
			{
				"id": "15",
				"num": "2",
				"name": "克罗地亚",
				"flag": "CRO"
			}
		],
		"E": [
			{
				"id": "17",
				"num": "1",
				"name": "巴西",
				"flag": "BRA"
			},
			{
				"id": "19",
				"num": "2",
				"name": "哥斯达黎加",
				"flag": "CRC"
			}
		],
		"F": [
			{
				"id": "21",
				"num": "1",
				"name": "德国",
				"flag": "GER"
			},
			{
				"id": "23",
				"num": "2",
				"name": "瑞典",
				"flag": "SWE"
			}
		],
		"G": [
			{
				"id": "25",
				"num": "1",
				"name": "比利时",
				"flag": "BEL"
			},
			{
				"id": "28",
				"num": "2",
				"name": "英格兰",
				"flag": "ENG"
			}
		],
		"H": [
			{
				"id": "30",
				"num": "1",
				"name": "塞内加尔",
				"flag": "SEN"
			},
			{
				"id": "32",
				"num": "2",
				"name": "日本",
				"flag": "JPN"
			}
		]
	},
	"team8": {
		"A": [
			{
				"id": "5",
				"name": "葡萄牙",
				"flag": "POR",
				"session": "49Win",
				"groupName": "A1"
			},
			{
				"id": "9",
				"name": "法国",
				"flag": "FRA",
				"session": "50Win",
				"groupName": "A2"
			}
		],
		"B": [
			{
				"id": "17",
				"name": "巴西",
				"flag": "BRA",
				"session": "53Win",
				"groupName": "B1"
			},
			{
				"id": "25",
				"name": "比利时",
				"flag": "BEL",
				"session": "54Win",
				"groupName": "B2"
			}
		],
		"C": [
			{
				"id": "13",
				"name": "阿根廷",
				"flag": "ARG",
				"session": "52Win",
				"groupName": "C2"
			},
			{
				"id": "6",
				"name": "西班牙",
				"flag": "ESP",
				"session": "51Win",
				"groupName": "C1"
			}
		],
		"D": [
			{
				"id": "28",
				"name": "英格兰",
				"flag": "ENG",
				"session": "56Win",
				"groupName": "D2"
			},
			{
				"id": "21",
				"name": "德国",
				"flag": "GER",
				"session": "55Win",
				"groupName": "D1"
			}
		]
	},
	"team4": {
		"A": [
			{
				"id": "17",
				"name": "巴西",
				"flag": "BRA",
				"session": "58Win",
				"groupName": "A2"
			},
			{
				"id": "9",
				"name": "法国",
				"flag": "FRA",
				"session": "57Win",
				"groupName": "A1"
			}
		],
		"B": [
			{
				"id": "13",
				"name": "阿根廷",
				"flag": "ARG",
				"session": "59Win",
				"groupName": "B1"
			},
			{
				"id": "21",
				"name": "德国",
				"flag": "GER",
				"session": "60Win",
				"groupName": "B2"
			}
		]
	},
	"team3": {
		"A": [
			{
				"id": "9",
				"name": "法国",
				"flag": "FRA",
				"session": "61Lose",
				"groupName": "A1"
			}
		],
		"B": [
			{
				"id": "13",
				"name": "阿根廷",
				"flag": "ARG",
				"session": "62Lose",
				"groupName": "B1"
			}
		]
	},
	"team2": {
		"A": [
			{
				"id": "17",
				"name": "巴西",
				"flag": "BRA",
				"session": "61Win",
				"groupName": "A1"
			}
		],
		"B": [
			{
				"id": "21",
				"name": "德国",
				"flag": "GER",
				"session": "62Win",
				"groupName": "B1"
			}
		]
	},
	"teamThird": {
		"A": [
			{
				"id": "13",
				"name": "阿根廷",
				"flag": "ARG",
				"session": "63Win",
				"groupName": "A1"
			}
		]
	},
	"teamFinals": {
		"A": [
			{
				"id": "17",
				"name": "巴西",
				"flag": "BRA",
				"session": "64Win",
				"groupName": "A1"
			}
		]
	}
}

function setForecastForm(data){
  fcstStatus.t32 = false;
  fcstStatus.t16 = false;
  fcstStatus.t8 = false;
  fcstStatus.t4 = false;
  fcstStatus.t3 = false;
  fcstStatus.t2 = false;
  var t16keys = Object.keys(data.team16);
  var t8keys = Object.keys(data.team8);
  var t4keys = Object.keys(data.team4);
  var t3keys = Object.keys(data.team3);
  var t2keys = Object.keys(data.team2);
  var tThirdkeys = Object.keys(data.teamThird);
  var tFinalskeys = Object.keys(data.teamFinals);
  var dom ="";
  
  // for teams 8,4,2 and Finals
  function chooseWiner(keys, winer, fromDom, nowDom){
    for(var k=0; k<keys.length; k++){
      for(var m=0; m<winer[keys[k]].length; m++){
        // handle the view for choose nowDom frome 'fromDom';
        fromDom.each(function(){
          if( ($(this).attr('data-group')+$(this).attr('data-item')) == winer[keys[k]][m].groupName ){
            $(this).find('>div').each(function(){
              if($(this).find(".setCountry").attr('data-id') == winer[keys[k]][m].id){
                $(this).addClass('active');
                $(this).siblings().addClass('unchoose').find('.competition').attr('data-result',0);
              }            
            });
          }
        });
  
        // repeat temas nowDom
        nowDom.each(function(){
          if($(this).attr('class') == winer[keys[k]][m].groupName){
            dom ='<div class="setCountry" data-id="' + winer[keys[k]][m].id +'" data-flag="'+winer[keys[k]][m].flag+'">'
                  +'<figure><img src="images/flag/'+ winer[keys[k]][m].flag +'.png" alt=""></figure>'
                  +'<span class="name">'+ winer[keys[k]][m].name +'</span>'
                  +'<span class="competition" data-result="1">胜</span>'
                  +'</div>'  
            $(this).addClass('set').append(dom);
            dom = "";
          }
        })
      } 
    }
  }


  // for teams16
  $(".block32").addClass('finish').attr('data-num',2);
  for(var i=0; i<t16keys.length; i++){
    for(var j=0; j<data.team16[t16keys[i]].length; j++){
      // handle the view for choose 16 from 32
      $(".block32 .pt-country").each(function(){
        if($(this).attr('data-id') == data.team16[t16keys[i]][j].id){
          $(this).addClass('selected').attr('data-num',data.team16[t16keys[i]][j].num)
          .find('.num').text(data.team16[t16keys[i]][j].num)
        }        
      });
      // repeat teams16 
      $(".block16 .pt-group>div").each(function(){
        if($(this).attr('class') == (t16keys[i].toLocaleLowerCase()+data.team16[t16keys[i]][j].num)){
          dom ='<div class="setCountry" data-id="' + data.team16[t16keys[i]][j].id +'" data-flag="'+data.team16[t16keys[i]][j].flag+'">'
                +'<figure><img src="images/flag/'+ data.team16[t16keys[i]][j].flag +'.png" alt=""></figure>'
                +'<span class="name">'+ data.team16[t16keys[i]][j].name +'</span>'
                +'<span class="competition" data-result="1">胜</span>'
                +'</div>'          
          $(this).addClass('hover set').append(dom);
          dom = "";
        }
      });             
    }   
  }

  chooseWiner(t8keys, data.team8, $(".block16 .pt-group"), $(".block8 .pt-group>div"));
  chooseWiner(t4keys, data.team4, $(".block8 .pt-group"), $(".block4 .pt-group>div"));
  chooseWiner(t2keys, data.team2, $(".block4 .pt-group"), $(".block2 .pt-group>div"));
  chooseWiner(tFinalskeys, data.teamFinals, $(".block2 .pt-group"), $(".block1 .pt-group>div"));

  // for teams3 and third 
  for(var k=0; k<t3keys.length; k++){
    for(var m=0; m<data.team3[t3keys[k]].length; m++){
      $(".block3 .pt-group>div").each(function(){
        if(($(this).attr('class').slice(0,1)+1) == data.team3[t3keys[k]][m].groupName){
          dom ='<div class="setCountry" data-id="' + data.team3[t3keys[k]][m].id +'" data-flag="'+data.team3[t3keys[k]][m].flag+'">'
                +'<figure><img src="images/flag/'+ data.team3[t3keys[k]][m].flag +'.png" alt=""></figure>'
                +'<span class="name">'+ data.team3[t3keys[k]][m].name +'</span>'
                +'<span class="competition" data-result="1">胜</span>'
                +'</div>'  
          $(this).addClass('set').append(dom);
          dom = "";
        }
        if($(this).find(".setCountry").attr('data-id') == data.teamThird["A"][0].id){
          $(this).addClass('active');
          $(this).siblings().addClass('unchoose').find('.competition').attr('data-result',0);
        }         
      })
    } 
  }
}

// 將使用者已經預測的資料呼叫setForecastForm()寫回預測表
// setForecastForm(userData);