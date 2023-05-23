(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });

    $('.groom-account').click(function () {
        Swal.fire({
            html:
                '<div class="hstack mb-3">' +
                '<h5 class="mb-0">신랑 이규정</h5>' +
                '<a href="javascript:;" class="position-relative ml-auto text-primary" onclick="copyText(this)">하나은행 110-112-334-55</a>' +
                '</div>' +
                '<div class="hstack mb-3">' +
                '<h5 class="mb-0">부) 이보현</h5>' +
                '<a href="javascript:;" class="position-relative ml-auto text-primary" onclick="copyText(this)">신한은행 110-112-334-55</a>' +
                '</div>' +
                '<div class="hstack">' +
                '<h5 class="mb-0">모) 표덕순</h5>' +
                '<a href="javascript:;" class="position-relative ml-auto text-primary" onclick="copyText(this)">국민은행 110-112-334-55</a>' +
                '</div>',
            focusConfirm: false,
            confirmButtonText: '확인',
        });
    });

    $('.bride-account').click(function () {
        Swal.fire({
            html:
                '<div class="hstack mb-3">' +
                '<h5 class="mb-0">신부 정지혜</h5>' +
                '<a href="javascript:;" class="position-relative ml-auto text-primary" onclick="copyText(this)">하나은행 110-112-334-55</a>' +
                '</div>' +
                '<div class="hstack mb-3">' +
                '<h5 class="mb-0">부) 정순동</h5>' +
                '<a href="javascript:;" class="position-relative ml-auto text-primary" onclick="copyText(this)">신한은행 110-112-334-55</a>' +
                '</div>' +
                '<div class="hstack">' +
                '<h5 class="mb-0">모) 박선미</h5>' +
                '<a href="javascript:;" class="position-relative ml-auto text-primary" onclick="copyText(this)">부산은행 110-112-334-55</a>' +
                '</div>',
            focusConfirm: false,
            confirmButtonText: '확인',
        });
    });

    $('#send-message-form').on('submit', function(e) {
        e.preventDefault();

        Swal.fire({
            title: "메세지를 보내실래요?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1c84ee",
            cancelButtonColor: "#fd625e",
            confirmButtonText: "확인",
            cancelButtonText: "취소",
        }).then(function (result) {
            if (result.value) {
                var form = $('#send-message-form')[0];
                var form_data = new FormData(form);
                $.ajax({
                    url: '/message',
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    data: form_data,
                    success: function(response) {
                        console.log(response);
                        var html = '<div class="row mb-2 bg-secondary p-4">' +
                                '<div class="col-md-12 mb-2">' +
                                '<div class="hstack">' +
                                '<h6 class="mb-0">' + response.name + '</h6>' +
                                '<span class="ml-auto">' + response.uploaded_at + '</span>' +
                                '</div></div>' +
                                '<div class="col-md-12">' +
                                '<span>' + response.message + '</span>' +
                                '</div></div>'
                        $('.message-area').prepend(html);
                    }
                });
            }
        });
    });

})(jQuery);

function copyText(element) {
    navigator.clipboard.writeText($(element).text());
    Swal.fire({
        title: '복사되었습니다',
        icon: 'success',
//        focusConfirm: false,
        confirmButtonText: '확인',
    });
}
