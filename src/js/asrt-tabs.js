(function( $ ){

    var AsrtTabs = function() {

        // Store object reference
        var _ = this;

        // Create initialize function
        _.init = function(el) {
            var link = el.find('.js-tabs-link');

            // Setup tab links
            _.link(link);
        };

        /**
         * Functionality for the link element
         *
         * @param  {object}  - el - jQuery object of the link element
         */
        _.link = function(el) {

            // When link has been clicked
            $(el).on('click', function(e) {
                var el         = $(this);
                var container  = $(this).closest('.js-tabs');
                var links      = container.find('.js-tabs-link');
                var currentTab = _.isActive(this);

                // If active do nothing, else...
                if(!currentTab) {
                    // Get 'href' attribute of link
                    var href = _.getHref(el);

                    // Set the tab with an ID matching the href
                    _.setTab(href, container);

                    // Remove the 'is-active' class on all links
                    links.removeClass('is-active');

                    // Add the 'is-active' class to the clicked link
                    el.addClass('is-active');
                } else {
                    return false;
                }

                // Stop link from using hash
                e.preventDefault();
            });
        };

        /**
         * Set which tab should be active
         *
         * @param {string} - id        - ID of the tab to be 'active'
         * @param {object} - container - jQuery object of the containing node
         */
        _.setTab = function(id, container) {
            var id = id.substr(1);
            var tabSections = container.find('.js-tab-section');
            var nextSection = container.find('.js-tab-section#' + id);

            // Remove active class on all tab sections within the current 'js-tabs' node.
            tabSections.removeClass('is-active');

            // Add active class to node matching the href
            nextSection.addClass('is-active');
        };

        /**
         * Check for if link is active or not.
         *
         * @param  {object}  - el - jQuery element to check
         * @return {Boolean} -    - Whether or not the link is the active one
         */
        _.isActive = function(el) {
            return $(el).hasClass('is-active') ? true : false;
        };

        /**
         * Get href attribute of element
         *
         * @param  {object}  - el - jQuery element to check
         * @return {Boolean} -    - Value of the element's 'href' attribute
         */
        _.getHref = function(el) {
            return $(el).attr('href');
        };
    };

    // Create a jQuery plugin ($.fn == $.prototype)
    $.fn.asrtTabs = function() {

        // Enable multiple tabs per page.
        return this.each(function() {
            var that = $(this);
            var instance = new AsrtTabs;

            // Invoke a new instance of AsrtTabs() and call the initializer
            instance.init( that );
        });
    };

    $('.js-tabs').asrtTabs();
})( jQuery );
