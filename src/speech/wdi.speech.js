/*
Exemplo para incluir em qualquer site

////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// INICIO EXEMPLO DE INCLUSÂO A PAGINA ///////////////////////
function init(o){var i = undefined;o=o||{id:i, classe:i};
    var e = document.createElement('script');e.type = 'text/javascript';
    e.onload = function() {_OnLoadByConsole({id:o.id, classe:o.classe});}
    e.setAttribute('src','https://wdison.github.io/wdi/src/speech/wdi.speech.js');
    document.head.append(e);
}
init();
////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// FIM EXEMPLO DE INCLUSÂO A PAGINA ///////////////////////
*/



function _OnLoadByConsole(conf){
    window.wdiSpeech = undefined;
    ////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// INICIO EXEMPLO DE INCLUIR TEXTO PARA LEITURA ///////////////////////
    function playText(text){
        //wdiSpeech.setText(a.innerText, 95);
        wdiSpeech.setText(text, 95);
        wdiSpeech.stop();
        setTimeout(function(){
            wdiSpeech.play();
        },200);
    }

    function incluirTexto_E_Play(conf){
        conf = conf || {};
        setTimeout(function(){

            //Por classe
            if(conf.classe){
                var e = document.getElementsByClassName(conf.classe)[0];
                if(e)
                    playText(e.innerText);
                else
                    playText('Não foi encontrado nenhuma classe '+conf.classe);
            }

            //Por ID
            if(conf.id){
                var e = document.getElementById(conf.id);
                if(e)
                    playText(e.innerText);
                else
                    playText('Não foi encontrado nenhum ID '+conf.id);
            }
        }, 3000);
    }
    ////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// FIM EXEMPLO DE INCLUIR TEXTO PARA LEITURA ///////////////////////

    function createSpeechContainer(idStr){
        var _divId = document.getElementById(idStr);
        if(!_divId){
            _divId = document.createElement('div');
            _divId.setAttribute('id', idStr);
            _divId.style.position = 'fixed';
            // _divId.style.width = '100%';
            _divId.style.padding = '8px 5px 10px 15px';
            _divId.style.bottom = '0px';
            _divId.style.left = '0px';
            _divId.style.backgroundColor = '#c8c8c8a1';
            document.body.append(_divId);
        }
    }
    let idSpeechContainer = 'speechContainer';
    createSpeechContainer(idSpeechContainer);

    let param = {id:idSpeechContainer,text:'Audio configurado!'}
    window.wdiSpeech = window['wdi'].Speech(param);

    // wdiSpeech.setText(this.card.message);
    // wdiSpeech.stop();
    
    setTimeout(function(){
        wdiSpeech.play();
    },10);

    //incluirTexto_E_Play({id:undefined, classe:undefined})
    incluirTexto_E_Play(conf)
}



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
            elSpeechContainer.innerHTML = '<div class="speechMedia" style="position: relative;">'
                                          +'      <span class=toogleGetContent ><svg xmlns="http://www.w3.org/2000/svg" style="width: 1em;" aria-hidden="true" focusable="false" viewBox="0 0 448 512"><path d="M256 464c114.9 0 208-93.1 208-208s-93.1-208-208-208S48 141.1 48 256c0 5.5 .2 10.9 .6 16.3L1.8 286.1C.6 276.2 0 266.2 0 256C0 114.6 114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256c-10.2 0-20.2-.6-30.1-1.8l13.8-46.9c5.4 .4 10.8 .6 16.3 .6zm-2.4-48l14.3-48.6C324.2 361.4 368 313.8 368 256c0-61.9-50.1-112-112-112c-57.8 0-105.4 43.8-111.4 100.1L96 258.4c0-.8 0-1.6 0-2.4c0-88.4 71.6-160 160-160s160 71.6 160 160s-71.6 160-160 160c-.8 0-1.6 0-2.4 0zM39 308.5l204.8-60.2c12.1-3.6 23.4 7.7 19.9 19.9L203.5 473c-4.1 13.9-23.2 15.6-29.7 2.6l-28.7-57.3c-.7-1.3-1.5-2.6-2.5-3.7l-88 88c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l88-88c-1.1-1-2.3-1.9-3.7-2.5L36.4 338.2c-13-6.5-11.3-25.6 2.6-29.7z"></path></svg></span>'
                                          +'      <span class=speechMediaPlay ><svg xmlns="http://www.w3.org/2000/svg" style="width: 1em;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" class="svg-inline--fa fa-play fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></span>'
                                          +'      <span class=speechMediaPause style="display: none;"><svg xmlns="http://www.w3.org/2000/svg" style="width: 1em;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" class="svg-inline--fa fa-pause fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg></span>'
                                          +'      <span class=speechMediaStop ><svg xmlns="http://www.w3.org/2000/svg" style="width: 1em;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="stop" class="svg-inline--fa fa-stop fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"></path></svg></span>'
                                          +'      <input class=speechMediaProgress type="range" value="0" min="0" step="1" max="100">'
                                          +'      <span class=speechMediaMenuConf style="float: right;"><svg xmlns="http://www.w3.org/2000/svg" style="width: 0.5em;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-v" class="svg-inline--fa fa-ellipsis-v fa-w-6" role="img" viewBox="0 0 192 512"><path fill="currentColor" d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"/></svg></span>'
                                          +'</div>'
                                          +'<div class="speechConf" style="display: none;">'
                                          +'      <label>Voice: <select class=speechConfVoice></select></label><br>'
                                          +'      <label>Rate: <input class=speechConfRate type="range" min="1" value="40" step="1" max="100"></label><br>'
                                          +'      <label>Pitch: <input class=speechConfPitch type="range" min="0" value="50" step="1" max="100"></label>'
                                          +'</div>';

            elementsCtrl.container = elSpeechContainer;
            elementsCtrl.toogleGetContent = elementsCtrl.container.querySelector('.toogleGetContent');
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
            setText: wdiSetText,
            toogleGetContent: wdiToogleGetContent
        }


        elementsCtrl.progress.addEventListener('change', wdiSpeechProgressChange);
        elementsCtrl.menuConf.addEventListener('click', wdiSpeechMenuConfClick);

        setTimeout(function(){
            voicesPopulate();
            elementsCtrl.toogleGetContent.addEventListener('click', speechCtrl.toogleGetContent);
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
            if(speechCtrl.config)speechCtrl.config.paused = true;
            isPlayCtrlToogleEvent(false);
            if(conf.on.pause)conf.on.pause();
            if(speechSynthesis)speechSynthesis.pause();
        }

        function wdiStop() {
            if(speechSynthesis)speechSynthesis.cancel();
            speechCtrl.config = undefined;
            isPlayCtrlToogleEvent(false);
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
                    if(conf.on.play)conf.on.play();
                } else {
                    console.log('áudio em andamento!');
                }
            }else{
                var msgConfig = configMsgConfig();
                speechSynthesis.speak(msgConfig);
                if(conf.on.play)conf.on.play();
            }
            isPlayCtrlToogleEvent(true);
        }
        
        function wdiToogleGetContent(event) {
            event.preventDefault();
            event.stopPropagation();
            if (speechCtrl.isGettingContent) {
                speechCtrl.isGettingContent = false;
                elementsCtrl.toogleGetContent.firstChild.style.fill = 'black';
                
                // Remove event listeners de todos os elementos quando isGettingContent for false
                document.querySelectorAll('*').forEach(element => {
                    element.removeEventListener('mouseover', handleMouseOver);
                    element.removeEventListener('click', handleClick);
                });
            } else {
                speechCtrl.isGettingContent = true;
                elementsCtrl.toogleGetContent.firstChild.style.fill = 'blue';
                
                // Adicionar event listeners a todos os elementos
                document.querySelectorAll('*').forEach(element => {
                    element.addEventListener('mouseover', handleMouseOver);
                    element.addEventListener('click', handleClick);
                });
                elementsCtrl.container.removeEventListener('mouseover', handleMouseOver);
                elementsCtrl.container.removeEventListener('click', handleClick);
                elementsCtrl.container.querySelectorAll('*').forEach(element => {
                    element.removeEventListener('mouseover', handleMouseOver);
                    element.removeEventListener('click', handleClick);
                });
            }
        }
        
        // Função para realçar o elemento com mouseover
        function handleMouseOver(event) {
            // Remover realce de todos os elementos
            document.querySelectorAll('*').forEach(element => {
                element.style.outline = '';
                delete element.style.cursor;
            });
            
            // Aplicar realce ao elemento atual
            event.target.style.outline = '4px solid blue';
            event.target.style.cursor = 'pointer';
        }
        
        // Função para capturar o innerText do elemento ao clicar
        function handleClick(event) {
            event.preventDefault(); // Prevenir o comportamento padrão do clique
            event.stopPropagation();
            const textContent = event.target.innerText;
            // console.log('Texto capturado:', textContent);
            
            // Opcional: você pode parar de capturar depois do clique
            speechCtrl.isGettingContent = false;
            elementsCtrl.toogleGetContent.firstChild.style.fill = 'black';
            document.querySelectorAll('*').forEach(element => {
                element.removeEventListener('mouseover', handleMouseOver);
                element.removeEventListener('click', handleClick);
                element.style.outline = '';
                element.style.cursor = '';
            });

            if(textContent){
                speechCtrl.setText(textContent);
                speechCtrl.stop();
                setTimeout(function(){
                    speechCtrl.play();
                },200);
            }
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
                if(conf.on.stop)conf.on.stop();
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

        function wdiSetText(text, rate, pitch){
            if(text){
                conf.text = text;
            }
            if(rate){
                conf.rate = rate;
                elementsCtrl.rate.value = rate;
            }
            if(pitch){
                conf.pitch = pitch;
                elementsCtrl.pitch.value = pitch;
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