/**
 * FAQ Module - Testprojekt
 *
 * @author Oliver KLee
 * @version 0.2
 */

// create namespace
var FidelityApp = FidelityApp || {}; // jshint ignore:line

/** 
 * @namespace Namespace for the fidelityFaq Module of FidelityApp 
 */
FidelityApp.fidelityFaq = (function()
{
    'use strict';

    /**
     * Gets Data from an extern array
     *
     * @param data The extern array
     * @public
     */
    var getData = function(data)
    {
        if ( $.isArray(data) ) {
            var appData = data;
            return appData;
        } else {
            return 'Invalid Data';
        }
    };

    /**
     * Render the FAQ questions and answers
     *
     * @private
     */
    var renderFaq = function(data)
    {
        var faqList = getData(data);
        var $faqPage = $('#faq-page');
        var myListHTML = document.getElementById('faq-page').innerHTML;
        var myInnerListHTML = '';

        var arrayLength = faqList.length; // cache length cause of performance reasons
        for (var i = 0; i < arrayLength; i++) {
            myListHTML += '<div class="faq-section">' +
                        '<h2 class="faq-section-header">' + faqList[i].menu + '</h2>';
                        
            for (var j = 0; j < faqList[i].fragen.length; j++) {
                myInnerListHTML +='<article class="faq-item">' +
                                 '<h3 class="question">' +
                                 faqList[i].fragen[j].frage +
                                 '</h3>' +
                                 '<div class="answer">' +
                                 faqList[i].fragen[j].antwort +
                                 '</div>' +
                                 '</article>';
            }

            myListHTML += myInnerListHTML + '</div>';
        }

        $faqPage.append(myListHTML);
    };

    /**
     * Render the FAQ Menu
     *
     * @private
     */
    var renderMenu = function(data)
    {
        var faqList = getData(data);
        var arrayLength = faqList.length - 1;
        var myListHTML = document.getElementById('faq-nav').innerHTML;

        for (var i = 0; i < arrayLength; i++) {
            myListHTML += '<li><a href="" title="">' + faqList[i].menu + '</a></li>';
        }

        $('#faq-nav').append(myListHTML);
    };

    /**
     * Initialize the Accordeon function for the answers
     * and questions section
     *
     * TODO: Put it in seperate module and make it more common
     *
     * @public
     */
    var initAccordion = function()
    {
        var $accordionItem = $('.faq-item');
        $accordionItem.each(function() {
            $(this).addClass('closed');

            $(this).find('.question').click(function(){
                var $trigger = $(this);

                $trigger.parent().removeClass('closed');

                if ( $trigger.parent().hasClass('open') ) {
                    $trigger.parent().removeClass('open').addClass('closed');
                } else {
                    $trigger.parent().addClass('open');
                }

                $trigger.next().slideToggle();

                $accordionItem
                    .find('.answer')
                    .not($trigger.next())
                    .slideUp();

                $accordionItem
                    .find('.answer')
                    .not($trigger.next())
                        .parent()
                    .removeClass('open')
                    .addClass('closed');
            });
        });
    };

    /**
     * Initialize the parts of the FidelityFaq Module
     *
     * @public
     */
    var init = function()
    {
        renderMenu(faqData);
        renderFaq(faqData);
    };

    // expose api
    var fidelityFaqAPI =
    {
        init: init,
        getData: getData,
        initAccordion: initAccordion
    };

    return fidelityFaqAPI;
}());