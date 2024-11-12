(function ($) {
    $('#i-accept').on('click', function () {
        if (localStorage.hidecookiebar !== '1') {
            $('#cookie-notice').hide();
            localStorage.hidecookiebar = '1';
        }
    });
    if (localStorage.hidecookiebar == '1') {
        $('#cookie-notice').hide();
    };
})(jQuery);