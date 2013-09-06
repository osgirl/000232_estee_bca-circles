var Translator = (function() {

    var self = null;
    var xmlData;

    return new Class({    
        initialize: function(element){
            this.element = document.id(element);
        },

        start :function(xml){
            self = this;
            xmlData = xml;
            self.update();
            self.updateTextInput();
        },

        // Update text in reqular elements
        update :function(element) {
            var texts = $(xmlData).find('text');
            var page = (element == null) ? self.element : element;
            $(texts).each(function(i ,v){
                $(page).find('.' + $(v).attr('id')).text( $(v).text() );
            });

            /**********************************
            Note[Jan 18,2013]: 
            Chrome browser bug patch
            Problem: chrome lose width value when apply text-transform : uppercase            
            ***********************************/
            $('.upcase').each(function(i,v){
                $(v).text( $(v).text().toUpperCase());
            })

            // default_page_header
            // quiz_page_header


        },

        // Update text in input field
        updateTextInput :function() {
            var texts = $(xmlData).find('text');
            $(texts).each(function(i ,v){
                $('input[value="'+ $(v).attr('id') +'"]').val($(v).text()).attr('default', $(v).text());
            });
        }

    })
}());