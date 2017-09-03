const $ = require("jquery");

import UIManager from './UIManager';

export default class CommentFormManager extends UIManager {

    constructor(elementSelector, commentsService, pubSub) {
        super(elementSelector); // llamada al constructor de la clase UIManager
        this.commentsService = commentsService;
        this.pubSub = pubSub;
    }

    init() {
        this.setupSubmitEventHandler();
        
    }

    setupSubmitEventHandler() {
        this.element.on("submit", () => {
            this.validateAndSendData();
            return false; 
        });
    }

    validateAndSendData() {
        if (this.isValid()) {
            this.send();
        }
      
       
    }


    isValid() {
        const inputs = this.element.find("input");
        const textareas= this.element.find("textarea");
        console.log(inputs);
        
        for (let input of inputs) {
            console.log(textareas.val())
            if (input.checkValidity()== false){
                const errorMessage = input.validationMessage;
                input.focus();
                this.setErrorHtml(errorMessage);
                this.setError();
                return false; 
            }
            
        }
        if (this.countWords(textareas.val()) >0 && textareas.val() < 120 ) {
            const errorMessage = "You must enter between 1-120 words!";
            textareas.focus();
            this.setErrorHtml(errorMessage);
            this.setError();
			return false; 
			
		}
        
        // Llegamos aquí, si no hay ningún error
        this.setIdeal(); 
        return true;
    }

	countWords (phrase) {
		var phraseReplaceSpaces = phrase.replace(/\s\s+/g, ' ').trim();
		var arrayOfWords = phraseReplaceSpaces.split(' ');
        var numberOfWords = arrayOfWords.length;
		return numberOfWords;
	}

    send() {
        this.setLoading();
        const comment = {
            name: this.element.find("#name").val(),
            surname: this.element.find("#surname").val(),
            email: this.element.find("#email").val(),
            commentary: this.element.find("#commentary").val()
        };
        this.commentsService.save(comment, success => {
            this.pubSub.publish("new-comment", comment); // publicamos el evento que informa de la creación de un comentario
            this.resetForm();
            this.setIdeal();
        }, error => {
            this.setErrorHtml("Se ha producido un error al guardar el comentario en el servidor.");
            this.setError();
        });
    }

    resetForm() {
        this.element[0].reset(); // resetea el formulario
    }

    disableFormControls() {
        this.element.find("input, button").attr("disabled", true);
    }

    enableFormControls() {
        this.element.find("input, button").attr("disabled", false);
    }

    setLoading() {
        super.setLoading();
        this.disableFormControls();
    }

    setError() {
        super.setError();
        this.enableFormControls();
    }

    setIdeal() {
        super.setIdeal();
        this.enableFormControls();
    }

}
