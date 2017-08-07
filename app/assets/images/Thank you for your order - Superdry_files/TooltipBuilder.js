/**
 * 
 * @author Jonathan Jefferies
 */
var TooltipBuilder = function() {};

/**
 * Add a tooltip to an element.
 * @visibility public
 * @param container {Element} The container element for the tooltip.
 * @param content {String|Element|Element[]} Tooltip content as text, Element or an array of Elements
 * @param styles {Array} (optional) An array of styles to be applied to the tooltip.
 */
TooltipBuilder.prototype.addTo = function(container, content, styles) {
	var classes = ["tooltip"].concat(styles);
	
	var tooltip = new Element("div", {
		"class": classes.join(" ")
	});
	if(typeof content == "string") {
		tooltip.set("text", content);
	}
	else {
		tooltip.adopt(content);
	}
	
	container.grab(tooltip);
	
	return tooltip;
};

/**
 * Remove all tooltips from an element.
 * @visibility public
 * @param container {Element} The container element for the tooltip.
 */
TooltipBuilder.prototype.removeFrom = function(container) {
    container.getElements(".tooltip").forEach(function (element)
    {
    	if (element.hasClass('billing_duties_msg') || element.hasClass('shipping_duties_msg') || element.hasClass('duties_message')) {

		} else {
            element.destroy();
		}
    });
};
