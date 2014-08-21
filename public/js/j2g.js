var Main = function ($) {
    
    return {
        initGraph: function(data) {
            console.log(JSON.stringify(data))
            Morris.Area(data);      
        }
    };

}(jQuery);