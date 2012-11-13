// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement('script');
    script.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js');
    script.addEventListener('load', function() {
            var script = document.createElement('script');
            script.textContent = '(' + callback.toString() + ')();';
            document.body.appendChild(script);
        }, false);
    document.body.appendChild(script);
}

// the guts of this userscript
function main() {

    var jq = jQuery.noConflict(true);
    var elements = new Array();
    
    // periodically remove bits of the page
    setInterval(function() { 
        jq(elements.shift()).remove();
    }, 250);
    
    stack(jq('body')); 
    
    function stack(ele) {
        
        var kids = jq(ele).children().not('script');
        
        // if it has children, recurse through them
        if (kids.length > 0) {
            // for each child, run this method
            kids.each(function() {
                stack(this);
            });
        }
        
        // then add this to delete queue
        elements.push(ele);

    }


}

// load jQuery and execute the main function
addJQuery(main);


