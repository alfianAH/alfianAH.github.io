function whichTransitionEvent() {
    var t, el = document.createElement("fakeelement");

    var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions){
        if (el.style[t] !== undefined){
            return transitions[t];
        }
    }
}

var transitionEvent = whichTransitionEvent();

function openModal(modal) {
    // Showing modal
    $(modal).addClass('showing');
    toggleClass($('body'), 'noscroll');
    // Show backdrop
    const backdrop = $('#backdrop');
    backdrop.removeClass('hidden');

    // Show modal
    $(modal).one(transitionEvent, function () {
        $(modal).removeClass('showing').addClass('show');

        // Hide tooltip on modal body scroll
        setTimeout(function () {
            let modalBody = $(modal).find('.modal-body');
            $(modalBody).on("scroll", function () {
                $('.tooltip').hide();
            })
        }, 500);
    });
}

function openModalByButton(button) {
    const targetId = $(button).attr('data-target');

    const modal = $(targetId);
    openModal(modal);
}

function closeModal(modal, backdrop) {
    // Hide modal
    modal.addClass('hiding');

    modal.one(transitionEvent, function () {
        // Remove backdrop
        backdrop.addClass('hidden');
        // Remove modal's classses
        modal.removeClass('hiding show');
    });
    toggleClass($('body'), 'noscroll');
}

function closeModalByButton(button) {
    const targetClass = $(button).attr('data-dismiss');
    const modal = $(`.${targetClass}`);
    const backdrop = $('#backdrop');

    closeModal(modal, backdrop);
}

function toggleClass(element, className) {
    let currentClass = element.attr('class');

    if (currentClass !== undefined && currentClass.includes(className)) {
        element.removeClass(className);
    } else {
        element.addClass(className);
    }

    return element;
}