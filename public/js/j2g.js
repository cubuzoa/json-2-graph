var Main = function ($) {
    
    return {
        initGraph: function(data) {
            Morris.Line(data);      
        }
    };

}(jQuery);