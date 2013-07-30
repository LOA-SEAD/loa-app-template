# loa-app-template #

* **Criado     em:** 07/22/2013
* **Atualizado em:** 07/30/2013

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
    
Existe um arquivo `app/public/audio/fase2.ogg` ou `app/public/audio/fase2.mp3`.

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

`Loader` de estruturas de estilo CSS contidas na pasta `app/public/css`.

** Métodos **

* isEmpty()       : verifica se existe algum CSS carregado por este componente.
* empty()         : remove todos os referenciais e arquivos carregados.
* load( _link )   : carrega o arquivo `app/public/css/@_link.css` no documento HTML de maneira assíncrona e armazena
um referencial para esse elemento.
* unload( _link ) : remove o referencial para o @_link carregado e o retira do documento HTML.

** Utilização **

Existem os arquivos `app/public/css/bootstrap.min.css` e `app/public/css/default.css`

** app/controller/app.js **

    CSS
        .load('bootstrap.min')
        .load('default')

### HtmlBuilder ###

** Descrição **

Construtor de estruturas HTML dinâmicas.

** Métodos **

* isEmpty() : verifica se existe algum elemento HTML construido por este componente.
* empty()   : remove todos os referenciais e elementos criados.
* remove()  : 

** Elementos que podem ser construídos **

* link
* div
* form

** Utilização **

Existem os arquivos `app/public/css/bootstrap.min.css` e `app/public/css/default.css`.
Todos os métodos possuem um último parâmetro opcional `_containerId`. Caso `_containerId`
não seja especificado, o método retornará um elemento jQuery com o HTML criado.

** app/controller/app.js **

    HTML
        .div('monster-1', '', 'game-monster', 'game-canvas')
    var $newMonster = HTML.div('monster-2', '', 'game-monster')

---
EOF