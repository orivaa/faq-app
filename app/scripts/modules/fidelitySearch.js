/**
 * Search Module - Testprojekt
 *
 * @author Oliver KLee
 * @version 0.1
 */

 /** 
 * @namespace Namespace for the fidelitySearch Module of FidelityApp 
 */
FidelityApp.fidelitySearch = (function()
{
    'use strict';

    /**
     * Polyfill for contains method
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains
     */
    if ( !String.prototype.contains ) {
        String.prototype.contains = function() {
            return String.prototype.indexOf.apply( this, arguments ) !== -1;
        };
    }

    /**
     * search the FaqData for the entered search value
     *
     * @param results Array of Objects from searchData()
     * @private
     */
    var renderSearchResults = function(results)
    {
        var arrayLength = results.length;
        var resultListHTML = document.getElementById('faq-search-results').innerHTML;

        for (var i = 0; i < arrayLength; i++) {
            resultListHTML +='<article class="faq-item">' +
                             '<h3 class="question">' +
                             results[i].frage +
                             '</h3>' +
                             '<div class="answer">' +
                             results[i].antwort +
                             '</div>' +
                             '</article>';
        }

        $('#faq-search-results').append(resultListHTML);
    };

    /**
     * search the FaqData for the entered search value
     *
     * @param searchValue The entered search sring
     * @public
     */
    var searchData = function(searchValue)
    {
        var tmpFaqData = FidelityApp.fidelityFaq.getData(faqData);
        var results = [];

        tmpFaqData.filter(function ( obj ) {

            for (var i = 0; i < obj.fragen.length; i++) {
                if ( obj.fragen[i].frage.toLowerCase().contains( searchValue.toLowerCase() ) ||
                        obj.fragen[i].antwort.toLowerCase().contains( searchValue.toLowerCase() ) ) {
                    results.push(obj.fragen[i]);
                }
            }
            
            return results;
        });
        renderSearchResults( results );
    };

    /**
     * Initialize the Search
     *
     * @public
     */
    var initSearch = function()
    {
        $('.search-button').click(function(e) {
            e.preventDefault();
            $('#faq-search-results').html('');
            var searchValue = $('.search-field').val();
            searchData( searchValue );
            FidelityApp.fidelityFaq.initAccordion();
            $('#faq-page').hide();
        });
    };

    var fidelitySearchAPI =
    {
        searchData: searchData,
        initSearch: initSearch
    };

    return fidelitySearchAPI;

}());