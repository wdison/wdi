(function(global) {
    var wdi = global.wdi = global.wdi || {};
    wdi.Speech = wdi.Speech || initializerSpeechFunction

    function initializerSpeechFunction(confInput){
        var defaultConf = {'id':'idSpeech','el':undefined,'text':undefined,on:{'play':undefined,'stop':undefined,'pause':undefined}};
        var conf = {};
        conf = Object.assign(conf,defaultConf);
        conf = Object.assign(conf,confInput);
        var elementsCtrl = {play:undefined,progress:undefined};
        
        var elSpeechContainer = conf.el;
        if(!elSpeechContainer)elSpeechContainer = document.getElementById(conf.id);
        if(!elSpeechContainer){
            console.error("speechContainer does not be created because does not exists element with id "+conf.id);
            return;
        } else {
            //TODO create ctrls here
            elSpeechContainer.innerHTML = '<div class="speechMedia">'
                                          +'      <span class=speechMediaPlay ><svg xmlns="http://www.w3.org/2000/svg" style="width: 1em;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></span>'
                                          +'      <span class=speechMediaPause style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" style="width: 1em;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" class="svg-inline--fa fa-pause fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg></span>'
                                          +'      <span class=speechMediaStop ><svg xmlns="http://www.w3.org/2000/svg" style="width: 1em;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" class="svg-inline--fa fa-stop fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path></svg></span>'
                                          +'      <input class=speechMediaProgress type="range" value="0" min="0" step="1" max="100">'
                                          +'      <span class=speechMediaMenuConf ><svg xmlns="http://www.w3.org/2000/svg" style="width: 0.5em;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-v" class="svg-inline--fa fa-ellipsis-v fa-w-6" role="img" viewBox="0 0 192 512"><path fill="currentColor" d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"/></svg></span>'
                                          +'</div>'
                                          +'<div class="speechConf" style="display: none;">'
                                          +'      <label>Voice: <select class=speechConfVoice></select></label><br>'
                                          +'      <label>Rate: <input class=speechConfRate type="range" min="1" value="40" step="1" max="100"></label><br>'
                                          +'      <label>Pitch: <input class=speechConfPitch type="range" min="0" value="50" step="1" max="100"></label>'
                                          +'</div>';
            
            elementsCtrl.container = elSpeechContainer;
            elementsCtrl.play = elementsCtrl.container.getElementsByClassName('speechMediaPlay')[0];
            elementsCtrl.pause = elementsCtrl.container.getElementsByClassName('speechMediaPause')[0];
            elementsCtrl.stop = elementsCtrl.container.getElementsByClassName('speechMediaStop')[0];
            elementsCtrl.progress = elementsCtrl.container.getElementsByClassName('speechMediaProgress')[0];
            elementsCtrl.menuConf = elementsCtrl.container.getElementsByClassName('speechMediaMenuConf')[0];
            elementsCtrl.containerConf = elementsCtrl.container.getElementsByClassName('speechConf')[0];
            elementsCtrl.voice = elementsCtrl.container.getElementsByClassName('speechConfVoice')[0];
            elementsCtrl.rate = elementsCtrl.container.getElementsByClassName('speechConfRate')[0];
            elementsCtrl.pitch = elementsCtrl.container.getElementsByClassName('speechConfPitch')[0];
        }

        var speechCtrl = 
        {
            pause: wdiPause,
            stop: wdiStop,
            resume: wdiResume,
            play: wdiPlay,
            configVoice: wdiConfigVoice,
            config: undefined,
            setText: wdiSetText
        }


        elementsCtrl.progress.addEventListener('change', wdiSpeechProgressChange);
        elementsCtrl.menuConf.addEventListener('click', wdiSpeechMenuConfClick);

        setTimeout(function(){
            voicesPopulate();
            elementsCtrl.play.addEventListener('click', speechCtrl.play);
            elementsCtrl.pause.addEventListener('click', speechCtrl.pause);
            elementsCtrl.stop.addEventListener('click', speechCtrl.stop);
        }, 3000);

        function wdiSpeechMenuConfClick(event){
            if(elementsCtrl.isMenuConf){
                elementsCtrl.containerConf.style.display = 'none';
            }else{
                elementsCtrl.containerConf.style.display = 'contents';
            }
            elementsCtrl.isMenuConf = !elementsCtrl.isMenuConf;
        }

        function wdiSpeechProgressChange(event){
            if(conf.text && conf.text.length){
                var progress_index = event.currentTarget.value||0;
                var text = conf.text;
                reInitPlaySpeech(text, progress_index);
            }
        }

        function reInitPlaySpeech(text, progress_index) {
            var msgConfig = speechCtrl.config;

            if(!msgConfig){
                msgConfig = configMsgConfig();
            }

            speechCtrl.stop();
            setTimeout(()=>{
                speechCtrl.config = msgConfig;
                speechCtrl.configVoice();

                var previous_space = text.lastIndexOf( ' ', progress_index );
                speechCtrl.config.text = text.slice( previous_space );

                speechSynthesis.speak(speechCtrl.config);
                speechCtrl.config.paused = false;

                isPlayCtrlToogleEvent(true);
            }, 800);
        }

        function wdiPause() {
            speechCtrl.config&&speechCtrl.config.paused = true;
            isPlayCtrlToogleEvent(false);
            conf.on.pause&&conf.on.pause();
            speechSynthesis&&speechSynthesis.pause();
        }

        function wdiStop() {
            speechSynthesis&&speechSynthesis.cancel();
            speechCtrl.config = undefined;
            isPlayCtrlToogleEvent(false);
            conf.on.stop&&conf.on.stop();
        }

        function wdiResume() {
            var progress_index = speechCtrl.config.progress_index||0;
            var text = conf.text;
            reInitPlaySpeech(text, progress_index);
        }

        function wdiPlay() {
            if(speechSynthesis.speaking && speechCtrl.config) {
                if(speechCtrl.config.paused) {
                    /*pretencao: 'speechCtrl.resume();'*/
                    speechCtrl.resume();
                    conf.on.play&&conf.on.play();
                } else {
                    console.log('áudio em andamento!');
                }
            }else{
                var msgConfig = configMsgConfig();
                speechSynthesis.speak(msgConfig);
                conf.on.play&&conf.on.play();
            }
            isPlayCtrlToogleEvent(true);
        }

        function configMsgConfig(){
            var text = conf.text;
            var msgConfig = new SpeechSynthesisUtterance(text);
            speechCtrl.config = msgConfig;

            speechCtrl.configVoice();

            msgConfig = speechCtrl.config;

            msgConfig.text = text;
            msgConfig.fullText = text;
            msgConfig.origTextLength = (text||"").length;

            elementsCtrl.progress.max =  msgConfig.origTextLength;
            elementsCtrl.progress.value = 0;

            msgConfig.onend = function(e) {
                /*console.log('Finished in ' + event.elapsedTime + ' seconds.');*/
                elementsCtrl.progress.value = msgConfig.origTextLength;
                speechCtrl.config = undefined;
                speechCtrl.stop();
            };

            msgConfig.onboundary = function( e ) {
                if ( e.name == 'word' ) {
                    setTimeout(()=>{
                        if(speechCtrl.config){
                            speechCtrl.config.progress_index=e.charIndex;
                            speechCtrl.config.progress_total_index=e.charIndex + (speechCtrl.config.origTextLength - speechCtrl.config.text.length);
                            elementsCtrl.progress.value = speechCtrl.config.progress_total_index;
                        }
                    }, 50);
                }
            };

            return msgConfig;
        }

        function wdiConfigVoice() {
            var msgConfig = speechCtrl.config;
            var voices = global.speechSynthesis.getVoices();
            msgConfig.voice = voices[elementsCtrl.voice.value];
            if(!msgConfig.voice) {
                voices.forEach(function(voice, index) {
                    if(voice.default) {
                        msgConfig.voice = voice;
                    }
                });
            }

            /*TODO implementar volume*/
            msgConfig.lang = msgConfig.voice.lang;
            msgConfig.voice.default = true;

            var name = msgConfig.voice.name.toUpperCase();
            if(name.indexOf('GOOGLE')!=-1) {
                msgConfig.rate = elementsCtrl.rate.value / 50;
                msgConfig.pitch = elementsCtrl.pitch.value / 50;
            }else if(name.indexOf('MICROSOFT')!=-1) {
                msgConfig.rate = elementsCtrl.rate.value / 10;
                msgConfig.pitch = elementsCtrl.pitch.value / 50;
            }else if(/Android|webOS|Opera Mini/i.test(navigator.userAgent)) {
                msgConfig.rate = elementsCtrl.rate.value / 15;
                msgConfig.pitch = elementsCtrl.pitch.value / 50;
            }else if(/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                msgConfig.rate = elementsCtrl.rate.value / 60;
                msgConfig.pitch = elementsCtrl.pitch.value / 50;
            } else {
                console.log('Rate and Pitch only work with native voice.');
                msgConfig.rate = -1;
                msgConfig.pitch = -1;
            }
        }

        function wdiSetText(text){
            if(text){
                conf.text = text;
            }
        }

        function isPlayCtrlToogleEvent(isPlay){
            if(isPlay){
                elementsCtrl.play.style.display = 'none';
                elementsCtrl.pause.style.display = 'contents';
            }else{
                elementsCtrl.play.style.display = 'contents';
                elementsCtrl.pause.style.display = 'none';
            }
        }

        /*let timeoutInit = 3000;*/
        speechSynthesis.onvoiceschanged = voicesPopulate;

        function voicesPopulate() {
            /*setTimeout(function(){*/
                // var $voicelist = jQuery('#voices');
                var $voicelist = elementsCtrl.voice;

                if($voicelist.length == 0) {
                    var optionsHtml = '';
                    speechSynthesis.getVoices().forEach(function(voice, index) {
                        optionsHtml+='<option value="'+index+'">'+voice.name + (voice.default ? ' (default)' :'')+'</option>';
                    });
                    $voicelist.innerHTML = optionsHtml;
                }
        }

        return speechCtrl;
    }

    function createElement(elCreateConf){
        var elemento = document.createElement(elCreateConf.name);
        if(elCreateConf.id)elemento.id = elCreateConf.id;
        if(elCreateConf.class)elemento.class = elCreateConf.class;
        if(elCreateConf.type)elemento.type = elCreateConf.type;
        if(elCreateConf.min || elCreateConf.min === 0)elemento.min = elCreateConf.min;
        if(elCreateConf.step)elemento.step = elCreateConf.step;
        if(elCreateConf.max)elemento.max = elCreateConf.max;
        if(elCreateConf.value || elCreateConf.value === 0)elemento.value = elCreateConf.value;
        if(elCreateConf.text)elemento.appendChild(document.createTextNode(elCreateConf.text));
        if(elCreateConf.html)elemento.innerHTML = elCreateConf.html;
        if(elCreateConf.style){
            Object.keys(elCreateConf.style)
            .forEach(function eachKey(key) { 
                elemento.style[key]=elCreateConf.style[key];
            });
        }
        return elemento;
    }


})(this||{});