# loa-app-template #

* **Criado     em:** 07/22/2013
* **Atualizado em:** 07/29/2013

## Instação ##

Para que o projeto funcione corretamente, configure os atributos em `./app/app.js`.

Caso queira utilizar *aliases* para as chamadas do `require.js` ou definir dependências
de pacotes externos, insira-os no arquivo `./app/config/require.js`.

## Utils ##

Uma série de Utils foram escritas a fim de facilitar a programação de um jogo.
Abaixo foram descritos suas respectivas funções, exemplificando.

### Anima ###
    
    ** Descrição **

    Interface para criação de sequências de animações. Com uma estrutura HTML e CSS definida,
    o módulo irá carregá-la e exibir os frames sequencialmente, da maneira que foram escritos.

    ** Utilização **
    
    Adicione `<div class="anima-frame" />` e, dentro desses, insira os elementos que devem
    aparecer em cada sequência da animação.

    Faça a requisição do módulo anima e execute o comando `Anima.init('autoplay', { duration: FLOAT, interval: FLOAT })`.

    Exemplo de execução:

    ** anima.html **

<div id="anima-container" class="aria-live">
    <div class="anima-frame anima-figure"><img src="..." /></div>
    <div class="anima-frame anima-text">Apresenta ...</div>
    <div class="anima-frame anima-text">Feito pelo LOA</div>
</div>

    ** AppController.js **

Anima
    .init({
        duration: 2,
        interval: 1,
    })
    .start()

### Audio ###

    ** Descrição **

    Gerenciador de efeitos sonoros.
    
    Arquivos relacionados:
    * app/util/audio.js
    * app/view/audio.html
    * app/config/util/audio.js

    ** Métodos **

    * init()
    * destroy()
    * playSound( _soundID )
    * stopSound( _soundID )
    * saveAndInterrupt() : salva o estado atual de cada som e interrompe a execucao de todos.
    * restorePreviousState() : retorna execução de acordo com o estado salvo pelo método saveAndInterrupt().

    ** Utilização **
    
    ** app/config/util/audio.js **

initiallyMuted: false,
    soundList: {
        somAmbienteFase2:          { file: 'fase2', repeat: true  },
    },

    ** App.Controller.js **

// executa som
Audio
    .init()
    .playSound('somAmbienteFase2')

// apos 10 segundos, para todos os sons
setTimeout(function() {
    Audio.stopSound('all')
}, 10000)

### CssBuilder ###

    ** Descrição **

    Gerenciador de arquivos CSS.

    ** Métodos **

    * init()
    * destroy()
    *

### HtmlBuilder ###