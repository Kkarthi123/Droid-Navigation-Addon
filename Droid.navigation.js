
// ==============================================================
// The HTML markup be like this to get a exact design and animations.
// other than mentioned class name you can give your own class names to overwrite the design or colors

{/* 
    <nav class="nav-container">            .... this is tab container you can give your own class here. That same classname must used in function call 
        <div class="droid-nav-tab">         .... this 'droid-nav-tab' class name are must given
            <div class="droid-nav-item">     .... this 'droid-nav-item' class name are must given
                <i class="ms-Icon--aad"></i>    ....here, you can give your own tag names and classnames
                <h4>Hello....!</h4>             .... your own text and classnames and also tagname
            </div>
        </div>
    <nav> 
*/}
// ===============================================================



function DroidNavigation(elements, userOptions) {
    // default settings
    var defaults = {
        animationDuration: 1000,
        clickAnimationOffsetDistance: 0,
        scrollAnimationOffsetDistance: 0,
        ScrollElement: 'html',
        targetScrollSectionClassName: 'section',
        tabExpandInitialy: true,
        tabSticky: true,
        navigationStart: function (clickedElement, targetSectionID) {
            //    do your work once the user gets clicked the tab with the clicked element and targetSection ID given as parameters
        },
        navigationEnd: function (targetSectionID) {
            //    do your work after navigation gets finished with navigated section id given as parameters
        }
    }

    // overwrite or merge the defaults settings to user given
    var settings = $.extend(true, defaults, userOptions);


    // Throw error if droid-nav-tab is not a direct children of user given class 
    if ($(`.${elements} > .droid-nav-tab`).length == 0) {
        console.error(`droid-nav-tab class are not given or else its not given as a direct child of '${elements}' class.`)
        return
    }

    // Throw error if 'droid-nav-item' is not a direct children of user given class 'droid-nav-tab'
    if ($(`.droid-nav-tab > .droid-nav-item`).length == 0) {
        console.error(`'droid-nav-item' class are not given or else its not given as a direct child of 'droid-nav-tab' class.`)
        return
    }

    // Throw error if the user given className doesn't present in the DOM
    if ($(`.${elements}`).length == 0) {
        console.error(`Given '${elements}' ClassName parameter in function call doesn't match with any classNames in DOM`)
        return
    }

    // Throw error if the scrollelement attribute not given correctly
    if (settings.ScrollElement.charAt(0) == '#' && settings.ScrollElement != 'html') {
        console.error('Given scroll Element must be an ID.So, you will give value with prefix of "#" else default value taken')
        return
    }

    if ($(`.${settings.targetScrollSectionClassName}`).length == 0) {
        console.error('targetScrollSectionClassName is not given it is must for automatically highlight the tab on scroll. Default value is "section". you may given your own className')
    }
    


    //  call scroll function initially
    $(document).on("scroll", onScroll);

    // this for styling purpose
    $(`.${elements}`).addClass('droid-nav-tab-container')

    // if the the sticky is true,  wrap the div with spectic id
    if (settings.tabSticky == true) {
        $(`.${elements}`).wrap("<div id ='droid-sticky-navigation'></div>")
    }
    // Tabs expanded on initial stage
    if (settings.tabExpandInitialy == true) {
        $(`.${elements}`).addClass('droid-tabs-expanded')
    }

        // add active class for first child element
        $(`.${elements} .droid-nav-tab:first-child`).addClass('active')

         // The below functionality is click to navigate into particular section and add highlight to tab.
        // bind the click event for all tabs
        $(`.${elements} .droid-nav-tab`).on('click', function (event) {
            // OFF the 'scroll' to avoid the each item highlighting conflict when scroll initiated by clicking.
            $(document).off("scroll", onScroll);

            // get the index of the clicked element
            var clickElementIdx = $(this).index();

            // get the target element attribute Value which contain target section ID
            // var targetSectionID = $(this).attr(settings.targetElementAttr)

            // get the targetsection with the help of mapping index. function eq is used to map the respective index.
            var targetSection = $(`.${settings.targetScrollSectionClassName}`).eq(clickElementIdx)
            
            // Throw error if the scrollelement not present in the dom.
            if ($(settings.ScrollElement).length == 0) {
                console.error(`Given ScrollElement '${settings.ScrollElement}' not present in the DOM`)
                return
            }

            // callback for if user clcicked the tabs
            settings.navigationStart($(this), targetSection)

            // remove and add the active class for clicked element.
            $(".active", $(`.${elements}`)).removeClass("active");
            $(`.${elements}`).removeClass('droid-tabs-expanded');
            $(this).addClass('active');

            // scroll animation with callback
            $(settings.ScrollElement).stop().animate({
                scrollTop: targetSection.offset().top + settings.clickAnimationOffsetDistance
            }, settings.animationDuration, function () {
                $(document).on("scroll", onScroll)
                settings.navigationEnd(targetSection)
            });
        })


    // The below function is if user navigate to the respective section using manual scroll, the tabs gets automatically highlihted.
    function onScroll() {
        // Expand all tabs repective to given inputs by user
        if (settings.tabExpandInitialy == true) {
            if ($(document).scrollTop() < $('#droid-sticky-navigation').position().top) {
                $(`.${elements}`).addClass('droid-tabs-expanded')
                $(`.${elements} .droid-nav-tab`).removeClass('active')
            }
            else {
                $(`.${elements}`).removeClass('droid-tabs-expanded')
            }
        }

        //  auto hightlight the respective tab when scroll to respective section
        var scrollPos = $(document).scrollTop() + settings.scrollAnimationOffsetDistance;
        $(`.${settings.targetScrollSectionClassName}`).each(function () {
            // any one target section element and the scroll is passed the below condition then only highlights changes happen.
            if ($(this).position().top <= scrollPos && $(this).position().top + $(this).height() > scrollPos) {
                var elementID = $(`.${settings.targetScrollSectionClassName}`).index(this)
                $(`.${elements} .active`).removeClass('active')
                $(`.${elements} .droid-nav-tab`).eq(elementID).addClass('active')
            }
        });
    }

}



