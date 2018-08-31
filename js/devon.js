$(document).ready(function() {
    /*$('p:contains("devonfw"), span:contains("devonfw")').each(function(x) {
        if(!$(this).hasClass('nomod')) {
        $(this.childNodes).each(function() {
            if (this.nodeType==3 && $(this).text().indexOf('devonfw')>=0) {
                wrapMatchesInNode(this);
            }
        });
        $(this).html($(this).html().replace('devonfw', '<span style="font-weight:bold;color:#aaa;"><b style="color:#4bbdec">devon</b>fw</span>'));
        }
    })*/
    $('[data-toggle="tooltip"]').tooltip();

    $.ajax({
        url: 'https://troom.capgemini.com/sites/vcc/devon/overview.aspx',
        dataType: 'jsonp',
        method: 'GET',
        timeout: 3000,
        error: function(hrx, textStatus, error) {
            if(textStatus === 'parsererror') {
                $('.only-internal').show();
                $('.only-internal').removeClass("d-none");
                $('only-external').hide()
            }else {
                $('.only-internal').hide();
                $('only-external').show()
                $('.only-external').removeClass("d-none");
            }
        }
    });
})

function wrapMatchesInNode(textNode) {
 
    var temp = document.createElement('div');
 
    temp.innerHTML = textNode.data.replace(/devonfw/g,'<span style="font-weight:bold;color:#aaa;"><b style="color:#49BDEA">devon</b>fw</span>');
 
    // temp.innerHTML is now:
    // "n    This order's reference number is <a href="/order/RF83297">RF83297</a>.n"
    // |_______________________________________|__________________________________|___|
    //                     |                                      |                 |
    //                 TEXT NODE                             ELEMENT NODE       TEXT NODE
 
    // Extract produced nodes and insert them
    // before original textNode:
    while (temp.firstChild) {
        //textNode.parentNode.insertBefore(textNode, temp.firstChild);
    textNode.parentNode.insertBefore(temp.firstChild, textNode);

    }
    // Logged: 3,1,3
 
    // Remove original text-node:
    textNode.parentNode.removeChild(textNode);
 
}

function tabScroll(dir, id) {
    var tabs = $('#scroll-nav' + id + ' li a');
    var activeTab = 0;

    for(var i = 0; i < tabs.length; i++) {
        if($(tabs[i]).hasClass('active')) {
            activeTab = i;
        }
    }

    switch(dir) {
        case 'left':
        if(activeTab > 0) {
            $(tabs[activeTab-1]).trigger("click");
            $('#scroll-nav' + id).animate({
                scrollLeft: arrayWidth(tabs, activeTab-1)
            }, 100);
        }
        break;
        case 'right':
        if(activeTab < tabs.length-1) {
            $(tabs[activeTab+1]).trigger("click");
            $('#scroll-nav' + id).animate({
                scrollLeft: arrayWidth(tabs, activeTab+1)
            }, 100);
        }
        break;
    }
}

function arrayWidth(a, x) {
    var result = 0;
    for(var i = 0; i < x; i++) {
        result += $(a[i]).width();
    }
    return result;
}