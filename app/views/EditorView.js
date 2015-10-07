App.EditorView = Backbone.View.extend({

    events: {
        "change textarea":"saveTextareaText",
        "click .js-removeElement":"removeElement",
        "change input":"saveTitleText",
        "click .image-placeholder":"addImage",
        "mouseover .js-removeElement": "addBorder",
        "mouseout .js-removeElement": "removeBorder",
        "keyup .title" : "saveTitleOnEnter" 
    },

    saveTextareaText: function(e) {
        var target = $(e.target);
        target.html(target.val());
        App.trigger("saveDOM",this.model,this.elements.html());
    },
    saveTitleText: function() {
        var target = $(event.target);
        target.attr("value",target.val());
        App.trigger("saveDOM",this.model,this.elements.html());
    },

    saveTitleOnEnter: function(e){
        if(e.keyCode == 13){    
            this.saveTitleText(); 
            $(e.target).blur();
        }
    },

    removeElement: function(e){
        $(e.target).parent().remove();
        App.trigger("saveDOM",this.model,this.elements.html());
    },

    addImage: function(e){

        var self = this;
        var imageParent = $(e.target).parent();        
        var imageInput = imageParent.find('input');

        imageInput.click();

        imageInput.change(function(e) {
            for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
                
                var file = e.originalEvent.srcElement.files[i];
                
                var img = document.createElement("img");
                var reader = new FileReader();
                reader.onloadend = function() {
                     img.src = reader.result;
                }
                reader.readAsDataURL(file);
                imageParent.find('.image-placeholder').remove();
                imageInput.remove();
                imageParent.find('.text-center').remove();
                imageParent.addClass('image-body-row-has-image');
                imageParent.find('.js-removeElement').after(img);

                setTimeout(function(){ 
                    App.trigger("saveDOM",self.model,self.elements.html());
                }, 
                1000);                
            }
        });

    },

    addBorder: function(e){$(e.target).parent()
        var targetParent = $(e.target).parent();
        targetParent.addClass('red-border');
    },

    removeBorder: function(e){
        var targetParent = $(e.target).parent();
        targetParent.removeClass('red-border');
    },

    render: function() {
        var self = this;
        var template = Handlebars.templates['editor'];
        var html = template(this.model.toJSON());
        
        this.$el.html(html);

        this.$el.css("height","100%");
        this.elements = this.$("#elements");
        if (this.model.has("dom")) {
            debugger
            this.elements.html(this.model.get("dom"));
        }

        this.elements.sortable({
            cancel: "textarea,input",
            placeholder: "sort-highlight",
            stop: function() {
                App.trigger("saveDOM",self.model,self.elements.html());
            }
        });
        this.elements.droppable({
            drop: function(event, ui) {
                var elementDragged = ui.draggable.attr('id');     
                               
                switch(elementDragged) {
                    case "image-element":
                        var countImages = self.$('.image-body-row').length;
                        var elementId = self.model.get("id")+"_images_"+countImages;
                        var imageDOM = '<div id=' + elementId+' class="image-body-row ui-resizable"></span><span class="glyphicon glyphicon-remove js-removeElement" aria-hidden="true"></span><span class="elementCorner"></span><input id="image-upload-' + elementId +'" class="hidden js-uploadImage" type="file"><img class="image-placeholder" src="assets/images/placeholder.png"><div class="text-center"><p class="image-placeholder-text">ADD IMAGE</p><span class="plus-sign glyphicon glyphicon-plus image-plus "</span></div></div>';
                        self.elements.append(imageDOM);

                        App.trigger("saveDOM",self.model,self.elements.html());
                        break;
                    case "text-element":
                        var countText = self.$('.text-row').length;
                        var elementId = self.model.get("id")+"_text_"+countText;
                        var textDOM = '<div id='+elementId+' class="text-row ui-resizable"></span><span class="glyphicon glyphicon-remove js-removeElement" aria-hidden="true"></span><textarea class="text" placeholder="Enter text here."></textarea></div>';
                        self.elements.append(textDOM);
                        
                        $('#elements').on( 'keyup', 'textarea', function (e){
                            $(this).css('height', 'auto' );
                            $(this).height( this.scrollHeight );
                        });
                        $('#elements').find('textarea').keyup();

                        App.trigger("saveDOM",self.model,self.elements.html());

                        $('#' + elementId).find('textarea').focus();

                        break;
                    case "title-element":
                        var countTitle = self.$('.title-row').length;
                        var elementId = self.model.get("id")+"_title_"+countTitle;
                        var titleDOM = '<div id='+elementId+' class="title-row"></span><span class="glyphicon glyphicon-remove js-removeElement" aria-hidden="true"></span><input class="title" style="border: none;" placeholder="Add Title Here"></div>';
                        self.elements.append(titleDOM);
                        App.trigger("saveDOM",self.model,self.elements.html());
                        $('#' + elementId).find('input').focus();
                        break;
                    default:
                        //do nothing
                }                
            }
        });

        return this;
    }
});