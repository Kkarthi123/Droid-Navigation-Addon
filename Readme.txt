<---- Document for Droids Navigation addon --->


==============================================================
## HTML MARKUP 

// The HTML markup be like this to get a exact design and animations.
// other than mentioned class name you can give your own class names to overwrite the design or colors
 

    <nav class="nav-container">            .... this is tab container you can give your own class here. That same classname must used in function call 
        <div class="droid-nav-tab">         .... this 'droid-nav-tab' class name are must given
            <div class="droid-nav-item">     .... this 'droid-nav-item' class name are must given
                <i class="ms-Icon--aad"></i>    ....here, you can give your own tag names and classnames
                <h4>Hello....!</h4>             .... your own text and classnames and also tagname
            </div>
        </div>
    <nav> 

===============================================================
## FUNCTION CALL


// The function name must be exact below.

Syntax for function call:
    
    DroidNavigation(classname, object);

    classname --  This is your own classname but it should be unique and it should not be used anywhere in the DOM.
                  NOTE: This classname and the tab container classname must be same as previously mentioned.
    object    --  object is a features that you want to mention. we will see this below.

Example:
     DroidNavigation('nav-container, {animationDuration:800});

===============================================================

## Object and FEATURES


// This object you must passed as second parmeters in function call
// This object have few fearures you can mention for your design purpose.
// The any object keys are not mentioned default value as take.

1. animationDuration[number] -- This is animation duration mention in ms(milliSeconds)
           
            Example:  DroidNavigation('nav-container, {animationDuration : 800}); (default value = 1000)


2. clickAnimationOffsetDistance[number] -- This is offset distance works only click to navigate. When you click to navigate particular section. 
                                           On that if you want scroller are little above or below from the respective section. You mention this value.

            NOTE: You may pass the negative or positive value here.
            Example:  DroidNavigation('nav-container, {clickAnimationOffsetDistance : 50}); (default value = 0)


3. scrollAnimationOffsetDistance[number] -- This is similiar to prevoius but it works on scrolling. If you want to highlight the tabs on
                                            exactly start or little after in the respective section. You play around this value.
            
            NOTE: You may pass the negative or positive value here.
            Example:  DroidNavigation('nav-container, {scrollAnimationOffsetDistance : 50}); (default value = 0)


4. ScrollElement[string]  -- ScrollElement is which container you want to scroll.

            NOTE: It must be an ID or else 'HTML'. ID you pass with a prefix of '#'
            Example:  DroidNavigation('nav-container, {ScrollElement: '#nav'}); (default value = 'html')


5. targetScrollSectionClassName[string]  -- This is your target sections common class name. (This is must given);
            
            Example:  DroidNavigation('nav-container, {targetScrollSectionClassName: 'features'}) (default value = section)


6. tabExpandInitialy[Boolean]  -- Whether you want the tabs are expanded on initial position.
            
            Example:  DroidNavigation('nav-container, {tabExpandInitialy: true}) (default value = true)


7. tabSticky[Boolean]   -- Wheather you want tab container is sticky on top or not.

            Example:  DroidNavigation('nav-container, {tabSticky: true}) (default value = true)


8. callbacks[function]  -- You can use the callback function on navigation start and end to do your own work with respective given parameters.

            Example:  DroidNavigation('nav-container, {
                         navigationStart:function(clickedElement, targetSectionID){
                                // Do your magic
                         },
                         navigationEnd:function(targetSectionID){
                                // Do your magic
                         }
                         
                      })

===============================================================

## CSS 


// You can overwrite the CSS using your own class.
// It works as resposive for both desktop and mobile screen.

NOTE : The width of the Icon and the expanding text as fixed width given for better and  smooth animation. It may not fit to your text or icons.
       You can give your own width to overwrite. If text may long it gets overflow hidden.


===============================================================





