var MiniBar = {

	INACTIVE:0,
	ACTIVE: 1,

	__element: null,
	__header_height: 0,
	__state: 0,
	__deactivate_short: true,
	__hold_open: false,

	/**
	 * @visibility public
	 * @param collapsible The element to be stuck/collapsed.
	 * @param container The container of the collapsible element.
	 * @param collapsed_height The height of the collapsible element when collapsed.
	 * @param deactivate_short optional deactivate Minibar on short pages
	 */
	init: function(collapsible, container, collapsed_height, deactivate_short) {
		this.__element = collapsible;
		this.__container = container;
		this.__full_header_height = this.__element.getHeight();
		this.__collapsed_header_height = collapsed_height;
		this.__body_class = "stuck-header";

		if (typeof deactivate_short!="undefined") {
			this.__deactivate_short=deactivate_short;
		}

	},
	///**
	// * @visibility public
	// */
	//popupHide: function() {
		//if(typeof $('top_menu_header') != "undefined" && $('top_menu_header')) $('top_menu_header').setStyle('z-index','1');
	//},
	///**
	// * @visibility public
	// */
	//popupShow: function() {
		//if(typeof $('top_menu_header') != "undefined" && $('top_menu_header'))  $('top_menu_header').setStyle('z-index','99999');
	//},
	/**
	 * @visibility public
	 */
	run: function() {
		window.addEvents({
			"scroll": this.__update.bind(this),
			//"resize": this.update.bind(this)
			"resize": function() {
				this.__deactivate();
				this.__full_header_height = this.__element.getHeight();
				this.__update();
			}.bind(this)
		});

		this.__update();
	},

	/**
	 * @visibility private
	 */
	__update: function() {
		var scrollTop = window.getScroll().y;

		var page_height = window.getScrollSize().y;
		//console.log(page_height);
		//console.log((page_height - 120) < 1000);
		// This happens when the page isn't very long.
		if ((page_height - 120) < 1500 && this.__deactivate_short) {
			this.__deactivate();
		}
		else {
			if (scrollTop > (this.__full_header_height - this.__collapsed_header_height)) {
				if(this.__state == MiniBar.INACTIVE) {
					this.__activate();
				}
			} 
			else if (this.__state == MiniBar.ACTIVE && !this.__hold_open) {
				this.__deactivate();
			}
		}
	},

	/**
	 * Sticks the menu to the top on the page.
	 * @visibility private
	 */
	__activate: function() {
		//console.log('MiniBar.activate()');
		this.__container.setStyle('paddingTop', this.__full_header_height);
		this.__container.addClass(this.__body_class);
		this.__state = MiniBar.ACTIVE;
	},

	/**
	 * Returns the menu to its original position.
	 * @visibility private
	 */
	__deactivate: function() {
		//console.log('MiniBar.deactivate()');
		this.__container.setStyle('paddingTop', 0);
		this.__container.removeClass(this.__body_class);
		this.__state = MiniBar.INACTIVE;
	},

	/**
	 * Returns the current state of the mini bar
	 * @visibility public
	 */
	getState: function() {
		return this.__state;
	},

	/**
	 * Toggle if the minibar should stay open regardless of scroll position
	 * @visibility public
	 */
	toggleHold: function() {
		this.__hold_open = !this.__hold_open;
	}

};
