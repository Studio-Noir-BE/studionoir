import A11yDialog from 'a11y-dialog'

export function a11yDialog() {
    let popUps = document.querySelectorAll('.js-dialog');

    if (popUps.length) {
        popUps.forEach(popUp => {
            var newPopUp = new A11yDialog(popUp);
            let header = document.querySelector("#header")
            let video = popUp.querySelector('video');
            let fuiAlert = popUp.querySelector('.fui-alert');

            newPopUp.on('show', function (element, event) {
                // Hide header
                if (header) {
                    header.classList.add('Modal-active');
                }

                // Disable scrolling
                document.body.classList.add("pop-up--active");

                // Play the video if there is one
                if (video) {
                    video.play();
                }
            });

            newPopUp.on('hide', function (element, event) {
                // Show header again
                if (header) {
                    header.classList.remove('Modal-active');
                }

                // Enable scrolling
                document.body.classList.remove("pop-up--active");

                // Pause the video if there is one
                if (video) {
                    video.pause();
                }

                if(popUp.classList.contains('on-load')) {
                    var days = 30; // show again after 30 days (change if needed)
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    document.cookie = "onload-popup=1; expires=" + date.toUTCString() + "; path=/";
                }
            });

            if (popUp.classList.contains('on-load')) {
                newPopUp.show();
            }

            // If there is a formie alert inside, show the popup again
            if (fuiAlert) {
                newPopUp.show();
            }
        });
    }
}